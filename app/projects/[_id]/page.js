'use client';

import { useContext, useState } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import {  TodayContext } from '../context/TodayContext';

import ProjectNav from '../components/ProjectNav';
import ProjectNavMobile from '../components/ProjectNavMobile';
import Infocontainer from '../components/Infocontainer';
import { AddNewReport } from '../components/AddNewReport';
import ReportsMenu from '../components/ReportsMenu';
import { Icon } from '@iconify/react';
import OpenAbnormalEvents from '../components/OpenAbnormalEvents';
import OpenObservations from '../components/OpenObservations';
import ManHoursStats from '../components/stats/ManHoursStats';
import AbnormalStats from '../components/stats/AbnormalStats';
import TBTS from '../components/stats/TBTS';
import ObservationStats from '../components/stats/ObservationsStats';
import ManhoursStatsChart from '../components/stats/ManHourV';
import AbnormalEventsChart from '../components/stats/AbnormalEventsChart';
import ObsChart from '../components/stats/ObsChart';
import TBTChart from '../components/stats/TBTChart';
import Event from '../../components/Event';
import Link from 'next/link';
import LatestNotes from '../../components/Note';
import NanoNote from '../components/cards/NanoNote';
import PinnedNotes from '@/app/components/PinnedNotes';

const Page = () => {
  const[active,setActive] = useState(false)

  const { project } = useContext(ProjectsContext);
  const  todayData  = useContext(TodayContext);

  const ProgressBar = ({ startDate, endDate }) => {
    if (!startDate || !endDate) return null;
  
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
  
    // حساب النسبة
    const totalDuration = end - start;
    const elapsed = now - start;
    const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100); // النسبة بين 0 و 100
  
    return (
<div className=' relative gap-2 flex flex-col'>
      <div
          className="absolute z-10 transform md:-ml-1 -top-0.5 md:-top-1  "
          style={{ left: `${progress}%` }}
        >
          <div className="w-[12px] h-[12px] md:w-4 md:h-4 bg-darkblueb  rounded-full mb-[0.5px]  shadow-xl"></div>
        </div>
      <div className="w-full h-2 bg-lightblue dark:bg-blackgrey rounded-full relative overflow-hidden">
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 pr-[10px] h-4 bg-maincolor  transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
        
      
      </div>
      <div className=' dark:text-subtextcolor justify-between flex text-xs'>
      <span>{new Date(startDate).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}</span>
      <span>{new Date(endDate).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}</span>

      </div>
      </div>
    );
  };
console.log('td', todayData);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className='p-4  w-full pt-0'>
    <ProgressBar startDate={project.startDate} endDate={project.endDate} />
<PinnedNotes/>
            <Infocontainer dayhref={`/projects/${project._id}/today`|| ''}/>
<div className=' flex  gap-4 mt-4 mb-2 w-full overflow-hidden md:flex-row flex-col'>

  <OpenAbnormalEvents/>
            <OpenObservations/>
</div>


<div className=' flex  gap-4 mt-2 mb-2 w-full overflow-hidden md:flex-row flex-col'>
  
  
<div className='   md:w-1/2'>
  <div className='mb-2 text-2xl font-bold dark:text-subtextcolor flex items-center justify-between  '>Latest Events <Link className='  bg-maincolor/40 hover:bg-darkbluec text-bluecolor dark:text-maincolor duration-200 rounded-full right-4 top-3 ' href={`/projects/${project._id}/events`}>
    <Icon icon="iconamoon:arrow-right-2-bold" width="50" height="50" />
    </Link>
  </div>
  <div className='  flex flex-col overflow-y-auto overflow-x-hidden w-full  border-2 border-border  bg-hovercolor  dark:border-blackgrey dark:bg-subcolor rounded-main h-72 scrollbar-hide '>
    <Event/>
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

<LatestNotes/>
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
         <ManHoursStats/>   
         <AbnormalStats/>
         <ObservationStats/>
         <TBTS/>
         </div>
         <Icon icon="mingcute:down-fill" className={`${active? 'rotate-180':""} duration-200 m-2 ml-4 hover:text-maincolor cursor-pointer`} width="24" height="24" onClick={()=> setActive(!active)} />
    </div>
    <div className=' w-full flex-col flex gap-2 overflow-hidden '>
    <span className=' font-light text-xl mb-[1.5px] '>Stats</span>
    
    <div className={`${ active?" max-h-[1000px]":"  md:max-h-[215px]"} duration-300 w-full md:gap-4 flex flex-col  gap-[9px]  overflow-hidden `}>
    <ManhoursStatsChart project={project} />
    <AbnormalEventsChart />
    <ObsChart/>
    <TBTChart/>

    </div>
</div>
    </div>
  </>);
};

export default Page;
