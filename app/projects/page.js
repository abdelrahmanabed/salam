'use client'
import { Icon } from '@iconify/react'
import React, { Suspense, useContext, useState } from 'react';
import { ProjectsContext } from './context/ProjectsContext';
import Link from 'next/link';
import { ProjectsContainerSkeleton } from '../components/Loading';
const ProjectButton = React.lazy(() => import('../components/PrContainer/ProjectButton'));


const ProjectsContainer = () => {
    const { projects } = useContext(ProjectsContext);
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
    <div className='p-2 flex flex-col w-full'>
        <div className='mb-2  flex justify-between'>

           <span   className=' dark:text-subtextcolor text-2xl  w-full flex items-center gap-3'>
            Projects</span>
                 <div>
                <Link href='/projects/addproject' className=' bg-backgroundcolor duration-200 rounded-full'>
                 <Icon className=' bg-blackgrey p-2 text-bluecolor rounded-full hover:bg-darkblueb ' icon="typcn:plus" width="40" height="40" />
                </Link>
                </div>
           
           
        </div>
<Suspense fallback={<ProjectsContainerSkeleton />}>

        <div className={` duration-200 ease-in-out  gap-2 grid sm:grid-cols-2 overflow-hidden  lg:grid-cols-3`}>
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

        </div>
        </Suspense>
    </div>
  )
}

export default ProjectsContainer