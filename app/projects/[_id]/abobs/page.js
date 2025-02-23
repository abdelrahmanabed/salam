'use client';


import { Suspense, lazy, useState } from 'react';

import { Icon } from '@iconify/react';
import { AbnormalEventsSkeleton } from '@/app/components/Loading';


const Observations = lazy(() => import('../../components/Observations'));
const AbnormalEvents = lazy(() => import('../../components/AbnormalEvents'));
const AbStats = lazy(() => import('./components/AbStats'));
const ObStats = lazy(() => import('./components/ObStats'));
const AbnormalEventsChart = lazy(() => import('../../components/stats/AbnormalEventsChart'));
const NestedDoughnutChart = lazy(() => import('./components/AbChart'));
const ObsChart = lazy(() => import('../../components/stats/ObsChart'));
const SafetyObservationChart = lazy(() => import('./components/ObChart'));



const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-24 bg-gray-200 dark:bg-darkbox rounded-main"></div>
    <div className="h-24 bg-gray-200 dark:bg-darkbox rounded-main"></div>
  </div>
);

const Page = () => {
  const[active,setActive] = useState(false)

  


  return (
    <>
    <div className='p-4'>
      
   
<div className=' flex  gap-4 w-full overflow-hidden md:flex-row flex-col'>

<Suspense fallback={<AbnormalEventsSkeleton />}>
            <AbnormalEvents /> </Suspense>
            <Suspense fallback={<AbnormalEventsSkeleton />}>

            <Observations />            </Suspense>

</div>
</div>

<div className=' bg-backgroundcolor dark:bg-darkbox dark:text-subtextcolor  rounded-t-[25px]   gap-4  p-4 w-full md:flex-row flex-col flex'>
<div className=' w-full flex-col flex gap-2 overflow-hidden '>
<span className=' font-light text-xl '>Records</span>

<Suspense fallback={<LoadingSkeleton />}>
            <div className={`duration-300 rounded-main flex gap-2 md:gap-4 overflow-hidden w-full items-center flex-col`}>
              <AbStats />
              <div className='gap-4 flex flex-col w-full overflow-hidden'>
                <AbnormalEventsChart />
                <NestedDoughnutChart />
              </div>
            </div>
          </Suspense>
         <Icon icon="mingcute:down-fill" className={`${active? 'rotate-180':""} duration-200 m-2 ml-4 hover:text-maincolor cursor-pointer`} width="24" height="24" onClick={()=> setActive(!active)} />
    </div>
    <div className=' w-full flex-col flex gap-2 overflow-hidden '>
    <span className=' font-light text-xl mb-[1.5px] '>Stats</span>
    
    <Suspense fallback={<LoadingSkeleton />}>
            <div className={`duration-300 w-full md:gap-4 flex flex-col gap-[9px] overflow-hidden`}>
              <ObStats />
              <div className='gap-4 flex flex-col w-full overflow-hidden'>
                <ObsChart />
                <SafetyObservationChart />
              </div>
            </div>
          </Suspense>
</div>
    </div>
  </>);
};

export default Page;
