// components/Calendar/CalendarDay.js
'use client'
import React from 'react';
import { Icon } from '@iconify/react';
import { format, isSameMonth, parseISO } from 'date-fns';

const CalendarDay = ({ day, dayData, isToday, projectId, router }) => {
  if (!day) {
    return <div className="p-4" />;
  }

  return (
    <div
      onClick={() => dayData && router.push(`/projects/${projectId}/calender/${dayData._id}`)}
      className={`
        p-4 rounded-main min-h-[100px] relative flex flex-col gap-1
        ${isToday ? 'bg-lightblue dark:bg-darkblueb' : dayData ? 'cursor-pointer hover:bg-lightblue dark:hover:bg-lightblue duration-200 bg-backgroundcolor dark:bg-blackgrey' : ' dark:text-blackgrey text-darkgrey bg-blackgrey dark:bg-darkbox'}
      `}
    >
      <span className="font-bold">{format(day, 'd')}</span>
      {dayData && (
        <div className="text-xs flex gap-1 flex-wrap">
          {dayData.tbts.length > 0 && (
            <div className="text-blue-600 hidden md:flex justify-between">
              <Icon className="text-base bg-greencolor p-1 rounded-circle text-subtextcolor" icon="mdi:talk" />      
              <span>{dayData.tbts.length}</span>
            </div>
          )}
          {dayData.abnormalEvents.length > 0 && (
            <div className="text-blue-600 hidden md:flex justify-between">
              <Icon className="text-base bg-redcolor p-1 rounded-circle text-subtextcolor" icon="icon-park-solid:abnormal" />
              <span>{dayData.abnormalEvents.length}</span>
            </div>
          )}
          {dayData.observations.length > 0 && (
            <div className="text-blue-600 hidden md:flex justify-between">
              <Icon className="text-base bg-orangecolor p-1 rounded-circle text-subtextcolor" icon="weui:eyes-on-filled" />
              <span>{dayData.observations.length}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDay;