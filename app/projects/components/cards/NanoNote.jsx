import React, { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { NotesContext } from '@/app/contexts/NoteContext';

const getNoteTypeConfig = (type) => {
    
  const config = {
    Warning: {
      icon: 'material-symbols:warning-outline',
      bgColor: 'orangecolor'
    },
    Notice: {
      icon: 'material-symbols:info-outline',
      bgColor: 'bluecolor'
    },
    Alert: {
      icon: 'material-symbols:notification-important-outline',
      bgColor: 'redcolor'
    },
    Reminder: {
      icon: 'material-symbols:timer-outline',
      bgColor: 'pinkcolor'
    },
    News: {
      icon: 'material-symbols:newspaper',
      bgColor: 'cyancolor'
    },
    Thank: {
      icon: 'material-symbols:favorite-outline',
      bgColor: 'rosecolor'
    },
    Promote: {
      icon: 'material-symbols:campaign-outline',
      bgColor: 'greencolor'
    }
  };
  return config[type];
};

const NanoNote = ({ note,projectId }) => {
  const { togglePinNote } = useContext(NotesContext);
  const [isPinning, setIsPinning] = useState(false);
  const [localPinned, setLocalPinned] = useState(note.pinned);
  const {
    type,
    content,
    targetDate,
    images,
    files,
    usersId,
    _id
  } = note;
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
  const typeConfig = getNoteTypeConfig(type);
  const isDaily = targetDate ? true : false;
  const isPublic = !targetDate && !usersId?.length;
  const totalAttachments = (images?.length || 0) + (files?.length || 0);

  return (
        <div className="block overflow-hidden  w-full relative">
        {/* Pin Button - Absolute positioned at top right */}
        <button
          onClick={handlePinToggle}
          className={`absolute top-1 right-1 z-10  rounded-full transition-all duration-200 ${
            isPinning ? 'opacity-70' : 'opacity-100'
          } ${
            localPinned 
              ? ' dark:text-backgroundcolor  hover:bg-darkbluec dark:hover:bg-darkbluec' 
              : 'bg-transparent hover:bg-hovercolor dark:hover:bg-blackgrey text-darkbox dark:text-hovercolor'
          }`}
          disabled={isPinning}
          aria-label={localPinned ? "Unpin note" : "Pin note"}
        >
          <Icon 
            icon={localPinned ? "material-symbols:push-pin" : "material-symbols:push-pin-outline"} 
            className={`w-3 h-3 transform rotate-45 ${isPinning ? 'animate-pulse' : ''}`}
          />
        </button>
    <Link href={`/projects/${projectId}/notes/${_id}`} className="block text-xs   overflow-hidden w-full">
      <div className={`bg-${typeConfig.bgColor}    bg-opacity-50    dark:hover:bg-darkbluec  w-full overflow-hidden rounded-full p-1 shadow-sm hover:bg-maincolor/10  transition-colors duration-200`}>
        <div className="flex items-center gap-4">
          {/* Icon and Type */}
          <div className={`shrink-0 p-1 rounded-circle bg-${typeConfig.bgColor}`}>
            <Icon 
              icon={typeConfig.icon} 
              className={`w-4 h-4 text-${typeConfig.color}`}
            />
          </div>

          <div className=" overflow-hidden flex items-center  flex-1 min-w-0">
            {/* Type and Badge */}
           

            {/* Content */}
            <p className="text-textcolor dark:text-subtextcolor   truncate">
              {content}
            </p>

            {/* Footer */}
            <div className=" flex items-center gap-4 text-sm text-darkgrey">
              { totalAttachments>0 &&
                <div className="flex items-center gap-1">
                  <Icon icon="material-symbols:attach-file" className="w-4 h-4" />
                  <span>{totalAttachments}</span>
                </div>
              }
              
             
            </div>
          </div>
        </div>
      </div>
    </Link></div>
  );
};

export default NanoNote;