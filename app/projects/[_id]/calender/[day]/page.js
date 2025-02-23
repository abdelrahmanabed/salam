import { DayContentSkeleton } from '@/app/components/Loading';
import { lazy, Suspense } from 'react';
const DayContent = lazy(() => import('./DayContent'));


const Page = () => {
  return (
    <Suspense fallback={<DayContentSkeleton />}>
      <DayContent />
    </Suspense>
  );
};

export default Page;