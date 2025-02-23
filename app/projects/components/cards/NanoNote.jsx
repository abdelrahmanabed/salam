import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

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

const NanoNote = ({ note }) => {

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
    <Link href={`/projects/${projectId._id}/notes/${_id}`} className="block text-xs my-2  overflow-hidden w-full">
      <div className={`bg-${typeConfig.bgColor}    bg-opacity-50    dark:bg-darkbox dark:hover:bg-darkbluec  w-full overflow-hidden rounded-full p-2 shadow-sm hover:bg-maincolor/10  transition-colors duration-200`}>
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
    </Link>
  );
};

export default NanoNote;