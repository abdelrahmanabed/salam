'use client';

import { Suspense, useContext, useState, lazy } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import {  TodayContext } from '../context/TodayContext';


const Infocontainer = lazy(() => import('../components/Infocontainer'));
import { Icon } from '@iconify/react';
const OpenAbnormalEvents = lazy(() => import('../components/OpenAbnormalEvents'));
const OpenObservations = lazy(() => import('../components/OpenObservations'));
const ManHoursStats = lazy(() => import('../components/stats/ManHoursStats'));
const AbnormalStats = lazy(() => import('../components/stats/AbnormalStats'));
const TBTS = lazy(() => import('../components/stats/TBTS'));

const ObservationStats = lazy(() => import('../components/stats/ObservationsStats'));
const ManhoursStatsChart = lazy(() => import('../components/stats/ManHourV'));
const AbnormalEventsChart = lazy(() => import('../components/stats/AbnormalEventsChart'));
const ObsChart = lazy(() => import('../components/stats/ObsChart'));
const TBTChart = lazy(() => import('../components/stats/TBTChart'));
const Event = lazy(() => import('../../components/Event'));
import Link from 'next/link';
import { AbnormalCardSkeleton, AbStatsSkeleton, ChartsSkeleton, EventCardSkeleton, InfocontainerSkeleton, PinnedNotesSkeleton, StatsSkeleton } from '@/app/components/Loading';
const LatestNotes = lazy(() => import('../../components/Note'));
const PinnedNotes = lazy(() => import('@/app/components/PinnedNotes'));
const ProgressBar = lazy(() => import('../components/ProgressBar')); // Assuming ProgressBar is in a separate file

const Page = () => {
  const[active,setActive] = useState(false)

  const { project } = useContext(ProjectsContext);
  const  todayData  = useContext(TodayContext);


console.log('td', todayData);

 

  return (
    <>
    <div className='p-4  w-full pt-0'>
    <Suspense fallback={<div className=' h-4 rounded-full  bg-hovercolor dark:bg-blackgrey animate-bounce'></div>}>
          <ProgressBar startDate={project.startDate} endDate={project.endDate} />
        </Suspense>
    <Suspense fallback={<PinnedNotesSkeleton/>} >
           <PinnedNotes/>
     </Suspense>
     <Suspense fallback={<InfocontainerSkeleton/>}>
      <Infocontainer dayhref={`/projects/${project._id}/today`|| ''}/>

     </Suspense>

<div className=' flex  gap-4 mt-4 mb-2 w-full overflow-hidden md:flex-row flex-col'>
<Suspense  fallback={<AbnormalCardSkeleton/>}>
  <OpenAbnormalEvents/>
  </Suspense>
  <Suspense fallback={<EventCardSkeleton/>}>
  <OpenObservations/>
  </Suspense>
           
</div>


<div className=' flex  gap-4 mt-2 mb-2 w-full overflow-hidden md:flex-row flex-col'>
  
  
<div className='   md:w-1/2'>
  <div className='mb-2 text-2xl font-bold dark:text-subtextcolor flex items-center justify-between  '>Latest Events <Link className='  bg-maincolor/40 hover:bg-darkbluec text-bluecolor dark:text-maincolor duration-200 rounded-full right-4 top-3 ' href={`/projects/${project._id}/events`}>
    <Icon icon="iconamoon:arrow-right-2-bold" width="50" height="50" />
    </Link>
  </div>
  <div className='  flex flex-col overflow-y-auto overflow-x-hidden w-full  border-2 border-border  bg-hovercolor  dark:border-blackgrey dark:bg-subcolor rounded-main h-72 scrollbar-hide '>
   <Suspense fallback={<EventCardSkeleton/>}>
   <Event/>

   </Suspense>
     <div className=' w-full flex px-4'> <Link className='  w-full hover:bg-maincolor  mb-4 p-2 flex duration-200 text-subtextcolor dark:bg-darkbluea bg-bluecolor   rounded-main dark:hover:bg-bluecolor justify-center text-center right-4 top-3 ' href={`/projects/${project._id}/events`}>
      <Icon icon="iconamoon:arrow-right-2-bold" width="40" height="40" />
      </Link>
    </div>  
  </div>
</div>
  
  <div className='  md:w-1/2'>
  <div className='mb-2 text-2xl font-bold dark:text-subtextcolor flex items-center justify-between  '>Latest Notes <Link className='  bg-maincolor/40 hover:bg-darkbluec text-bluecolor dark:text-maincolor duration-200 rounded-full right-4 top-3 ' href={`/projects/${project._id}/notes`}>
  <Icon icon="iconamoon:arrow-right-2-bold" width="50" height="50" />
  </Link></div>
  <div className=' overflow-x-hidden  flex flex-col overflow-y-auto w-full  border-2 border-border  bg-hovercolor  dark:border-blackgrey dark:bg-subcolor rounded-main h-72 scrollbar-hide '>
<Suspense fallback={<EventCardSkeleton/>}>
<LatestNotes/></Suspense>
<div className=' w-full flex px-4'> <Link className='  w-full hover:bg-maincolor  mb-4 p-2 flex duration-200 text-subtextcolor dark:bg-darkbluea bg-bluecolor   rounded-main dark:hover:bg-bluecolor justify-center text-center right-4 top-3 ' href={`/projects/${project._id}/notes`}>
  <Icon icon="iconamoon:arrow-right-2-bold" width="40" height="40" />
  </Link></div>

  </div></div>
  </div>
</div>

<div></div>


<div className=' bg-backgroundcolor dark:bg-darkbox dark:text-subtextcolor  rounded-t-[25px]   gap-4  p-4 w-full md:flex-row flex-col flex'>

<div className=' w-full md:w-fit flex-col flex gap-2 '>
<span className=' font-light text-xl '>Records</span>

<div className={`${ active?" max-h-[1000px]":" max-h-[195px] sm:max-h-[215px]"} duration-300  rounded-main  flex gap-2 md:gap-4   overflow-hidden w-full items-center md:w-fit  flex-col `}> 
        <Suspense fallback={<AbStatsSkeleton/>}>
        <ManHoursStats/> 
        </Suspense>
        <Suspense fallback={<AbStatsSkeleton/>}>

         <AbnormalStats/></Suspense>
         <Suspense fallback={<AbStatsSkeleton/>}>

         <ObservationStats/></Suspense>
         <Suspense fallback={<AbStatsSkeleton/>}>

         <TBTS/></Suspense>
         </div>
         <Icon icon="mingcute:down-fill" className={`${active? 'rotate-180':""} duration-200 m-2 ml-4 hover:text-maincolor cursor-pointer`} width="24" height="24" onClick={()=> setActive(!active)} />
    </div>
    <div className=' w-full flex-col flex gap-2 overflow-hidden '>
    <span className=' font-light text-xl mb-[1.5px] '>Stats</span>
    
    <div className={`${ active?" max-h-[1000px]":"  md:max-h-[215px]"} duration-300 w-full md:gap-4 flex flex-col  gap-[9px]  overflow-hidden `}>
    <Suspense fallback={<ChartsSkeleton/>}>

    <ManhoursStatsChart project={project} /></Suspense>
    <Suspense fallback={<ChartsSkeleton/>}>

    <AbnormalEventsChart /></Suspense>
    <Suspense fallback={<ChartsSkeleton/>}>

    <ObsChart/></Suspense>
    <Suspense fallback={<ChartsSkeleton/>}>
    <TBTChart/></Suspense>

    </div>
</div>
    </div>
  </>);
};

export default Page;
