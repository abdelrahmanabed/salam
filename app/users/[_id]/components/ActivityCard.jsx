import React from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const ActivityCard = ({ activity, onDownload, downloadStatus }) => {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'Abnormal Event': return "icon-park-solid:abnormal";
      case 'TBT': return "mdi:talk";
      case 'Safety Observation': return "tabler:eye-filled";
      case 'Drill Report': return "fa-solid:star-of-life";
      case 'Audit Report': return "icon-park-solid:audit";
      case 'Training Record': return "fluent:learning-app-16-filled";
      case 'HSE Report': return "mingcute:safety-certificate-fill";
      default: return "mdi:file-document";
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'Abnormal Event': return 'bg-redcolor';
      case 'TBT': return 'bg-greencolor';
      case 'Safety Observation': return 'bg-orangecolor';
      case 'Drill Report': return 'bg-bluecolor';
      case 'Audit Report': return 'bg-bluecolor';
      case 'Training Record': return 'bg-bluecolor';
      case 'HSE Report': return 'bg-bluecolor';
      default: return 'bg-gray-500';
    }
  };

  const getActivityBgColor = (type) => {
    switch(type) {
      case 'Abnormal Event': return 'bg-redcolor dark:bg-darkred';
      case 'TBT': return 'bg-greencolor dark:bg-darkgreen';
      case 'Safety Observation': return 'bg-orangecolor dark:bg-darkorange';
      case 'Drill Report': return 'bg-bluecolor dark:bg-darkblue';
      case 'Audit Report': return 'bg-bluecolor dark:bg-darkblue';
      case 'Training Record': return 'bg-bluecolor dark:bg-darkblue';
      case 'HSE Report': return 'bg-bluecolor dark:bg-darkblue';
      default: return 'bg-gray-500';
    }
  };

  const getActivityPath = (type) => {
    switch(type) {
      case 'Abnormal Event': return 'abnormal';
      case 'Safety Observation': return 'observation';
      case 'TBT': return 'tbt';
      case 'Drill Report': return 'drill';
      case 'Audit Report': return 'audit';
      case 'HSE Report': return 'hse';
      case 'Training Record': return 'training';
      default: return '';
    }
  };

  const isToday = new Date(activity.date).toDateString() === new Date().toDateString();

  return (
    <li className="group rounded-main relative dark:bg-blackgrey bg-backgroundcolor pb-3 pt-0 hover:shadow-lg transition-all duration-300 border-transparent">
     <div className='p-3'> <div className="">
        <div className="flex gap-3 items-start">
          <div className="flex-shrink-0">
            <Icon
              className={`text-4xl ${getActivityColor(activity.activityType)}/10 p-2 rounded-full text-${getActivityColor(activity.activityType).replace('bg-', '')} scale-110 transition-transform duration-300`}
              icon={getActivityIcon(activity.activityType)}
            />
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg mb-1">{activity.activityType}</h3>
                {activity.location && (
                  <div className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    {activity.location}
                    <Icon icon="mdi:location" className="" width="16" height="16" />
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
                {activity.status && (
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    activity.status === 'Open' 
                      ? 'bg-greencolor/20 text-greencolor animate-pulse'
                      : 'bg-redcolor/20 text-redcolor'
                  }`}>
                    {activity.status}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
              {activity.description || activity.topic || activity.drillType || activity.type}
            </p>
          </div>
        </div>
      </div>
</div>
      {activity.hasFiles && (
        <div className={`flex  bg-darkgrey flex-wrap dark:bg-darkbox rounded-main  mx-3  gap-2 p-3 dark:border-gray-800`}>
          {/* Images for TBT and Observations */}
          {Array.isArray(activity.image) && activity.image.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {activity.image.map((img, imgIndex) => {
                const imageUrl = `${process.env.NEXT_PUBLIC_API}${img}`;
                return (
                  <a 
                    key={imgIndex} 
                    href={imageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download
                  >
                    <img
                      src={imageUrl}
                      alt={`Activity Image ${imgIndex + 1}`}
                      className="w-10 h-10 object-cover rounded-main"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </a>
                );
              })}
            </div>
          )}

          {/* Files for Abnormal Events */}
          {activity.activityType === 'Abnormal Event' && (
            ['initialReport', 'investigationReport', 'actionPlan', 'lessonLearned', 'closeoutReport']
              .filter(key => activity[key])
              .map((fileKey) => (
                <button
                  key={fileKey}
                  onClick={() => onDownload(activity[fileKey], `${activity._id}-${fileKey}`)}
                  className={`bg-${activity.activityType === 'Abnormal Event' ? 'redcolor' : 'bluecolor'} 
                    dark:bg-${activity.activityType === 'Abnormal Event' ? 'redcolor' : 'bluecolor'} 
                    dark:hover:bg-${activity.activityType === 'Abnormal Event' ? 'redcolor' : 'bluecolor'} 
                    hover:bg-${activity.activityType === 'Abnormal Event' ? 'darkred' : 'bluecolor'}
                    text-subtextcolor px-3 py-1 rounded-full text-sm transition-all duration-300 flex items-center gap-1`}
                >
                  {downloadStatus[`${activity._id}-${fileKey}`] === 'downloading' ? (
                    <Icon icon="eos-icons:loading" className="animate-spin" />
                  ) : (
                    <Icon icon="mage:file-download-fill" />
                  )}
                  {fileKey.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))
          )}

          {/* Files for other activities */}
          {['report', 'file', 'closeoutFile'].map(fileKey => {
            if (!activity[fileKey]) return null;
            const status = downloadStatus[`${activity._id}-${fileKey}`];
            return (
              <button
                key={fileKey}
                onClick={() => onDownload(activity[fileKey], `${activity._id}-${fileKey}`)}
                className={`bg-${activity.activityType === 'Abnormal Event' ? 'darkred' : 'darkblue'} 
                  dark:bg-${activity.activityType === 'Abnormal Event' ? 'darkred' : 'bluecolor'}
                  dark:hover:bg-${activity.activityType === 'Abnormal Event' ? 'subcolor' : 'bluecolor'}
                  hover:bg-${activity.activityType === 'Abnormal Event' ? 'darkred' : 'darkblue'} 
                  text-subtextcolor px-3 py-1 rounded-full text-sm transition-all duration-300 flex items-center gap-1`}
              >
                {status === 'downloading' ? (
                  <Icon icon="eos-icons:loading" className="animate-spin" />
                ) : (
                  <Icon icon="mage:file-download-fill" />
                )}
                {fileKey.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            );
          })}
        </div>
      )}

      {isToday && (
        <Link
          href={`/Edit/${activity._id}/${getActivityPath(activity.activityType)}`}
          className="absolute top-[75px] right-4"
        >
          <Icon icon="uiw:setting" width="20" height="20" />
        </Link>
      )}
    </li>
  );
};

export default ActivityCard;