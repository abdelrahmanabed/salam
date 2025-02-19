import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

const Navbutton = (props) => {
  
  return (
    <Link className={`${props.className}  text-sm md:pr-2 hover:bg-bluecolor hover:text-subtextcolor bg-lightblue text-darkbluec dark:bg-blackgrey dark:text-subtextcolor  flex items-center gap-1 px-1 rounded-full    duration-100`} href={`${props.href}`}>
      <Icon className=' text-maincolor bg-boxcolor dark:bg-darkbluec dark:text-bluecolor p-1 rounded-circle' icon={props.icon} width="24" height="24" />
      <span className=' hidden md:block'>{props.text}</span></Link>
  )
}

export default Navbutton