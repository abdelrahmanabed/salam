import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { ProjectsContext } from '../../context/ProjectsContext';

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

const NoteCard = ({ note }) => {
  const { project } = useContext(ProjectsContext);

  const {
    type,
    content,
    targetDate,
    images,
    files,
    usersId,
    projectId,
    _id
  } = note;

  const typeConfig = getNoteTypeConfig(type);
  const isDaily = targetDate ? true : false;
  const isPublic = !targetDate && !usersId?.length;
  const totalAttachments = (images?.length || 0) + (files?.length || 0);

  return (
    <Link href={`/projects/${projectId._id}/notes/${_id}`}  className="block overflow-hidden w-full">
      <div className={`bg-boxcolor    dark:bg-darkbox dark:hover:bg-darkbluec  w-full overflow-hidden rounded-[12px] p-4 shadow-sm hover:bg-maincolor/10  transition-colors duration-200`}>
        <div className="flex items-start gap-4">
          {/* Icon and Type */}
          <div className={`shrink-0 p-2 rounded-lg bg-`}>
            <Icon 
              icon={typeConfig.icon} 
              className={`w-6 h-6 text-${typeConfig.color}`}
            />
          </div>

          <div className=" overflow-hidden flex-1 min-w-0">
            {/* Type and Badge */}
            <div className="flex items-center justify-between w-full  gap-2 mb-2">
              <span className={`font-medium text-${typeConfig.color}`}>
                {type}
              </span>
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

            {/* Content */}
            <p className="text-textcolor dark:text-subtextcolor   truncate">
              {content}
            </p>

            {/* Footer */}
            <div className="mt-3 flex items-center gap-4 text-sm text-darkgrey">
              {
                <div className="flex items-center gap-1">
                  <Icon icon="material-symbols:attach-file" className="w-4 h-4" />
                  <span>{totalAttachments}</span>
                </div>
              }
              
              {usersId?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Icon icon="material-symbols:group-outline" className="w-4 h-4" />
                  <span>
                    {`For you${usersId.length > 1 ? ` and ${usersId.length - 1} others` : ''}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;