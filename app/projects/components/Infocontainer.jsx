import React, { Suspense, useContext } from 'react'
import InfoBox from './infobox'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { TodayContext } from '../context/TodayContext'
const Infocontainer = (props) => {
  const  todayData  = useContext(TodayContext);
  const manPower = todayData?.manhours?.manpower || 0;
  const dayHours = todayData?.manhours?.dayWorkingHours || 0;
  const manHours = todayData?.manhours?.totalManhours || 0;
  const abnormalEventsCount = todayData?.abnormalEvents?.length || 0;
  const observationsCount = todayData?.observations?.length || 0;
  const tbtsCount = todayData?.tbts?.length || 0;
    const today = new Date().toLocaleDateString('en-GB', {
        weekday: 'long', // يوم الأسبوع
        year: 'numeric', // السنة
        month: 'long', // الشهر
        day: 'numeric', // اليوم
      });
      const notes = todayData?.notes || [];
      const notesCount = notes.length;
      const getNoteTypeConfig = (type) => {
        const config = {
          Warning: { icon: 'material-symbols:warning-outline', bgColor: 'orangecolor' },
          Notice: { icon: 'material-symbols:info-outline', bgColor: 'bluecolor' },
          Alert: { icon: 'material-symbols:notification-important-outline', bgColor: 'redcolor' },
          Reminder: { icon: 'material-symbols:timer-outline', bgColor: 'pinkcolor' },
          News: { icon: 'material-symbols:newspaper', bgColor: 'cyancolor' },
          Thank: { icon: 'material-symbols:favorite-outline', bgColor: 'rosecolor' },
          Promote: { icon: 'material-symbols:campaign-outline', bgColor: 'greencolor' }
        };
        return config[type];
      };

      const uniqueNoteTypes = [...new Set(notes.map(note => note.type))];

  return (
    <Suspense fallback={<div/>}>
    <div className='flex-col  mt-4 flex gap-2' >
        <div className=' flex justify-between'> <span className=' mb-2 dark:text-hovercolor text-xs flex items-end gap-2'><span className='font-black text-sm  md:text-lg text-blackgrey bg-maincolor/20 p-2 rounded-full dark:text-hovercolor'>Today</span> {today}</span>
       
        {notesCount > 0 && (
          <div className="flex items-center  gap-2 text-sm font-bold dark:text-hovercolor">
            <div className="flex ">
              {uniqueNoteTypes.map(type => {
                const typeConfig = getNoteTypeConfig(type);
                return (
                  <Icon 
                    key={type} 
                    icon={typeConfig.icon} 
                    className={`bg-${typeConfig.bgColor} text-${typeConfig.bgColor} bg-opacity-60 -m-1  rounded-circle p-1 w-6 h-6`} 
                  />
                );
              })}
            </div>
          </div>
        )}</div>
        <div className=' mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-3   md:gap-4 md:px-0  '>
        <InfoBox 
          textcolor='text-darkblueb truncate overflow-hidden dark:text-subcolor' 
          valuecolor='text-darkbluec dark:text-subcolor' 
          iconcolor='bg-lightblue text-bluecolor dark:bg-darkbluec/90' 
          linkcolor='bg-lightblue/50 hover:bg-lightblue/50 dark:bg-bluecolor/90 ' 
          text="ManPower" 
          value={manPower} 
          icon='fluent:people-team-20-filled'
        />
        <InfoBox 
          textcolor='text-darkblueb truncate overflow-hidden dark:text-subcolor' 
          valuecolor='text-darkbluec dark:text-subcolor' 
          iconcolor='bg-lightblue text-bluecolor dark:bg-darkbluec/90' 
          linkcolor='bg-lightblue/50 hover:bg-lightblue/50 dark:bg-bluecolor/90 ' 
          text='DayHours' 
          value={dayHours} 
          icon='tabler:clock-hour-4-filled'
        />
        <InfoBox 
          textcolor='text-darkblueb truncate overflow-hidden dark:text-subcolor' 
          valuecolor='text-darkbluec dark:text-subcolor' 
          iconcolor='bg-lightblue text-bluecolor dark:bg-darkbluec/90' 
          linkcolor='bg-lightblue/50  dark:bg-bluecolor/90 ' 
          text='ManHours' 
          value={manHours} 
          icon='fa-solid:business-time'
        />
        <InfoBox 
          textcolor='text-darkorange truncate overflow-hidden dark:text-subcolor' 
          valuecolor='text-darkorange dark:text-subcolor' 
          iconcolor='bg-lightorange text-orangecolor dark:bg-darkorange/90' 
          linkcolor='bg-lightorange/50  dark:bg-orangecolor/90 ' 
          text='Observations' 
          value={observationsCount} 
          icon='weui:eyes-on-filled'
        />
        <InfoBox 
          textcolor='text-darkgreen dark:text-subcolor' 
          valuecolor='text-darkgreencolor dark:text-subcolor' 
          iconcolor='bg-lightgreen text-greencolor dark:bg-darkgreen/90' 
          linkcolor='bg-lightgreen/50  dark:bg-greencolor/90' 
          text='TBTs' 
          value={tbtsCount} 
          icon='mdi:talk'
        />
        <InfoBox 
          textcolor='text-darkred truncate overflow-hidden dark:text-subcolor' 
          valuecolor='text-darkredcolor dark:text-subcolor' 
          iconcolor='bg-lightred text-redcolor dark:bg-darkred/90' 
          linkcolor='bg-lightred/50  dark:bg-redcolor/90 ' 
          text='Abnormals' 
          value={abnormalEventsCount} 
          icon='jam:triangle-danger-f'
        />
        <Link href={props.dayhref} className=' hover:text-maincolor dark:text-hovercolor dark:hover:text-bluecolor flex items-center justify-center gap-2 hover:gap-6 duration-300' >
        <span className=' text-xs  sm:text-sm font-bold '>FULL DAY</span> <Icon icon="ep:arrow-up-bold" className=' bg-maincolor/20 p-2 rounded-full text-darkbluea rotate-90' width="40" height="40" />
        </Link>
            
        </div>
        
    </div></Suspense>
  )
}

export default Infocontainer