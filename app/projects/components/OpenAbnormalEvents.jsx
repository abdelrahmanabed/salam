import React, { Suspense, useContext, useState } from 'react'
import { ProjectsContext } from '../context/ProjectsContext'
import { Icon } from '@iconify/react';
import Link from 'next/link';
import AbnormalCard from './cards/AbnormalCard';

const OpenAbnormalEvents = () => {
  const { project } = useContext(ProjectsContext);
  const [showAll, setShowAll] = useState(false);  // ⬅️ حالة لإظهار أو إخفاء الملاحظات
  const [downloadStatus, setDownloadStatus] = useState({});


  if (!project) {
    return <span>Loading project data...</span>;
  }

  // استخراج كل الأحداث ذات الحالة "Open"
  const openAbnormalEvents = project?.calendar
  ?.flatMap(month => month.months)        // الوصول إلى الشهور
  ?.flatMap(week => week.weeks)           // الوصول إلى الأسابيع
  ?.flatMap(day => day.days)              // الوصول إلى الأيام
  ?.flatMap(day => day.abnormalEvents)    // الوصول إلى الأحداث
  ?.filter(event => event.status === 'Open') || [];
  const sortedOpenAbnormalEvents = openAbnormalEvents
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

    const displayAbnormalEvents = showAll ? sortedOpenAbnormalEvents : sortedOpenAbnormalEvents.slice(0, 1);

  const handleFileDownload = async (filePath, fileKey) => {
    if (!filePath) return;

    try {
      setDownloadStatus({ [fileKey]: 'downloading' });
      
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
      
      setDownloadStatus({ [fileKey]: 'complete' });
      
      setTimeout(() => {
        setDownloadStatus({});
      }, 2000);

    } catch (error) {
      console.error(error);
      setDownloadStatus({ [fileKey]: 'error' });
      
      setTimeout(() => {
        setDownloadStatus({});
      }, 2000);
    }
  };
  return (
    <Suspense fallback={<div/>}>
    <div className=" w-full">
      <h2 className="text-xl font-bold flex justify-between dark:text-subtextcolor items-center mb-4">Open Abnormal Events <span className=' text-sm bg-redcolor dark:text-darkred px-4 p-1 rounded-full '>{openAbnormalEvents.length}</span></h2>

      {sortedOpenAbnormalEvents.length > 0 ? (
        <ul className={`${showAll ? 'max-h-[5000px]' : 'max-h-68 '} transition-all space-y-4 overflow-hidden duration-1000`}>
        {displayAbnormalEvents.map((event, index) => (
    <AbnormalCard key={event._id || index} event={event} index={index} />
  ))}
      </ul>
      ) : (
        <span className="text-gray-500">No open abnormal events found.</span>
      )}

{sortedOpenAbnormalEvents.length > 1 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className=" px-4 py-2  text-white rounded-full dark:text-redcolor hover:text-redcolor transition-all duration-300"
        >
          {showAll ? <Icon  className=' rotate-180 ' icon="mingcute:down-fill" width="24" height="24" />: <Icon icon="mingcute:down-fill" width="24" height="24" />}
          
        </button>
      )}
    </div></Suspense>
  );
}

export default OpenAbnormalEvents;
