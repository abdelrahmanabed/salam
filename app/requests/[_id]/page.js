
import React, { lazy, Suspense } from 'react'
import { EditPageSkeleton } from '@/app/components/Loading';
const EditForm = lazy(() => import('./EditForm'));

const page = () => {
  return (
    <Suspense fallback={<EditPageSkeleton/>}>

<EditForm />
    </Suspense>
  
  )
}

export default page