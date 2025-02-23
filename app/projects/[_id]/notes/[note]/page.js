import { NoteDetailsPageSkeleton } from '@/app/components/Loading';
import React, { Suspense } from 'react'
const NoteDetailsPage = React.lazy(() => import('./NoteContent'));

const page = () => {

  return (
<Suspense fallback={<NoteDetailsPageSkeleton/>}>
<NoteDetailsPage/>
</Suspense>
  )
}

export default page