'use client'
import React from 'react';
import CalendarDay from './CalendarDay';

const CalendarGrid = ({ calendarDays }) => {
  return (
    <div className="grid grid-cols-7 gap-0.5 md:gap-1">
      {/* Day Headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center dark:text-subtextcolor font-bold p-2">
          {day}
        </div>
      ))}
      
      {/* Calendar Days */}
      {calendarDays}
    </div>
  );
};

export default CalendarGrid;