import { AbnormalEventsSkeleton } from '@/app/components/Loading';
import React, { lazy, Suspense } from 'react'
const Events = lazy(() => import('./Events'));

const page = () => {
  return (
<Suspense fallback={<AbnormalEventsSkeleton/>}>
  <Events/>
</Suspense>  )
}

export default page