'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useNotes } from '../../../contexts/NoteContext';
import { Icon } from '@iconify/react';
import NoteCard from '../../components/cards/NoteCard';

const NOTES_PER_PAGE = 20;
const LOAD_MORE_COUNT = 10;

const NoteSkeleton = () => (
  <div className="bg-boxcolor dark:bg-darkbox rounded-main p-4 shadow-sm animate-pulse">
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-main  dark:bg-blackgrey  bg-hovercolor" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-24 bg-hovercolor rounded-main  dark:bg-blackgrey" />
          <div className="h-6 w-16 bg-hovercolor rounded-main  dark:bg-blackgrey" />
        </div>
        <div className="h-4 w-full bg-hovercolor rounded-main  dark:bg-blackgrey" />
        <div className="mt-3 flex items-center gap-4">
          <div className="h-4 w-16 bg-hovercolor rounded-main  dark:bg-blackgrey" />
          <div className="h-4 w-24 bg-hovercolor rounded-main  dark:bg-blackgrey" />
        </div>
      </div>
    </div>
  </div>
);

const ProjectNotesPage = () => {
  const { projectNotes, projectNotesLoading } = useNotes();
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(NOTES_PER_PAGE);
  const [filters, setFilters] = useState({
    type: 'all',
    dateFrom: '',
    dateTo: '',
    target: 'all', // 'all', 'users', 'project', 'daily'
  });
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  
  const { ref: loadMoreRef, inView } = useInView();
  const timeoutRef = useRef(null);

  const noteTypes = [
    { value: 'all', label: 'كل الأنواع' },
    { value: 'Warning', label: 'تحذير' },
    { value: 'Notice', label: 'ملاحظة' },
    { value: 'Alert', label: 'تنبيه' },
    { value: 'Reminder', label: 'تذكير' },
    { value: 'News', label: 'أخبار' },
    { value: 'Thank', label: 'شكر' },
    { value: 'Promote', label: 'ترقية' }
  ];

  const targetTypes = [
    { value: 'all', label: 'الكل' },
    { value: 'users', label: 'موجهة لأشخاص' },
    { value: 'project', label: 'عامة للمشروع' },
    { value: 'daily', label: 'يومية' }
  ];

  // Filter notes
  const filterNotes = (notes) => {
    return notes.filter(note => {
      // Type filter
      if (filters.type !== 'all' && note.type !== filters.type) return false;
      
      // Date range filter
      if (filters.dateFrom && filters.dateTo) {
        const noteDate = new Date(note.createdAt);
        const fromDate = new Date(filters.dateFrom);
        const toDate = new Date(filters.dateTo);
        if (noteDate < fromDate || noteDate > toDate) return false;
      }
      
      // Target filter
      if (filters.target !== 'all') {
        switch (filters.target) {
          case 'users':
            if (!note.usersId?.length) return false;
            break;
          case 'project':
            if (note.usersId?.length || note.targetDate) return false;
            break;
          case 'daily':
            if (!note.targetDate) return false;
            break;
        }
      }
      
      return true;
    });
  };

  // Update displayed notes when filters or projectNotes change
  useEffect(() => {
    if (projectNotes) {
      const filteredNotes = filterNotes(projectNotes)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDisplayedNotes(filteredNotes.slice(0, visibleCount));
    }
  }, [projectNotes, filters, visibleCount]);

  // Load more handler
  useEffect(() => {
    if (inView && displayedNotes.length < filterNotes(projectNotes).length) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setVisibleCount(prev => prev + LOAD_MORE_COUNT);
      }, 300);
    }
  }, [inView, displayedNotes.length, projectNotes]);

  return (
    <div className="  dark:text-subtextcolor m-4 bg-hovercolor dark:bg-blackgrey overflow-hidden rounded-main  p-3 space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 dark:bg-darkbox bg-boxcolor p-4 rounded-main">
        {/* Type Filter */}
     <div className=' flex w-full md:w-fit gap-2'>   
      <div className="relative w-full md:w-40">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="px-4 dark:border-blackgrey w-full py-2 bg-white justify-center rounded-main border border-border flex items-center gap-2"
          >
            <span>{noteTypes.find(t => t.value === filters.type)?.label}</span>
            <Icon icon="material-symbols:arrow-drop-down" />
          </button>
          {showTypeDropdown && (
            <div className="absolute top-full flex flex-col gap-2  p-2 mt-1 w-full dark:bg-darkbox  bg-boxcolor rounded-main shadow-lg border border-border z-10">
              {noteTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, type: type.value }));
                    setShowTypeDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-right rounded-main dark:hover:bg-blackgrey  hover:bg-hovercolor"
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>
  {/* Target Filter */}
  <div className="relative w-full md:w-40 " >
          <button
            onClick={() => setShowTargetDropdown(!showTargetDropdown)}
            className="px-4 justify-center py-2 bg-white rounded-main w-full border border-border dark:border-blackgrey flex items-center gap-2"
          >
            <span>{targetTypes.find(t => t.value === filters.target)?.label}</span>
            <Icon icon="material-symbols:arrow-drop-down" />
          </button>
          {showTargetDropdown && (
            <div className="absolute top-full mt-1  dark:bg-darkbox w-full bg-boxcolor rounded-main  shadow-lg border border-border p-2 z-10">
              {targetTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, target: type.value }));
                    setShowTargetDropdown(false);
                  }}
                  className="w-full dark:hover:bg-blackgrey px-4 py-2 text-right rounded-main hover:bg-hovercolor"
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div> </div>
        {/* Date Range Filters */}
        <div className="flex md:w-fit w-full gap-2">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
            className="px-4  w-full py-2  dark:border-blackgrey bg-boxcolor dark:bg-darkbox rounded-main border border-border"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
            className="px-4 w-full py-2 dark:border-blackgrey bg-boxcolor dark:bg-darkbox rounded-main border border-border"
          />
        </div>

      
      </div>

      {/* Notes Grid */}
      <div className="grid gap-4 w-full overflow-hidden md:grid-cols-2 lg:grid-cols-3">
        {projectNotesLoading ? (
          Array(6).fill().map((_, i) => <NoteSkeleton key={i} />)
        ) : displayedNotes.length > 0 ? (
          displayedNotes.map(note => (
            <NoteCard key={note._id} note={note} projectId={note.projectId} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-darkgrey">
            <Icon icon="material-symbols:note-stack-outline" className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg">لا توجد ملاحظات تطابق المعايير المحددة</p>
          </div>
        )}
      </div>

      {/* Load More Trigger */}
      {!projectNotesLoading && displayedNotes.length < filterNotes(projectNotes).length && (
        <div ref={loadMoreRef} className="py-4 text-center">
          <div className="h-10 w-32 mx-auto bg-hovercolor animate-pulse rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default ProjectNotesPage;