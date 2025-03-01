import React, { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { ProjectsContext } from '../../context/ProjectsContext';
import axios from 'axios';
import { NotesContext } from '../../../contexts/NoteContext';




const NoteCard = ({ note,projectId }) => {
  const { togglePinNote } = useContext(NotesContext);
  const [isPinning, setIsPinning] = useState(false);
  const [localPinned, setLocalPinned] = useState(note.pinned);
  const getNoteTypeConfig = (type) => {
 
    const config = {
      Warning: {
        icon: 'material-symbols:warning-outline',
        color: 'orangecolor',
        bgColor: ''
      },
      Notice: {
        icon: 'material-symbols:info-outline',
        color: 'bluecolor',
        bgColor: ''
      },
      Alert: {
        icon: 'material-symbols:notification-important-outline',
        color: 'redcolor',
        bgColor: ''
      },
      Reminder: {
        icon: 'material-symbols:timer-outline',
        color: 'pinkcolor',
        bgColor: ''
      },
      News: {
        icon: 'material-symbols:newspaper',
        color: 'cyancolor',
        bgColor: ''
      },
      Thank: {
        icon: 'material-symbols:favorite-outline',
        color: 'rosecolor',
        bgColor: ''
      },
      Promote: {
        icon: 'material-symbols:campaign-outline',
        color: 'greencolor',
        bgColor: ''
      }
    };
    return config[type];
  };
  const {
    type,
    content,
    targetDate,
    images,
    files,
    usersId,
    _id,
    createdAt
  } = note;




  const typeConfig = getNoteTypeConfig(type);
  const isDaily = targetDate ? true : false;
  const isPublic = !targetDate && !usersId?.length;
  const totalAttachments = (images?.length || 0) + (files?.length || 0);

  const handlePinToggle = async (e) => {
    e.preventDefault(); // Prevent navigation to the note detail
    e.stopPropagation();
    
    if (isPinning) return;
    
    try {
      setIsPinning(true);
      // Optimistic update for better UX
      setLocalPinned(!localPinned);
      await togglePinNote(_id);
    } catch (error) {
      // Revert on error
      setLocalPinned(note.pinned);
      console.error("Failed to toggle pin status:", error);
    } finally {
      setIsPinning(false);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // If the date is today, show time in AM/PM format
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    
    // If more than a year has passed, show full date with year
    if (diffDays > 365) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
    
    // Otherwise show date in DD/MM format
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="block overflow-hidden  w-full relative">
    {/* Pin Button - Absolute positioned at top right */}
    <button
      onClick={handlePinToggle}
      className={`absolute bottom-4 left-4 z-10 p-1 rounded-full transition-all duration-200 ${
        isPinning ? 'opacity-70' : 'opacity-100'
      } ${
        localPinned 
          ? 'bg-maincolor dark:bg-bluecolor text-backgroundcolor hover:bg-darkbluec dark:hover:bg-darkbluec' 
          : 'bg-transparent hover:bg-hovercolor dark:hover:bg-blackgrey text-darkbox dark:text-hovercolor'
      }`}
      disabled={isPinning}
      aria-label={localPinned ? "Unpin note" : "Pin note"}
    >
      <Icon 
        icon={localPinned ? "material-symbols:push-pin" : "material-symbols:push-pin-outline"} 
        className={`w-5 h-5 transform rotate-45 ${isPinning ? 'animate-pulse' : ''}`}
      />
    </button>
    
    <Link href={`/projects/${projectId}/notes/${_id}`} className="block overflow-hidden w-full">
      <div className={`bg-boxcolor dark:bg-darkbox dark:hover:bg-darkbluec w-full overflow-hidden rounded-[12px] p-4 shadow-sm hover:bg-maincolor/10 transition-colors duration-200 ${
        localPinned ? `border-l-4 border-hovercolor dark:border-amber-600` : ''
      }`}>
        <div className="flex items-start gap-4">
          {/* Icon and Type */}
          <div className={`rounded-lg bg-`}>
            <Icon 
              icon={typeConfig.icon} 
              className={`w-6 h-6 text-${typeConfig.color}`}
            />
          </div>

          <div className="overflow-hidden flex-1 min-w-0">
            {/* Type and Badge */}
            <div className="flex items-center justify-between w-full gap-2 -mt-[0.5] mb-2">
              <div className="flex items-center  gap-3">
                <span className={`font-medium text-${typeConfig.color}`}>
                  {type}
                </span>
                {localPinned && (
                  <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-subtextcolor flex items-center gap-0.5">
                    <Icon icon="material-symbols:push-pin" className="w-2.5 h-2.5" />
                    Pinned
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {isDaily && (
                  <span className="px-1.5 py-0.5 text-[9px] rounded-full dark:bg-maincolor dark:text-verylightblue bg-verylightblue text-bluecolor">
                    Daily
                  </span>
                )}
                {isPublic && (
                  <span className="px-1.5 py-0.5 text-[9px] rounded-full dark:bg-maincolor dark:text-verylightblue bg-verylightblue text-bluecolor">
                    Public
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <p className="text-textcolor dark:text-subtextcolor truncate">
              {content}
            </p>

            {/* Footer */}
            <div className="mt-3 flex items-center gap-4 text-sm text-darkgrey">
              { (
                <div className="flex items-center gap-1">
                  <Icon icon="material-symbols:attach-file" className="w-4 h-4" />
                  <span>{totalAttachments}</span>
                </div>
              )}
              
              {usersId?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Icon icon="material-symbols:group-outline" className="w-4 h-4" />
                  <span>
                    {`For you${usersId.length > 1 ? ` and ${usersId.length - 1} others` : ''}`}
                  </span>
                </div>
              )}
            </div>
            <div className="text-xs absolute  bottom-5 right-4 text-darkgrey dark:text-gray-400">
                {formatDate(createdAt)}
              </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
  );
};

export default NoteCard;