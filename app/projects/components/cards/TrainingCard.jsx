import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import DownloadButton from '../DownloadButton';

const TrainingCard = ({ event, index }) => {
 
  return (
  <div
  className="group border-l-rosecolor border-l-4 dark:text-subtextcolor  bg max-h-80 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative bg-rosecolor/15 hover:shadow-lg transition-all duration-300  border-transparent "
  ><div className=' p-4  pb-0'>

             <div className='flex gap-3 h-[95px] items-start'>
               <div className="flex-shrink-0">
                 <Icon 
                   className="text-4xl bg-rosecolor/30 p-2 rounded-circle text-rosecolor scale-110 transition-transform duration-300" 
                   icon="fluent:learning-app-20-filled" 
                 />
               </div>
               <div className='flex-grow'>
                 <div className="flex justify-between items-start mb-2">
                   <div>
                     <h3 className="font-semibold md:text-xl sm:text-lg mb-1">Training</h3>
                     <div className='text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400'>
                       {event.numberOfAttendees}
                       <Icon icon="fa6-solid:people-line" className="text-rosecolor" width="16" height="16" />

                     </div>
                   </div>
                
                 </div>
                 
                 <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                   {event.topic}
                 </p>
               </div>
             </div></div>
             <div className='flex  min-h-9  flex-wrap rounded h-full  gap-2 ml-3 mb-3  dark:border-gray-800'>
             {['report', 'file', 'closeoutFile'].map((fileKey) => {
                if (!event[fileKey]) return null;
          
                return (
                  <DownloadButton
                    key={fileKey}
                    filePath={event[fileKey]}
                    color="bg-rosecolor   hover:bg-boxcolor duration-200 font-bold text-darkrose"
                    reportType={fileKey}
                    className="transition-all duration-300"
                  />
                );
              })}
          
        
      </div>
    
       
     <div className='  flex  justify-between h-full items-center gap-2 p-3 pt-0'>
     {event.uploadedBy?._id&& !event.uploadedByAdmin&&  <Link href={`/users/${event.uploadedBy._id}`} className=' overflow-hidden   flex items-center gap-1 rounded-full bg-darkrose p-1 pr-3 '>   
           <div className=' overflow-hidden h-7 w-7 rounded-circle'>
           <img  src={`${process.env.NEXT_PUBLIC_API}${event.uploadedBy.image}`} className=''/>
           </div>
           <span className=' text-subtextcolor text-xs font-bold '>{event.uploadedBy.name}</span>

        </Link>}
        {event.uploadedByAdmin&&<Link href={`/admins/${event.uploadedByAdmin.id}`} className=' overflow-hidden font-bold text-xs  flex items-center gap-1 rounded-full border-4 border-rosecolor/20 p-2 py-1 '>
            {event.uploadedByAdmin.name}
        </Link>}
        <span className='  text-xs dark:text-subtextcolor/90'>
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
          href={`/Edit/${event._id}/training`}
          className="absolute top-[75px] right-4"
        >
          <Icon icon="uiw:setting" width="20" height="20" />
        </Link> 
           </div>
  );
};

export default TrainingCard;