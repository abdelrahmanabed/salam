'use client'
import Image from "next/image";
import ProtectedRoute from "./components/ProtectedRout";
import React, { Suspense } from 'react';
import { ProjectsContainerSkeleton } from "./components/Loading";
const ProjectsContainer = React.lazy(() => import('./components/PrContainer/ProjectsContainer'));
const AdminCon = React.lazy(() => import('./components/AdContainer/AdminCon'));
export default function Home() {
  
  return (

<ProtectedRoute>
<Suspense fallback={<ProjectsContainerSkeleton />}>

    <ProjectsContainer/>
    </Suspense>
    <Suspense fallback={<ProjectsContainerSkeleton />}>

<AdminCon/>
</Suspense>

</ProtectedRoute>
  );
}
