import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import DownloadButton from '../DownloadButton';

const DrillCard = ({ event, index }) => {

  return (
  <div
  className="group border-l-4 border-yellowcolor dark:text-subtextcolor  bg max-h-80 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative bg-yellowcolor/15 hover:shadow-lg transition-all duration-300  border-transparent "
  ><div className=' p-4  pb-0'>

             <div className='flex h-[95px] gap-3 items-start'>
               <div className="flex-shrink-0">
                 <Icon 
                   className="text-4xl bg-yellowcolor/30 p-2 rounded-circle text-yellowcolor scale-110 transition-transform duration-300" 
                   icon="mingcute:run-fill" 
                 />
               </div>
               <div className='flex-grow'>
                 <div className="flex justify-between items-start mb-2">
                   <div>
                     <h3 className="font-semibold md:text-xl sm:text-lg  mb-1"> Drill Report</h3>
                     <div className='text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400'>
                     {event.type}       

                     </div>
                   </div>
               
                 </div>
            
               </div>
             </div></div>
           
             <div className='flex    h-full  flex-wrap rounded   gap-2  ml-3 mb-3  dark:border-gray-800'>
             {['report', 'file', 'closeoutFile'].map((fileKey) => {
                if (!event[fileKey]) return null;
          
                return (
                  <DownloadButton
                    key={fileKey}
                    filePath={event[fileKey]}
                    color="bg-yellowcolor font-bold text-darkyellow duration-200  hover:bg-boxcolor  "
                    reportType={fileKey}
                    className="transition-all duration-300"
                  />
                );
              })}
          
        
      </div>
    
      <div className='  h-full flex justify-between  items-center gap-2 p-3 pt-0'>
      {event.uploadedBy?._id&& !event.uploadedByAdmin&&  <Link href={`/users/${event.uploadedBy._id}`} className=' overflow-hidden  flex items-center gap-1 rounded-full bg-darkyellow p-1 pr-3 '>   
           <div className=' overflow-hidden h-7 w-7 rounded-circle'>
           <img  src={`${process.env.NEXT_PUBLIC_API}${event.uploadedBy.image}`} className=''/>
           </div>
           <span className=' text-subtextcolor text-xs font-bold '>{event.uploadedBy.name}</span>

        </Link>}
        {event.uploadedByAdmin&&<Link href={`/admins/${event.uploadedByAdmin.id}`} className=' overflow-hidden font-bold text-xs  flex items-center gap-1 rounded-full border-4 border-yellowcolor/20 p-2 py-1 '>
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
          href={`/Edit/${event._id}/drill`}
          className="absolute top-[75px] right-4"
        >
          <Icon icon="uiw:setting" width="20" height="20" />
        </Link> 
           </div>
  );
};

export default DrillCard;