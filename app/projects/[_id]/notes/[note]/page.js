import { NoteDetailsPageSkeleton } from '@/app/components/Loading';
import React, { Suspense } from 'react'
const NoteContent = React.lazy(() => import('./NoteContent'));

const page = () => {

  return (
<Suspense fallback={<NoteDetailsPageSkeleton/>}>
<NoteContent/>
</Suspense>
  )
}

export default page