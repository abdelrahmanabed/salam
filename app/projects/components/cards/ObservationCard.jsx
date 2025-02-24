import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const ObservationCard = ({ event, index }) => {

      return (
  <div
  className="group border-l-4 dark:text-subtextcolor border-orangecolor bg max-h-96 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative  bg-hovercolor dark:bg-darkbox hover:shadow-lg transition-all duration-300  border-transparent "
  ><div className=' p-4  pb-0'>

             <div className='flex h-[95px] gap-3 items-start'>
               <div className="flex-shrink-0">
                 <Icon 
            className="text-4xl  bg-orangecolor/20  p-2 rounded-circle text-orangecolor scale-110 transition-transform duration-300" 
            icon="weui:eyes-on-filled" 
                 />
               </div>
               <div className='flex-grow'>
                 <div className="flex justify-between items-start mb-2">
                   <div>
                   <h3 className="font-semibold text-xl text-orangecolor ">{event.type}</h3>
                   <div className='text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400'>
                       {event.location}
                       <Icon icon="mdi:location" className="text-orangecolor" width="16" height="16" />

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
             </div></div>
           
          <div className='min-h-12'>
             {event.image && event.image.length > 0 && (
      <div className='flex      flex-wrap rounded h-full  gap-2  ml-3 mb-0  dark:border-gray-800'>
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
                         alt={`Observation Image ${imgIndex + 1}`}
                         className="w-9 h-9 object-cover rounded-main transition-transform duration-300 group-hover/image:scale-105 ring-2 ring-orangecolor/20 hover:ring-orangecolor"
                         onError={(e) => e.target.style.display = 'none'}
                       />
                       <div className="absolute inset-0 bg-orangecolor/0 group-hover/image:bg-orangecolor/10 rounded-lg transition-all duration-300 flex items-center justify-center">
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
           { event.observedBy._id &&    <div className='  flex justify-between h-full items-center gap-2 p-3 pt-0'>
        <Link href={`/users/${event.observedBy._id}`} className=' overflow-hidden  flex items-center gap-1 rounded-full bg-orangecolor p-1 pr-3 '>   
           <div className=' overflow-hidden h-7 w-7 rounded-circle'>
           <img  src={`${process.env.NEXT_PUBLIC_API}${event.observedBy.image}`} className=''/>
           </div>
           <span className=' text-subtextcolor text-xs font-bold '>{event.observedBy.name}</span>

        </Link>
        <span className=' text-xs dark:text-subtextcolor/90'>
              {new Date(event.dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })}              </span>
        </div>  }

        <Link
          href={`/Edit/${event._id}/observation`}
          className="absolute top-[75px] right-4"
        >
          <Icon icon="uiw:setting" width="20" height="20" />
        </Link> 
           </div>
  );
};

export default ObservationCard;