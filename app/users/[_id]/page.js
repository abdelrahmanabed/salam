'use client'

import { AbnormalEventsSkeleton, CoverSkeleton } from '@/app/components/Loading';
import React, { lazy, Suspense } from 'react';
// Lazy load the Activities component
const Activities = lazy(() => import('./components/Activity'));
const Cover = lazy(() => import('./components/Cover'));

const Page = () => {

  return (
    <div className='pt-0 dark:text-subtextcolor p-4 gap-0 flex flex-col'>
<Suspense fallback={<CoverSkeleton/>}>
          <Cover />
        </Suspense>
      <div>
        <Suspense fallback={<AbnormalEventsSkeleton/>}>
          <Activities />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;