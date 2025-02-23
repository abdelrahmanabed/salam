// components/Calendar/CalendarNavigation.js
'use client'
import React from 'react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';

const CalendarNavigation = ({ 
  currentDate, 
  goToPreviousMonth, 
  goToNextMonth, 
  handleMonthYearChange,
  projectStart,
  projectEnd,
  isBeforeStart,
  isAfterEnd
}) => {
  const dateFormat = "yyyy-MM";
  
  return (
    <div className="flex items-center justify-between mb-6">
      <button 
        onClick={goToPreviousMonth}
        className={`p-2 bg-darkbluea rounded-circle text-subtextcolor hover:bg-maincolor disabled:bg-blackgrey`}
        disabled={isBeforeStart}
      >
        <Icon icon="ep:arrow-left-bold" width="24" height="24" />
      </button>
      
      <div className="flex gap-4 items-center">
        <input
          type="month"
          value={format(currentDate, dateFormat)}
          onChange={handleMonthYearChange}
          min={format(projectStart, dateFormat)}
          max={format(projectEnd, dateFormat)}
          className="bg-lightblue dark:bg-darkbluea rounded-full font-bold flex justify-center rounded p-2"
        />
      </div>
      
      <button 
        onClick={goToNextMonth}
        className={`p-2 bg-darkbluea rounded-circle text-subtextcolor hover:bg-maincolor disabled:bg-blackgrey`}
        disabled={isAfterEnd}
      >
        <Icon icon="ep:arrow-right-bold" width="24" height="24" />
      </button>
    </div>
  );
};

export default CalendarNavigation;