import React, { Suspense, useContext } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext';
import { Icon } from '@iconify/react';

// دالة لتصفية الأحداث بناءً على التاريخ والحالة
const filterAbnormalEvents = (calendar, startDate, endDate, status) => {
  let count = 0;

  calendar.forEach(year => {
    year.months.forEach(month => {
      month.weeks.forEach(week => {
        week.days.forEach(day => {
          const dayDate = new Date(day.date);
          if (dayDate >= startDate && dayDate <= endDate) {
            // تصفية الأحداث بناءً على الحالة
            count += day.abnormalEvents.filter(event => event.status === status).length;
          }
        });
      });
    });
  });

  return count;
};

const AbnormalStats = (props) => {
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
      open: filterAbnormalEvents(project.calendar, startOfWeek, today, 'Open'),
      closed: filterAbnormalEvents(project.calendar, startOfWeek, today, 'Closed')
    },
    MTD: {
      open: filterAbnormalEvents(project.calendar, startOfMonth, today, 'Open'),
      closed: filterAbnormalEvents(project.calendar, startOfMonth, today, 'Closed')
    },
    YTD: {
      open: filterAbnormalEvents(project.calendar, startOfYear, today, 'Open'),
      closed: filterAbnormalEvents(project.calendar, startOfYear, today, 'Closed')
    },
    PTD: {
      open: filterAbnormalEvents(project.calendar, projectStartDate, today, 'Open'),
      closed: filterAbnormalEvents(project.calendar, projectStartDate, today, 'Closed')
    }
  };
 
  return (
    <Suspense fallback={<div/>}>
    <div  className={`${ props.className} group gap-2 p-2   dark:bg-blackgrey  bg-boxcolor  rounded-main duration-300  w-full  justify-between flex`}>
      {/* الأيقونة والفترات */}
      <div className='flex items-center  flex-col'>
        <Icon             icon="icon-park-solid:abnormal" className=' text-xl sm:text-2xl text-redcolor' />
        <div className='flex flex-col gap-2 font-bold text-darkred dark:text-subtextcolor text-sm sm:text-base py-2'>
          <span className=' p-1 rounded-main'>WTD</span>
          <span className=' p-1 rounded-main'>MTD</span>
          <span className=' p-1 rounded-main'>YTD</span>
          <span className='p-1 rounded-main'>PTD</span>
        </div>
      </div>

      {/* Abnormal Events */}
      <div className='flex items-center  flex-col w-full'>
        <span className='text-sm font-bold dark:text-subtextcolor text-darkred sm:text-base'>Abnormals</span>
        <div className='flex flex-col text-sm dark:text-subtextcolor font-bold w-full text-darkred sm:text-base gap-2 rounded-main py-2'>
          <span className=' bg-lightred dark:bg-redcolor dark:text-subtextcolor p-1 rounded-main text-center'>{stats.WTD.open + stats.WTD.closed}</span>
          <span className=' bg-lightred dark:bg-redcolor dark:text-subtextcolor p-1 rounded-main text-center'>{stats.MTD.open + stats.MTD.closed}</span>
          <span className=' bg-lightred dark:bg-redcolor dark:text-subtextcolor p-1 rounded-main text-center'>{stats.YTD.open + stats.YTD.closed}</span>
          <span className=' bg-lightred dark:bg-redcolor dark:text-subtextcolor p-1 rounded-main text-center'>{stats.PTD.open + stats.PTD.closed}</span>
        </div>
      </div>

      {/* Open Events */}
      <div className='flex items-center flex-col overflow-hidden duration-300 w-full '>
        <span className='font-bold dark:text-subtextcolor text-darkred text-sm text-center sm:text-base '>Open</span>
        <div className='flex flex-col gap-2 dark:text-subtextcolor font-bold w-full text-darkred sm:text-base text-sm rounded-main py-2'>
          <span className=' bg-lightred dark:bg-redcolor p-1 rounded-main text-center'>{stats.WTD.open}</span>
          <span className=' bg-lightred dark:bg-redcolor p-1 rounded-main text-center'>{stats.MTD.open}</span>
          <span className=' bg-lightred dark:bg-redcolor p-1 rounded-main text-center'>{stats.YTD.open}</span>
          <span className=' bg-lightred dark:bg-redcolor p-1 rounded-main text-center'>{stats.PTD.open}</span>
        </div>
      </div>

      {/* Closed Events */}
      <div className='flex items-center flex-col overflow-hidden duration-300  w-full '>
        <span className='font-bold text-darkred text-sm text-center sm:text-base dark:text-subtextcolor'>Closed</span>
        <div className='flex flex-col text-sm gap-2 w-full font-bold sm:text-base rounded-main py-2'>
          <span className=' bg-lightred dark:bg-redcolor p-1 rounded-main text-center'>{stats.WTD.closed}</span>
          <span className=' bg-lightred dark:bg-redcolor p-1 rounded-main text-center'>{stats.MTD.closed}</span>
          <span className=' bg-lightred dark:bg-redcolor p-1 rounded-main text-center'>{stats.YTD.closed}</span>
          <span className=' bg-lightred dark:bg-redcolor p-1 rounded-main text-center'>{stats.PTD.closed}</span>
        </div>
      </div>
    </div></Suspense>
  );
};

export default AbnormalStats;
