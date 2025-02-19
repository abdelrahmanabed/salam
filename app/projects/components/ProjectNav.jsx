import React from 'react'
import ProjectNavbtn from './ProjectNavbtn'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const ProjectNav = (props) => {
  return (
    <div className={`   gap-2 items-center ${props.className}`}>
      
      <ProjectNavbtn text="ADD NEW" href={`/projects/${props.href}/add`} icon='fluent:note-add-16-filled' />

      <ProjectNavbtn text="IMPORTANTS" href={`/projects/${props.href}/abobs`} icon='fluent:important-12-filled' />
      <ProjectNavbtn text="EVENTS" href={`/projects/${props.href}/events`} icon='ep:list' />
    <ProjectNavbtn text="TEAM" href={`/projects/${props.href}/employees`} icon='mdi:worker' />
    <ProjectNavbtn text="CALENDER" href={`/projects/${props.href}/calender`} icon='mingcute:calendar-month-fill' />
    <Link href={`/projects/${props.href}/settings`}>  <Icon className=' duration-200 dark:text-subtextcolor dark:hover:text-maincolor hover:text-darkbluea' icon="weui:setting-filled" width="20" height="20" />        </Link>
    <Link href={`/projects/${props.href}/info`}>  <Icon className=' duration-200 dark:text-subtextcolor dark:hover:text-maincolor hover:text-darkbluea' icon="material-symbols:info-outline-rounded" width="20" height="20" />        </Link>

    </div>  )
}

export default ProjectNav