import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import DownloadButton from '../DownloadAbnormal';

const AbnormalCard = ({ event, index,edit }) => {

  return (
<div
    className="group border-l-4  dark:text-subtextcolor border-redcolor bg max-h-96 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative  bg-hovercolor dark:bg-darkbox hover:shadow-lg transition-all duration-300  border-transparent "
    ><div className=' p-4  pb-0'>
      <div className='flex h-[95px] gap-3 items-start'>
        <div className="flex-shrink-0">
          <Icon 
            className="text-4xl  bg-redcolor/20  p-2 rounded-circle text-redcolor scale-110 transition-transform duration-300" 
            icon="jam:triangle-danger-f" 
          />
        </div>
        <div className='flex-grow'>
          <div className="flex justify-between items-start mb-2">
            <div className=' flex flex-col'>
              <h3 className="font-semibold md:text-xl sm:text-lg text-redcolor ">{event.eventType}</h3>
              <div className='text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400'>
                {event.location}
                <Icon icon="mdi:location" className="text-redcolor" width="16" height="16" />
 
              </div>
            </div>
            <div className='flex flex-col items-end gap-2'>
           
              <span className={`px-3 py-1 rounded-full text-xs ${
                event.status === 'Open' 
                  ? 'bg-greencolor/20 text-greencolor animate-pulse'
                  : 'bg-redcolor/20 text-redcolor'
              }`}>
                {event.status}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
            {event.description}
          </p>
        </div>
        
      </div>
      
      </div>
    
      <div className='flex ml-3 min-h-12 h-full pb-2     flex-wrap rounded   gap-2   dark:border-gray-800'>
        {['initialReport', 'investigationReport', 'actionPlan', 'lessonLearned', 'closeoutReport']
          .filter(key => event[key])
          .map((fileKey) => (
            <DownloadButton 
              key={fileKey}
              filePath={event[fileKey]}
              color="dark:bg-subcolor/50 text-xs dark:text-hovercolor bg-boxcolor  dark:hover:bg-subcolor hover:bg-boxcolor duration-200 font-bold text-darkred "
              reportType={fileKey}
              className="transition-all duration-300"
            />
          ))
        }
      </div>
    
     <div className='  flex h-full items-center justify-between gap-2 p-3 pt-0'>
        {event.uploadedBy?._id && !event.uploadedByAdmin&&  <Link href={`/users/${event.uploadedBy?._id}`} className=' overflow-hidden  flex items-center gap-1 rounded-full bg-redcolor p-1 pr-3 '>   
           <div className=' overflow-hidden h-7 w-7 rounded-circle'>
           <img src={`${process.env.NEXT_PUBLIC_API}${event.uploadedBy.image}`} className=''/>
           </div>
           <span className=' text-subtextcolor text-xs font-bold '>{event.uploadedBy?.name}</span>

        </Link>}
        {event.uploadedByAdmin&&<Link href={`/admins/${event.uploadedByAdmin.id}`} className='   overflow-hidden font-bold text-xs  flex items-center gap-1 rounded-full border-4 border-redcolor/20 p-2 py-1 '>
            {event.uploadedByAdmin.name}
        </Link>}
        <span className=' text-xs dark:text-subtextcolor/90'>
              {new Date(event.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })}              </span>
        </div>  
        <Link
          href={`/Edit/${event._id}/abnormal`}
          className="absolute top-[75px] right-4"
        >
          <Icon icon="uiw:setting" width="20" height="20" />
        </Link> 
    </div>
     )
}

export default AbnormalCard