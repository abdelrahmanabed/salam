'use client'
import { useContext, useState } from "react";
import { ProjectsContext } from "../context/ProjectsContext";
import ProjectNav from "../components/ProjectNav";
import ProjectNavMobile from "../components/ProjectNavMobile";
import { AddNewReport } from "../components/AddNewReport";
import ReportsMenu from "../components/ReportsMenu";
import { Icon } from "@iconify/react";



export default function PrLayout({ children }) {
    const { project } = useContext(ProjectsContext);
    const[open,setOpen] = useState(false)

    if (!project) {
        return <div>Loading...</div>;
      }
    
  return (
      <> 
 <div className="flex justify-between p-4 bg-backgroundcolor dark:bg-blackgrey mx-4 mb-4 rounded-main">
            <AddNewReport onClick={() => setOpen(true)} />
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
                <Icon
                  icon="iconamoon:close-bold"
                  className="text-4xl lg:text-6xl md:text-5xl"
                />
              </button>
            </ReportsMenu>
            <div className="flex flex-col">
             
              <span className="font-black dark:text-subtextcolor text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl">
                {project.name}
              </span>
              <span className="text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl dark:text-darkgrey text-blackgrey">
                {project.client}
              </span>
            </div>
            <ProjectNav className="lg:flex hidden" href={project._id} />
            <ProjectNavMobile className="z-20 flex lg:hidden" href={project._id} />
          </div>
          {children}
       
      </>
  );
}
