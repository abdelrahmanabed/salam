import { lazy, Suspense } from "react";
import { DayContentSkeleton } from "@/app/components/Loading";
const DayContent = lazy(() => import('./DayContent'));

const Page = () => {
  return (
    <Suspense fallback={<DayContentSkeleton />}>
      <DayContent />
    </Suspense>
  );
};

export default Page;