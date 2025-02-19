import React, { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { UsersContext } from '@/app/contexts/UsersContext';

const Activities = () => {
  const { user } = useContext(UsersContext);
  const [showAll, setShowAll] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState({});
  
  const [filters, setFilters] = useState({
    type: 'all',
    startDate: '',
    endDate: '',
    status: 'all'
  });

  if (!user) {
    return <span>Loading user data...</span>;
  }

  const allActivities = [
    ...(user.abnormalEvents || []).map(event => ({
      ...event,
      activityType: 'Abnormal Event',
      date: event.date,
      hasFiles: event.initialReport || event.investigationReport || event.actionPlan || event.lessonLearned || event.closeoutReport 
    })),
    ...(user.tbts || []).map(tbt => ({
      ...tbt,
      activityType: 'TBT',
      date: tbt.dateTime,
      hasFiles: tbt.image && tbt.image.length > 0
    })),
    ...(user.observations || []).map(obs => ({
      ...obs,
      activityType: 'Safety Observation',
      date: obs.dateTime,
      hasFiles: obs.image && obs.image.length > 0
    })),
    ...(user.drillReports || []).map(drill => ({
      ...drill,
      activityType: 'Drill Report',
      date: drill.date,
      hasFiles: drill.file
    })),
    ...(user.hseReports || []).map(hse => ({
      ...hse,
      activityType: 'HSE Report',
      date: hse.date,
      hasFiles: hse.file
    })),
    ...(user.auditReports || []).map(audit => ({
      ...audit,
      activityType: 'Audit Report',
      date: audit.date,
      hasFiles: audit.file || audit.closeoutFile
    })),
    ...(user.trainingRecords || []).map(training => ({
      ...training,
      activityType: 'Training Record',
      date: training.date,
      hasFiles: training.file
    }))
  ];

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

  const filteredActivities = allActivities.filter(activity => {
    const activityDate = new Date(activity.date);
    const matchesType = filters.type === 'all' || activity.activityType === filters.type;
    const matchesDateRange = (!filters.startDate || activityDate >= new Date(filters.startDate)) &&
                           (!filters.endDate || activityDate <= new Date(filters.endDate));
    const matchesStatus = filters.status === 'all' || 
                         (activity.status === filters.status) || 
                         (!activity.status && filters.status === 'Open');
    
    return matchesType && matchesDateRange && matchesStatus;
  });

  const sortedActivities = filteredActivities.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const displayActivities = showAll ? sortedActivities : sortedActivities.slice(0, 25);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileDownload = async (filePath, fileKey) => {
    if (!filePath) return;

    try {
      setDownloadStatus(prev => ({ ...prev, [fileKey]: 'downloading' }));
      
      const fileName = filePath.split('/').pop();
      const response = await fetch(`http://localhost:5000/api/files/${fileName}`);
      
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      setDownloadStatus(prev => ({ ...prev, [fileKey]: 'complete' }));
      
      setTimeout(() => setDownloadStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[fileKey];
        return newStatus;
      }), 2000);

    } catch (error) {
      console.error(error);
      setDownloadStatus(prev => ({ ...prev, [fileKey]: 'error' }));
      
      setTimeout(() => setDownloadStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[fileKey];
        return newStatus;
      }), 2000);
    }
  };

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

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold flex justify-between items-center mb-4">
        Activities
        <span className='text-sm bg-bluecolor px-4 p-1 rounded-full'>
          {sortedActivities.length}
        </span>
      </h2>

      <div className="mb-4 space-y-2">
        <div className="flex flex-col gap-4">
          <div className='flex w-full gap-8'>
            <select 
              className="p-2 w-full rounded-main dark:bg-darkbox bg-backgroundcolor"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">كل الأنواع</option>
              <option value="Abnormal Event">Abnormal Events</option>
              <option value="TBT">TBTs</option>
              <option value="Safety Observation">Safety Observations</option>
              <option value="Drill Report">Drill Reports</option>
              <option value="Audit Report">Audit Reports</option>
              <option value="Training Record">Training Records</option>
              <option value="HSE Report">HSE Report</option>
            </select>

            <select 
              className="p-2 rounded-main w-full dark:bg-darkbox bg-backgroundcolor"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">كل الحالات</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="date"
              className="p-2 rounded-main w-full dark:bg-darkbox bg-backgroundcolor"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              className="p-2 rounded-main w-full dark:bg-darkbox bg-backgroundcolor"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {sortedActivities.length > 0 ? (
        <ul className={`transition-all space-y-4 overflow-hidden duration-1000`}>
          {displayActivities.map((activity, index) => (
            <li key={activity._id || index} className="p-4 gap-2 flex flex-col rounded-main relative dark:bg-blackgrey bg-backgroundcolor">
              <div className='flex gap-2 items-center'>
                <Icon 
                  className={`text-3xl ${getActivityColor(activity.activityType)} p-1 rounded-circle text-subtextcolor`} 
                  icon={getActivityIcon(activity.activityType)} 
                />
                <div>
                  <div className="font-medium">{activity.activityType}</div>
                  {activity.location && (
                    <div className='text-xs flex items-center gap-1'>
                      {activity.location} <Icon icon="mdi:location" width="12" height="12" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className='flex justify-between items-center'>
                <span className='text-sm ml-9'>
                  {activity.description || activity.topic || activity.drillType || activity.type}
                </span>
                <div className='flex items-center gap-2'>
                  <span className='text-xs'>{new Date(activity.date).toLocaleDateString()}</span>
                  {activity.status && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activity.status === 'Open' ? 'bg-greencolor animate-pulse' : 'bg-redcolor'
                    } text-subtextcolor`}>
                      {activity.status}
                    </span>
                  )}
                </div>
                <Link href={`/Edit/${activity._id}/${getActivityPath(activity.activityType)}`} 
                  className='absolute top-4 right-4'
                >
                  <Icon icon="uiw:setting" width="20" height="20" />
                </Link>
              </div>

              {activity.hasFiles && (
                <div className='flex flex-wrap gap-2'>
                  {Array.isArray(activity.image) && activity.image.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {activity.image.map((img, imgIndex) => {
                        const imageUrl = `http://localhost:5000${img}`;
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

                  {activity.activityType === 'Abnormal Event' && (
                    ['initialReport', 'investigationReport', 'actionPlan', 'lessonLearned', 'closeoutReport']
                      .filter(key => activity[key])
                      .map(fileKey => {
                        const status = downloadStatus[`${activity._id}-${fileKey}`];
                        return (
                          <button
                            key={fileKey}
                            onClick={() => handleFileDownload(activity[fileKey], `${activity._id}-${fileKey}`)}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-redcolor hover:bg-red-700 text-white`}
                            disabled={status === 'downloading'}
                          >
                            {status === 'downloading' ? (
                              <Icon icon="eos-icons:loading" className="animate-spin" />
                            ) : status === 'complete' ? (
                              <Icon icon="clarity:success-standard-line" />
                            ) : status === 'error' ? (
                              <Icon icon="clarity:error-standard-line" />
                            ) : (
                              <Icon icon="mage:file-download-fill" />
                            )}
                            {fileKey.replace(/([A-Z])/g, ' $1').trim()}
                          </button>
                        );
                      })
                  )}

                  {['report', 'file', 'closeoutFile'].map(fileKey => {
                    if (!activity[fileKey]) return null;
                    const status = downloadStatus[`${activity._id}-${fileKey}`];
                    return (
                      <button
                        key={fileKey}
                        onClick={() => handleFileDownload(activity[fileKey], `${activity._id}-${fileKey}`)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm dark:bg-darkbox bg-boxcolor`}
                        disabled={status === 'downloading'}
                      >
                        {status === 'downloading' ? (
                          <Icon icon="eos-icons:loading" className="animate-spin" />
                        ) : status === 'complete' ? (
                          <Icon icon="clarity:success-standard-line" />
                        ) : status === 'error' ? (
                          <Icon icon="clarity:error-standard-line" />
                        ) : (
                          <Icon icon="mage:file-download-fill" />
                        )}
                        {fileKey.replace(/([A-Z])/g, ' $1').trim()}
                      </button>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-gray-500">لا توجد نشاطات تطابق معايير البحث.</span>
      )}

      {sortedActivities.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 px-4 py-2 text-white hover:text-redcolor transition-colors"
        >
          <Icon 
            icon="mingcute:down-fill" 
            className={`transform ${showAll ? 'rotate-180' : ''} transition-transform`}
          />
        </button>
      )}
    </div>
  );
};

export default Activities;