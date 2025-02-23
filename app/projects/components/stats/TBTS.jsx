import Link from 'next/link';
import React, { Suspense, useContext } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext';
import { Icon } from '@iconify/react';

// Helper function to count TBTs within a date range
const countTBTs = (calendar, startDate, endDate) => {
  let count = 0;

  calendar.forEach(year => {
    year.months.forEach(month => {
      month.weeks.forEach(week => {
        week.days.forEach(day => {
          const dayDate = new Date(day.date);
          if (dayDate >= startDate && dayDate <= endDate) {
            count += day.tbts.length;
          }
        });
      });
    });
  });

  return count;
};

const TBTS = (props) => {
  const { project } = useContext(ProjectsContext);

  if (!project || !project.calendar) return null;

  const today = new Date();

  // ✅ FIX: Start of the week (assuming week starts on Saturday)
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay(); // 0 (Sunday) - 6 (Saturday)
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust if week starts on Saturday
  startOfWeek.setDate(today.getDate() - offset);

  // Start of the month (MTD)
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Start of the year (YTD)
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  // Project start date (PTD)
  const projectStartDate = new Date(project.startDate);

  // Count TBTs
  const wtdCount = countTBTs(project.calendar, startOfWeek, today);
  const mtdCount = countTBTs(project.calendar, startOfMonth, today);
  const ytdCount = countTBTs(project.calendar, startOfYear, today);
  const ptdCount = countTBTs(project.calendar, projectStartDate, today);

  return (
    <Suspense fallback={<div/>}>
    <Link href={'/'} className={`${ props.className} group gap-2 p-2   dark:bg-blackgrey  bg-boxcolor  rounded-main duration-300  w-full  justify-between flex`}>
      <div className='flex items-center flex-col'>
        <Icon icon='mdi:talk' className='text-xl sm:text-2xl text-greencolor' />
        <div className='flex font-bold sm:text-base dark:text-subtextcolor text-darkgreen flex-col gap-2 text-sm py-2'>
          <span className='flex gap-4 p-1 justify-between'>WTD</span>
          <span className='flex gap-4 p-1 justify-between'>MTD</span>
          <span className='flex gap-4 p-1 justify-between'>YTD</span>
          <span className='flex gap-4 p-1 justify-between'>PTD</span>
        </div>
      </div>

      <div className='flex items-center  w-full  flex-col'>
        <span className='text-center text-sm sm:text-base dark:text-subtextcolor  font-bold text-darkgreen'>TBTs</span>
        <div className='flex flex-col w-full sm:text-base dark:text-subtextcolor text-sm font-bold text-darkgreen  gap-2 rounded-main py-2'>
          <span className=' w-full bg-lightgreen dark:bg-greencolor rounded-main text-center p-1'>{wtdCount}</span>
          <span className=' w-full bg-lightgreen dark:bg-greencolor rounded-main text-center p-1'>{mtdCount}</span>
          <span className=' w-full bg-lightgreen dark:bg-greencolor rounded-main text-center p-1'>{ytdCount}</span>
          <span className=' w-full bg-lightgreen dark:bg-greencolor rounded-main text-center p-1'>{ptdCount}</span>
        </div>
      </div>
    </Link></Suspense>
  );
};

export default TBTS;
