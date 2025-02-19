import Link from 'next/link';
import React, { useContext } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext';
import { Icon } from '@iconify/react';

// دالة لتصفية الأحداث بناءً على التاريخ والحالة
const filterObservations = (calendar, startDate, endDate, status) => {
  let count = 0;

  calendar.forEach(year => {
    year.months.forEach(month => {
      month.weeks.forEach(week => {
        week.days.forEach(day => {
          const dayDate = new Date(day.date);
          if (dayDate >= startDate && dayDate <= endDate) {
            // تصفية الأحداث بناءً على الحالة
            count += day.observations.filter(event => event.status === status).length;
          }
        });
      });
    });
  });

  return count;
};

const ObservationStats = ( props) => {
  const { project } = useContext(ProjectsContext);

  if (!project || !project.calendar) return null;

  const today = new Date();

  // ✅ بداية الأسبوع (نفترض أن الأسبوع يبدأ من السبت)
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay(); // 0 (الأحد) - 6 (السبت)
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // لو الأسبوع يبدأ من السبت
  startOfWeek.setDate(today.getDate() - offset);

  // بداية الشهر
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // بداية السنة
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  // تاريخ بداية المشروع
  const projectStartDate = new Date(project.startDate);

  // ✅ إحصائيات الأحداث المفتوحة والمغلقة
  const stats = {
    WTD: {
      open: filterObservations(project.calendar, startOfWeek, today, 'Open'),
      closed: filterObservations(project.calendar, startOfWeek, today, 'Closed')
    },
    MTD: {
      open: filterObservations(project.calendar, startOfMonth, today, 'Open'),
      closed: filterObservations(project.calendar, startOfMonth, today, 'Closed')
    },
    YTD: {
      open: filterObservations(project.calendar, startOfYear, today, 'Open'),
      closed: filterObservations(project.calendar, startOfYear, today, 'Closed')
    },
    PTD: {
      open: filterObservations(project.calendar, projectStartDate, today, 'Open'),
      closed: filterObservations(project.calendar, projectStartDate, today, 'Closed')
    }
  };

  return (
    <Link href={'/'} className={`${ props.className} group gap-2 p-2   dark:bg-blackgrey  bg-boxcolor  rounded-main duration-300  w-full  justify-between flex`}>
      {/* الأيقونة والفترات */}
      <div className='flex items-center flex-col'>
        <Icon             icon="weui:eyes-on-filled" className='text-xl sm:text-2xl text-orangecolor' />
        <div className='flex flex-col font-bold dark:text-subtextcolor text-darkorange gap-2 sm:text-base text-sm py-2'>
          <span className='  p-1'>WTD</span>
          <span className='p-1'>MTD</span>
          <span className='p-1'>YTD</span>
          <span className='p-1'>PTD</span>
        </div>
      </div>

      {/* Abnormal Events */}
      <div className='flex items-center w-full    flex-col'>
        <span className='text-sm  font-bold text-darkorange dark:text-subtextcolor  sm:text-base  '>Observes</span>
        <div className='flex flex-col w-full font-bold   sm:text-base  text-sm gap-2 rounded-main py-2'>
          <span className=' p-1 bg-lightorange w-full dark:bg-orangecolor  text-center rounded-main'>{stats.WTD.open + stats.WTD.closed}</span>
          <span className='p-1 bg-lightorange w-full  dark:bg-orangecolor  text-center rounded-main'>{stats.MTD.open + stats.MTD.closed}</span>
          <span className='p-1 bg-lightorange w-full dark:bg-orangecolor   text-center rounded-main'>{stats.YTD.open + stats.YTD.closed}</span>
          <span className='p-1 bg-lightorange w-full  dark:bg-orangecolor  text-center rounded-main'>{stats.PTD.open + stats.PTD.closed}</span>
        </div>
      </div>

      {/* Open Events */}
      <div className='flex  items-center flex-col w-full overflow-hidden  duration-300  '>
        <span className='text-sm font-bold text-darkorange dark:text-subtextcolor  sm:text-base  text-center'>Open</span>
        <div className='flex flex-col gap-2  w-full  sm:text-base  font-bold text-sm rounded-main py-2'>
          <span className='p-1 bg-lightorange w-full dark:bg-orangecolor   text-center rounded-main'>{stats.WTD.open}</span>
          <span className='p-1 bg-lightorange w-full  dark:bg-orangecolor  text-center rounded-main'>{stats.MTD.open}</span>
          <span className='p-1 bg-lightorange w-full  dark:bg-orangecolor  text-center rounded-main'>{stats.YTD.open}</span>
          <span className='p-1 bg-lightorange w-full  dark:bg-orangecolor  text-center rounded-main'>{stats.PTD.open}</span>
        </div>
      </div>

      {/* Closed Events */}
      <div className='flex items-center flex-col overflow-hidden w-full duration-300  '>
        <span className='text-sm font-bold text-darkorange dark:text-subtextcolor  sm:text-base  text-center '>Closed</span>
        <div className='flex flex-col text-sm gap-2 w-full  sm:text-base  font-bold  rounded-main py-2'>
          <span className='p-1 bg-lightorange w-full  dark:bg-orangecolor  text-center rounded-main'>{stats.WTD.closed}</span>
          <span className='p-1 bg-lightorange w-full  dark:bg-orangecolor  text-center rounded-main'>{stats.MTD.closed}</span>
          <span className='p-1 bg-lightorange w-full dark:bg-orangecolor   text-center rounded-main'>{stats.YTD.closed}</span>
          <span className='p-1 bg-lightorange w-full  dark:bg-orangecolor  text-center rounded-main'>{stats.PTD.closed}</span>
        </div>
      </div>
    </Link>
  );
};

export default ObservationStats;
