'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import axios from 'axios';
import { ProjectsContext } from '../projects/context/ProjectsContext';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const { project } = useContext(ProjectsContext);
    

    // جلب جميع الملاحظات
    const { data: allNotes = [], isLoading: allNotesLoading } = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const token = localStorage.getItem('token');

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/notes`,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
             return data || [];
        },
        staleTime: 300000,
    });

    // جلب ملاحظات المشروع المحدد
    const { data: projectNotes = [], isLoading: projectNotesLoading } = useQuery({
        queryKey: ['notes', project?._id],
        queryFn: async () => {
            if (!project?._id) return [];
            const token = localStorage.getItem('token');

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/notes`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
            return data.filter(note => note.projectId._id === project._id) || [];
        },
        enabled: !!project?._id,
        staleTime: 300000,
    });
    // تحديث الملاحظات
    const refreshAllNotes = () => queryClient.invalidateQueries(['notes']);
    const refreshProjectNotes = () => queryClient.invalidateQueries(['notes', project?._id]);

    // دوال مساعدة للتعامل مع الملاحظات
    const createNote = async (noteData) => {
        const formData = new FormData();
        Object.keys(noteData).forEach(key => {
            if (key === 'images' || key === 'files') {
                noteData[key].forEach(file => {
                    formData.append(key, file);
                });
            } else {
                formData.append(key, noteData[key]);
            }
        });
        const token = localStorage.getItem('token');

        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/notes`,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`

                 }
            }
        );
        return data;
    };
    const togglePinNote = async (id) => {
        const token = localStorage.getItem('token');
        
        try {
          const { data } = await axios.patch(
            `${process.env.NEXT_PUBLIC_API}/api/notes/${id}/toggle-pin`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          
          // Optimistic update for better UX
          queryClient.setQueryData(['notes'], old => 
            old?.map(note => note._id === id ? {...note, pinned: !note.pinned} : note)
          );
          
          if (project?._id) {
            queryClient.setQueryData(['notes', project._id], old => 
              old?.map(note => note._id === id ? {...note, pinned: !note.pinned} : note)
            );
          }
          
          return data;
        } catch (error) {
          console.error('Error toggling pin status:', error);
          // Revert optimistic update on error
          refreshAllNotes();
          if (project?._id) refreshProjectNotes();
          throw error;
        }
      };
      
    const updateNote = async (id, noteData) => {
        const formData = new FormData();
        Object.keys(noteData).forEach(key => {
            if (key === 'images' || key === 'files') {
                noteData[key].forEach(file => {
                    formData.append(key, file);
                });
            } else if (key === 'imagesToDelete' || key === 'filesToDelete') {
                formData.append(key, JSON.stringify(noteData[key]));
            } else {
                formData.append(key, noteData[key]);
            }
        });
        const token = localStorage.getItem('token');

        const { data } = await axios.put(
            `${process.env.NEXT_PUBLIC_API}/api/notes/${id}`,
            formData,
            {
                
                
                headers: { 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`

                 }
            }
        );
        return data;
    };
    const token = localStorage.getItem('token');

    const deleteNote = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/notes/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            }
        );
    };

    const getNoteById = async (id) => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/notes/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            }
        );
        return data;
    };

    // إعداد Socket.IO للتحديثات المباشرة
    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_API}`);

        socket.on('noteCreated', () => {
            refreshAllNotes();
            if (project?._id) refreshProjectNotes();
        });

        socket.on('noteUpdated', () => {
            refreshAllNotes();
            if (project?._id) refreshProjectNotes();
        });

        socket.on('noteDeleted', () => {
            refreshAllNotes();
            if (project?._id) refreshProjectNotes();
        });

        return () => {
            socket.disconnect();
        };
    }, [project?._id]);

    // فلترة الملاحظات حسب النوع
    const filterNotesByType = (notes, type) => {
        return notes.filter(note => note.type === type);
    };

    // فلترة الملاحظات حسب التاريخ المستهدف
    const filterNotesByDate = (notes, date) => {
        const targetDate = new Date(date);
        return notes.filter(note => {
            if (!note.targetDate) return false;
            const noteDate = new Date(note.targetDate);
            return noteDate.toDateString() === targetDate.toDateString();
        });
    };

    return (
        <NotesContext.Provider value={{
            allNotes,
            projectNotes,
            allNotesLoading,
            projectNotesLoading,
            createNote,
            updateNote,
            deleteNote,
            getNoteById,
            refreshAllNotes,
            refreshProjectNotes,
            filterNotesByType,
            filterNotesByDate,
            togglePinNote 
        }}>
            {children}
        </NotesContext.Provider>
    );
};

// Custom hook للوصول إلى سياق الملاحظات
export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
};