'use client'

import React, { lazy, Suspense } from 'react';
// Lazy load the Activities component
const Activities = lazy(() => import('./components/Activity'));
const Cover = lazy(() => import('./components/Cover'));

const Page = () => {

  return (
    <div className='pt-0 dark:text-subtextcolor p-4 gap-0 flex flex-col'>
<Suspense fallback={<div className=' h-96 w-full animate-pulse bg-hovercolor rounded-main dark:bg-darkbox'></div>}>
          <Cover />
        </Suspense>
      <div>
        <Suspense fallback={<div className=' h-96 w-full animate-pulse bg-hovercolor rounded-main dark:bg-darkbox'></div>}>
          <Activities />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;