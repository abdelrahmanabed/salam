'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import axios from 'axios';
import { usePathname } from 'next/navigation';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const pathname = usePathname();
    const id = pathname.split('/')[2]; // استخراج ID المشروع من الـ URL

    // جلب جميع المشاريع
    const { data: projects = [], isLoading: projectsLoading } = useQuery({
      queryKey: ['projects'],
      queryFn: async () => {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/projects/all`);
          return data || [];  // تأكد من إرجاع مصفوفة فارغة في حالة عدم وجود بيانات
      },
      staleTime: 300000,
  });
  

    // جلب المشروع المحدد
    const { data: project, isLoading: projectLoading, error: projectError } = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/projects/${id}`);
            return data;
        },
        enabled: !!id, // لا يتم تشغيل الاستعلام إذا لم يكن هناك ID
        staleTime: 300000,
        
    });

    // تحديث المشاريع
    const refreshProjects = () => queryClient.invalidateQueries(['projects']);
    const refreshProject = () => queryClient.invalidateQueries(['project', id]);

    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_API}`);

        socket.on('projectUpdated', (updatedProject) => {
            if (updatedProject._id === id) {
                refreshProject();
            }
            refreshProjects();
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    return (
        <ProjectsContext.Provider value={{
            projects,
            project,
            projectsLoading,
            projectLoading,
            projectError,
            refreshProjects,
            refreshProject
        }}>
            {children}
        </ProjectsContext.Provider>
    );
};

