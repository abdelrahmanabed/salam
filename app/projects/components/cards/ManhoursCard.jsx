import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const ManhoursCard = ({ manhours, index, edit }) => {
  
  // Format date
  const formattedDate = new Date(manhours.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <div
      className="group border-l-4 dark:text-subtextcolor border-bluecolor bg max-h-96 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative bg-hovercolor dark:bg-darkbox hover:shadow-lg transition-all duration-300 border-transparent"
    >
      <div className='p-4 pb-0'>
        <div className='flex h-[95px] gap-3 items-start'>
          <div className="flex-shrink-0">
            <Icon
              className="text-4xl bg-bluecolor/20 p-2 rounded-circle text-bluecolor scale-110 transition-transform duration-300"
              icon="mdi:timer-outline"
            />
          </div>
          <div className='flex-grow'>
            <div className="flex justify-between items-start mb-2">
              <div className='flex flex-col'>
                <h3 className="font-semibold md:text-xl sm:text-lg text-bluecolor">Manhours Record</h3>
               
              </div>
              <div className='flex flex-col items-end gap-2'>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  manhours.LTI
                    ? 'bg-redcolor/20 text-redcolor'
                    : ' bg-greencolor/50'
                }`}>
                  
                </span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex flex-wrap gap-2">
              <span className="bg-bluecolor/10 px-2 py-1 rounded-full text-xs">
                Manpower: {manhours.manpower}
              </span>
              <span className="bg-bluecolor/10 px-2 py-1 rounded-full text-xs">
                Hours: {manhours.dayWorkingHours}h
              </span>
              <span className="bg-bluecolor/10 px-2 py-1 rounded-full text-xs">
                Total: {manhours.totalManhours}h
              </span>
              {manhours.totalSafeManhours > 0 && (
                <span className="bg-greencolor/10 px-2 py-1 rounded-full text-xs text-greencolor">
                  Safe: {manhours.totalSafeManhours}h
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className='flex-grow'></div>
      
      <div className='flex h-full items-center justify-between gap-2 p-3 pt-0'>
        {(manhours.by)  &&(!manhours.byAdmin) && (
          <Link 
            href={'/'} 
            className='overflow-hidden flex items-center gap-1 rounded-full bg-bluecolor p-2'
          >
       
            <span className='text-subtextcolor text-xs font-bold'>
              {manhours.by?.name  || 'Unknown'}
            </span>
          </Link>
        )}
        {(manhours.byAdmin) && (
          <Link 
            href={'/'} 
            className='overflow-hidden flex items-center gap-1 rounded-full border-2 border-bluecolor p-2'
          >
       
            <span className='dark:text-subtextcolor text-xs font-bold'>
              {manhours.byAdmin?.name  || 'Unknown'}
            </span>
          </Link>
        )}
        <span className='text-xs dark:text-subtextcolor/90'>
          {formattedDate}
        </span>
      </div>
   
    </div>
  );
};

export default ManhoursCard;