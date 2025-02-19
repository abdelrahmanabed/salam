import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

const ProjectNavbtn = (props) => {
  return (
    <Link
        href={props.href}
        className={`${props.className}  md:text-sm text-darkbluec dark:bg-darkbluea dark:text-verylightblue dark:hover:bg-bluecolor  bg-lightblue flex items-center gap-1 md:w-fit p-2 px-3 md:rounded-full hover:bg-darkbluec hover:text-subtextcolor duration-200 `}
    >
     <Icon icon={props.icon} width="20" height="20" />
        {props.text}
    </Link>
  )
}

export default ProjectNavbtn