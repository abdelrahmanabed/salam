import React from 'react';

const ProjectCalendarSkeleton = () => {
  // Create a 6-week grid (42 days) to ensure we cover all possible month layouts
  const daysInCalendar = 42;
  
  return (
    <div className="p-4">
      {/* Navigation Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 bg-darkbluea animate-pulse rounded-circle" />
        
        <div className="w-40 h-10 bg-darkbluea animate-pulse rounded-full" />
        
        <div className="w-10 h-10 bg-darkbluea animate-pulse rounded-circle" />
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5 md:gap-1">
        {/* Day Headers Skeleton */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center p-2">
            <div className="w-8 h-4 mx-auto bg-darkbluea animate-pulse rounded" />
          </div>
        ))}
        
        {/* Calendar Days Skeleton */}
        {[...Array(daysInCalendar)].map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-main min-h-[100px] bg-darkbluea animate-pulse flex flex-col gap-2"
          >
            {/* Date number skeleton */}
            <div className="w-6 h-6 bg-blackgrey rounded" />
            
            {/* Icons skeleton */}
            <div className="flex gap-1 mt-auto">
              <div className="w-6 h-6 bg-blackgrey rounded-circle" />
              <div className="w-6 h-6 bg-blackgrey rounded-circle" />
              <div className="w-6 h-6 bg-blackgrey rounded-circle" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCalendarSkeleton;