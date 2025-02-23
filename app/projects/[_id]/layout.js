// layout.js
'use client'
import { useContext, useState, Suspense, lazy } from "react";
import { ProjectsContext } from "../context/ProjectsContext";
import { ProjectNavMobileSkeleton, ProjectNavSkeleton } from "@/app/components/Loading";

// Lazy load components
const ProjectNav = lazy(() => import("../components/ProjectNav"));
const ProjectNavMobile = lazy(() => import("../components/ProjectNavMobile"));
const AddNewReport = lazy(() => import("../components/AddNewReport").then(mod => ({ default: mod.AddNewReport })));
const ReportsMenu = lazy(() => import("../components/ReportsMenu"));
const IconComponent = lazy(() => import("@iconify/react").then(mod => ({ default: mod.Icon })));

export default function PrLayout({ children }) {
  const { project } = useContext(ProjectsContext);
  const [open, setOpen] = useState(false);

 if(!project) return;
  return (
    <>
      <div className="flex justify-between p-4 bg-backgroundcolor dark:bg-blackgrey mx-4 mb-4 rounded-main">
        <Suspense fallback={<div  />}>
          <AddNewReport onClick={() => setOpen(true)} />
        </Suspense>

        <Suspense fallback={<div className="" />}>
          <ReportsMenu
            className={
              open
                ? "w-screen h-screen top-0 p-4 opacity-100"
                : "opacity-0 w-0 top-full h-0 p-0"
            }
          >
            <button
              onClick={() => setOpen(false)}
              className="lg:top-5 md:left-9 md:right-auto bg-boxcolor p-1 absolute top-4 hover:bg-redcolor duration-200 right-2 rounded-circle"
            >
              <Suspense fallback={<div  />}>
                <IconComponent
                  icon="iconamoon:close-bold"
                  className="text-4xl lg:text-6xl md:text-5xl"
                />
              </Suspense>
            </button>
          </ReportsMenu>
        </Suspense>
<Suspense fallback={<div/>}>
        <div className="flex flex-col">
          <span className="font-black dark:text-subtextcolor text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl">
            {project.name}
          </span>
          <span className="text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl dark:text-darkgrey text-blackgrey">
            {project.client}
          </span>
        </div></Suspense>

        <Suspense fallback={<ProjectNavSkeleton/>}>
          <ProjectNav className="lg:flex hidden" href={project._id} />
        </Suspense>

        <Suspense fallback={<ProjectNavMobileSkeleton/>}>
          <ProjectNavMobile className="z-20 flex lg:hidden" href={project._id} />
        </Suspense>
      </div>

   
        {children}
    </>
  );
}
