import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const TBTCard = ({ event, index }) => {
 
  return (
  <div
  className="group dark:text-subtextcolor   bg max-h-80 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative  bg-greencolor/15 border-l-4 border-greencolor hover:shadow-lg transition-all duration-300  border-transparent "
  ><div className=' p-4  pb-0'>

             <div className='flex h-[95px] gap-3 items-start'>
               <div className="flex-shrink-0">
                 <Icon 
                   className="text-4xl bg-greencolor/30 dark:bg-greencolor/20 p-2 rounded-circle text-greencolor scale-110 transition-transform duration-300" 
                   icon="mdi:talk" 
                 />
               </div>
               <div className='flex-grow'>
                 <div className="flex justify-between items-start mb-2">
                   <div>
                     <h3 className="font-semibold md:text-xl sm:text-lg ">TBT</h3>
                   <div className='flex'> <div className='text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400'>
                       {event.location}
                       <Icon icon="mdi:location" className="text-greencolor" width="16" height="16" />

                     </div>
                     <div className='text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400'>
                     {event.numberOfAttendees}
                     <Icon icon="raphael:people" className="text-greencolor" width="16" height="16" />

                     </div></div> 
                   </div>
                  
                 </div>
                 
                 <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                   {event.topic}
                 </p>
               </div>
             </div></div>
           <div className='min-h-12'>
             {event.image && event.image.length > 0 && (
      <div className='flex  mb-3     flex-wrap rounded h-full  gap-2  ml-3   dark:border-gray-800'>
                 {event.image.map((imgPath, imgIndex) => {
                   const imageUrl = `${process.env.NEXT_PUBLIC_API}${imgPath}`;
                   return (
                     <a 
                       key={imgIndex} 
                       href={imageUrl} 
                       target="_blank" 
                       className="relative group/image"
                       download
                     >
                       <img
                         src={imageUrl}
                         alt={`TBT Image ${imgIndex + 1}`}
                         className="w-9 h-9 object-cover rounded-main transition-transform duration-300 group-hover/image:scale-105 ring-2 ring-greencolor/20 hover:ring-greencolor"
                         onError={(e) => e.target.style.display = 'none'}
                       />
                       <div className="absolute inset-0 bg-greencolor/0 group-hover/image:bg-greencolor/10 rounded-lg transition-all duration-300 flex items-center justify-center">
                         <Icon 
                           icon="heroicons:arrow-down-tray" 
                           className="text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                           width="20"
                           height="20"
                         />
                       </div>
                     </a>
                   );
                 })}
               </div>
             )}</div>
              <div className='flex h-full justify-between items-center gap-2 p-3 pt-0'>
        { event.conductedBy._id &&!event.conductedByAdmin&& <Link href={`/users/${event.conductedBy._id}`} className=' overflow-hidden  flex items-center gap-1 rounded-full bg-darkgreen p-1 pr-3 '>   
           <div className=' overflow-hidden h-7 w-7 rounded-circle'>
           <img  src={`${process.env.NEXT_PUBLIC_API}${event.conductedBy.image}`} className=''/>
           </div>
           <span className=' text-subtextcolor text-xs font-bold '>{event.conductedBy.name}</span>

        </Link>}
        {event.conductedByAdmin&&<Link href={`/admins/${event.conductedByAdmin.id}`} className=' overflow-hidden font-bold text-xs  flex items-center gap-1 rounded-full border-4 border-greencolor/20 p-2 py-1 '>
            {event.conductedByAdmin.name}
        </Link>}
        <span className=' text-xs dark:text-subtextcolor/90'>
              {new Date(event.dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })}              </span>
        </div>  

        <Link
          href={`/Edit/${event._id}/tbt`}
          className="absolute top-[75px] right-4"
        >
          <Icon icon="uiw:setting" width="20" height="20" />
        </Link> 
           </div>
  );
};

export default TBTCard;