'use client'
import React, { useContext, useState, useEffect, Suspense } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext';
import { useRouter } from 'next/navigation';
import { 
  format,
  addMonths,
  subMonths,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isAfter,
  isBefore,
  eachDayOfInterval,
  parseISO
} from 'date-fns';
import { Icon } from '@iconify/react';
import { ProjectCalendarSkeleton } from '@/app/components/Loading';

const ProjectCalendar = () => {
  const router = useRouter();
  const { project,projectLoading } = useContext(ProjectsContext);
  const [currentDate, setCurrentDate] = useState(null);
if(projectLoading){
  return <ProjectCalendarSkeleton />;

}
    useEffect(() => {
    const today = new Date();
    const projectStart = parseISO(project.startDate);
    const projectEnd = parseISO(project.endDate);
    
    let initialDate;
    if (isWithinInterval(today, { start: projectStart, end: projectEnd })) {
      // If today is within project duration, use today
      initialDate = today;
    } else if (isBefore(today, projectStart)) {
      // If today is before project start, use project start
      initialDate = projectStart;
    } else {
      // If today is after project end, use project end
      initialDate = projectEnd;
    }
    
    setCurrentDate(startOfMonth(initialDate));
  }, [project]);

  if (!currentDate) {
    return <ProjectCalendarSkeleton />;
  }

  const projectStart = parseISO(project.startDate);
  const projectEnd = parseISO(project.endDate);

  // Navigation functions
  const goToPreviousMonth = () => {
    const newDate = startOfMonth(subMonths(currentDate, 1));
    // Check if the new date's month is within or equal to project start/end months
    if (!isBefore(newDate, startOfMonth(projectStart))) {
      setCurrentDate(newDate);
    }
  };

  const goToNextMonth = () => {
    const newDate = startOfMonth(addMonths(currentDate, 1));
    // Check if the new date's month is within or equal to project start/end months
    if (!isAfter(newDate, startOfMonth(projectEnd))) {
      setCurrentDate(newDate);
    }
  };

  // Handle direct month/year selection
  const handleMonthYearChange = (e) => {
    const selectedDate = parseISO(e.target.value + '-01');
    const newDate = startOfMonth(selectedDate);
    
    if (isWithinInterval(newDate, { 
      start: startOfMonth(projectStart), 
      end: startOfMonth(projectEnd) 
    })) {
      setCurrentDate(newDate);
    }
  };

  // Get calendar data for current month
  const findCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    
    const yearData = project.calendar.find(y => y.year === year);
    if (!yearData) return null;
    
    const monthData = yearData.months.find(m => m.month === month);
    return monthData;
  };

  // Calendar grid generation
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = monthStart;
  const endDate = monthEnd;
  
  const dateFormat = "yyyy-MM";
  const monthData = findCalendarData();
  
  const firstDayOfMonth = monthStart.getDay();
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="p-4" />);
  }
  
  // Add days of the month
 // Add days of the month
daysInMonth.forEach(day => {
    const dayData = monthData?.weeks
      ?.flatMap(week => week.days)
      ?.find(d => isSameMonth(parseISO(d.date), day) && parseISO(d.date).getDate() === day.getDate());
  
    const isToday = isSameMonth(day, new Date()) && day.getDate() === new Date().getDate();
  
    calendarDays.push(

      <div
      key={day.toString()}
      onClick={() => dayData && router.push(`/projects/${project._id}/calender/${dayData._id}`)}
      className={`
       p-2  md:p-4 rounded-main min-h-[80px] relative flex flex-col gap-0 md:gap-1
        ${isToday ? 'bg-lightblue dark:bg-darkblueb' : dayData ? 'cursor-pointer hover:bg-lightblue dark:hover:bg-lightblue duration-200 bg-backgroundcolor dark:bg-blackgrey' : ' dark:text-blackgrey text-darkgrey bg-blackgrey dark:bg-darkbox'}
      `}
    >
      <span className="font-bold">{format(day, 'd')}</span>
      {dayData && (
        <div className="text-xs flex gap-0 md:gap-1 flex-col md:flex-row flex-wrap">
          {dayData.tbts.length > 0 && (
            <div className="text-blue-600 flex justify-between items-center">
              <Icon  className="text-xs md:text-base bg-greencolor p-1 rounded-circle text-subtextcolor" 
                icon="mdi:talk" 
              />      
                        <span>{dayData.tbts.length}</span>
            </div>
          )}
          {dayData.abnormalEvents.length > 0 && (
            <div className="text-blue-600  flex items-center justify-between">
              <Icon  className="text-xs md:text-base bg-redcolor p-1 rounded-circle text-subtextcolor" 
                 icon="icon-park-solid:abnormal" 
              />
              <span>{dayData.abnormalEvents.length}</span>
            </div>
          )}
          {dayData.observations.length > 0 && (
            <div className="text-blue-600  flex justify-between items-center">
              <Icon  className="text-xs md:text-base bg-orangecolor p-1 rounded-circle text-subtextcolor" 
                icon="weui:eyes-on-filled" 
              />
              <span>{dayData.observations.length}</span>
            </div>
          )}
        
        
        </div>
      )}
    </div>
    );
  });
  
  
  return (
    <Suspense fallback={<div/>}>
 <div className="p-4 dark:text-subtextcolor">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
      <button 
          onClick={goToPreviousMonth}
          className={`p-2 bg-darkbluea rounded-circle text-subtextcolor hover:bg-maincolor disabled:bg-blackgrey `}
          disabled={isBefore(startOfMonth(subMonths(currentDate, 1)), startOfMonth(projectStart))}
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
            className=" bg-lightblue dark:bg-darkbluea rounded-full font-bold flex justify-center rounded p-2"
          />
          
        </div>
        
        <button 
          onClick={goToNextMonth}
          className={`p-2 bg-darkbluea rounded-circle text-subtextcolor hover:bg-maincolor disabled:bg-blackgrey  `}
          disabled={isAfter(startOfMonth(addMonths(currentDate, 1)), startOfMonth(projectEnd))}
        >
          <span className="text-xl">
          <Icon icon="ep:arrow-right-bold" width="24" height="24" />

          </span>
        </button>
      </div>
      
      {/* Calendar Grid */}
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
    </div></Suspense>
  );
};

export default ProjectCalendar;