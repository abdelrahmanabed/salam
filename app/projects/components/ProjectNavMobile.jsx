import React, { useState } from 'react'
import ProjectNavbtn from './ProjectNavbtn'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const ProjectNavMobile = (props) => {
  const[showed, setShowed] = useState(false)
return (
  <div className={`${props.className} flex flex-col gap-2 items-end w-full relative `}>
      <Icon onClick={()=> setShowed(!showed)} className={` " bg-lightblue text-darkbluec hover:bg-bluecolor dark:bg-darkbluec dark:text-bluecolor   duration-140  p-1 rounded-circle`} icon="ion:menu" width="40" height="40" />
  <div className={`  ${showed? " w-full  h-screen p-4 pt-20 ":"w-0 h-0"} shadow-lg top-0 right-0  dark:bg-darkbox bg-hovercolor justify-center flex  fixed overflow-hidden duration-200 flex-col gap-2 items-center  `}>
  <Icon onClick={()=> setShowed(!showed)} className={` ${showed? 'bg-darkbluec text-subtextcolor ':" bg-boxcolor text-maincolor"} absolute top-12 right-4 hover:bg-darkbluec   p-2 rounded-circle`} icon="mingcute:close-fill" width="48" height="48" />
<div className=' gap-4 rounded-main  grid text-subtextcolor  w-full  overflow-hidden '>

<Link onClick={()=> setShowed(false)} className=' p-2 w-full px-3 flex gap-2 rounded-main   hover:bg-darkbluec dark:text-subtextcolor dark:bg-blackgrey items-center  duration-200 text-xl text-subcolor  bg-boxcolor font-bold hover:text-subtextcolor group '  href={`/projects/${props.href}/abobs`}>  <Icon className='   bg-maincolor text-subtextcolor p-1.5 rounded-full  '  icon='fluent:important-12-filled' width="40" height="40" />   IMPORTANTS     </Link>
<Link onClick={()=> setShowed(false)} className=' p-2 w-full px-3 flex gap-2 rounded-main   hover:bg-darkbluec dark:text-subtextcolor dark:bg-blackgrey items-center  duration-200 text-xl text-subcolor  bg-boxcolor font-bold hover:text-subtextcolor group '  href={`/projects/${props.href}/events`}>  <Icon className='   bg-maincolor text-subtextcolor p-1.5 rounded-full  '  icon='ep:list' width="40" height="40" />   EVENTS     </Link>

  <Link onClick={()=> setShowed(false)} className=' p-2 w-full px-3 flex gap-2 rounded-main   hover:bg-darkbluec dark:text-subtextcolor dark:bg-blackgrey items-center  duration-200 text-xl text-subcolor  bg-boxcolor font-bold hover:text-subtextcolor group '  href={`/projects/${props.href}/employees`}>  <Icon className='   bg-maincolor text-subtextcolor p-1.5 rounded-full  ' icon="mdi:worker" width="40" height="40" />   EMPLOYEES     </Link>
  <Link onClick={()=> setShowed(false)} className=' p-2 w-full px-3 flex gap-2 rounded-main   hover:bg-darkbluec dark:text-subtextcolor dark:bg-blackgrey  items-center   duration-200 text-xl text-subcolor bg-boxcolor font-bold hover:text-subtextcolor '  href={`/projects/${props.href}/calender`}>  <Icon className='bg-maincolor text-subtextcolor p-1.5 rounded-full  ' icon="mingcute:calendar-month-fill" width="40" height="40" />   CALENDER     </Link>
  <Link onClick={()=> setShowed(false)} className=' p-2 w-full px-3 flex gap-2 rounded-main   hover:bg-darkbluec  dark:text-subtextcolor dark:bg-blackgrey items-center   duration-200 text-xl text-subcolor bg-boxcolor font-bold hover:text-subtextcolor '  href={`/projects/${props.href}/settings`}>  <Icon className=' bg-maincolor text-subtextcolor p-1.5 rounded-full ' icon="weui:setting-filled" width="40" height="40" />   SETTINGS     </Link>
  <Link onClick={()=> setShowed(false)} className=' p-2 w-full px-3 flex gap-2 rounded-main   hover:bg-darkbluec  dark:text-subtextcolor dark:bg-blackgrey items-center  duration-200 text-xl text-subcolor bg-boxcolor font-bold hover:text-subtextcolor' href={`/projects/${props.href}/info`}>  <Icon className='bg-maincolor text-subtextcolor p-1.5 rounded-full' icon="material-symbols:info-outline-rounded" width="40" height="40" />  INFO      </Link>
  <Link onClick={()=> setShowed(false)} className=' p-5 w-fit  flex gap-2 rounded-full   hover:bg-darkbluec dark:text-subtextcolor bg-bluecolor/20 items-center  duration-200 text-lg text-subcolor font-bold hover:text-subtextcolor group '  href={`/projects/${props.href}/add`}>  <Icon className='   bg-maincolor text-subtextcolor p-1.5 rounded-full  '  icon='fluent:note-add-16-filled' width="50" height="50" />       </Link>

  </div>
  </div>   </div>)
}
export default ProjectNavMobile