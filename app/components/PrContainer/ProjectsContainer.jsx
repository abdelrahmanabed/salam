'use client'
import { Icon } from '@iconify/react'
import ProjectButton from './ProjectButton'
import React, { useContext, useState } from 'react';
import { ProjectsContext } from '../../projects/context/ProjectsContext';
import Link from 'next/link';

const ProjectsContainer = () => {
    const [showed, setShowed] = useState(true)
    const { projects, loading } = useContext(ProjectsContext);
    const calculateDuration = (startDate, endDate) => {
      const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      
      if (totalDays <= 0) return "Expired";
    
      const years = Math.floor(totalDays / 365);
      const remainingDaysAfterYears = totalDays % 365;
      const months = Math.floor(remainingDaysAfterYears / 30);
      const days = remainingDaysAfterYears % 30;
    
      return `${years > 0 ? `${years}y, ` : ''}${
        months > 0 ? `${months}m, ` : ''}
        ${days}d`;
    };
    
  return (
    <div className='p-2 gap-2 flex flex-col w-full'>
        <div className='p-2 dark:bg-darkbluec  bg-border rounded-main items-center flex justify-between'>

           <span  onClick={()=> setShowed(!showed)} className=' text-subcolor dark:text-subtextcolor cursor-pointer w-full flex items-center gap-3'>
           <Icon className={`${showed?"":' -rotate-90'} font- duration-200`} icon="mingcute:down-fill" width="24" height="24" />
            Projects</span>
                 <div>
                <Link href='/projects/addproject' className=' bg-hovercolor hover:bg-lightgreen duration-200 rounded-full'>
                 <Icon icon="typcn:plus" className=' hover:text-subtextcolor text-maincolor hover:bg-maincolor bg-boxcolor rounded-circle' width="24" height="24" />
                </Link>
                </div>
           
           
        </div>

       { loading? <div className='w-full h-96 flex justify-center items-center'><div className='loader'></div></div> :
       <div className={`${showed? " ":"h-0 px-2 py-0"} duration-200 ease-in-out  gap-2 grid sm:grid-cols-2 overflow-hidden  lg:grid-cols-3`}>
        {projects.map((project) => (
          <ProjectButton
            by={project.createdBy ? project.createdBy.name : 'Unknown'}  // التحقق إذا كانت createdBy موجودة
            key={project._id}
            href={`/projects/${project._id}`}
            name={project.name}
            location={project.location.address}
            type={project.type}
            client={project.client}
            subcontractors={project.subcontractors.join(', ')}
            ramaindays={calculateDuration(new Date(), new Date(project.endDate))}
            />
        ))}

        </div>}
        
    </div>
  )
}

export default ProjectsContainer