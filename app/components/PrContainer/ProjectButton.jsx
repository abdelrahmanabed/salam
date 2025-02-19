import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

const ProjectButton = (props) => {
  return (
          <Link href={props.href} className=' group flex flex-col bg-boxcolor dark:bg-darkbox hover:border-subcolor dark:hover:border-boxcolor duration-200 gap-2 p-2 relative  border w-full rounded-main   shadow-sm border-darkgrey dark:border-subcolor h-64'>
            <div className=' flex   items-center bg-hovercolor dark:bg-blackgrey p-2 rounded-main gap-2'>
            <Icon icon="fa6-solid:helmet-safety" className=' bg-subtextcolor dark:bg-darkbluec dark:text-bluecolor text-maincolor rounded-circle p-1' width="35" height="35" />
                <span className='flex flex-col  '>
                <span className=' text-xs md:text-base dark:text-subtextcolor'>{props.name} </span> 
                                 <span className='  text-xs dark:text-darkgrey text-blackgrey'>{props.location}</span>

                 </span>
            </div>


            <span className='text-xs gap-2 flex items-center text-darkgrey'>type<span className=' md:text-base text-sm text-blackgrey dark:text-subtextcolor'>{props.type} </span></span>
            <span className='text-xs gap-2 flex items-center text-darkgrey'>client<span className=' md:text-base text-sm text-blackgrey dark:text-subtextcolor'>{props.client} </span></span>
            <span className='text-xs gap-2 flex items-center text-darkgrey'> subcontractors <span className=' md:text-base text-sm text-blackgrey dark:text-subtextcolor'>{props.subcontractors}</span></span>

            <span className=' absolute dark:text-subtextcolor bottom-2 left-2 text-sm '>{props.ramaindays}</span>
           <Icon className=' group-hover:bg-lightblue dark:group-hover:bg-bluecolor duration-300 bg-hovercolor group-hover:text-darkbluec h-10 w-10 p-2 rounded-full absolute right-2 bottom-2 -rotate-90' icon="ep:arrow-down-bold" width="15" height="15" />
           <span className='text-xs gap-2 flex items-center text-darkgrey'>By<span className=' text-sm md:text-base text-blackgrey  dark:text-subtextcolor'>{props.by} </span></span>
           </Link>
  )
}

export default ProjectButton