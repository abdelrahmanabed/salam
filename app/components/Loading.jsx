'use client';
import React from 'react';
import { Icon } from '@iconify/react';

/**
 * Header Skeleton Component
 */
export const HeaderSkeleton = () => {
  return (
    <div className="flex h-14 p-3 justify-between animate-pulse">
      {/* Logo Skeleton */}
      <div className="flex items-end h-full">
        <div className="h-full w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="h-4 w-16 -ml-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Navbar Skeleton */}
      <div className="flex gap-2">
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-8 md:w-24 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

/**
 * Logo Skeleton Component
 */
export const LogoSkeleton = () => {
  return (
    <div className="flex items-end h-full animate-pulse">
      <div className="h-full w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      <div className="h-4 w-16 -ml-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>
  );
};

/**
 * Navbar Skeleton Component
 */
export const NavbarSkeleton = () => {
  return (
    <div className="flex gap-2 animate-pulse">
      {/* Theme Button Skeleton */}
      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      
      {/* Nav Buttons Skeleton */}
      {[1, 2, 3, 4].map((item) => (
        <div 
          key={item} 
          className="flex items-center gap-1 h-8 md:w-24 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"
        >
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="hidden md:block h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

/**
 * Nav Button Skeleton Component
 */
export const NavButtonSkeleton = () => {
  return (
    <div className="flex items-center gap-1 h-8 md:w-24 w-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full px-1">
      <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1"></div>
      <div className="hidden md:block h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
    </div>
  );
};

/**
 * Projects Container Skeleton Component
 */
export const ProjectsContainerSkeleton = () => {
  return (
    <div className="p-2 gap-2 flex flex-col w-full">
      <div className="p-2 dark:bg-darkbluec bg-border rounded-main items-center flex justify-between">
        <span className="text-subcolor dark:text-subtextcolor cursor-pointer w-full flex items-center gap-3">
          <Icon className="font-duration-200" icon="mingcute:down-fill" width="24" height="24" />
          Projects
        </span>
        
        <div>
          <div className="bg-hovercolor rounded-full">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="duration-200 ease-in-out gap-2 grid sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ProjectButtonSkeleton key={item} />
        ))}
      </div>
    </div>
  );
};

/**
 * Project Button Skeleton Component
 */
export const ProjectButtonSkeleton = () => {
  return (
    <div className="flex flex-col bg-boxcolor dark:bg-darkbox gap-2 p-2 relative border w-full rounded-main shadow-sm border-darkgrey dark:border-subcolor h-64 animate-pulse">
      {/* Header */}
      <div className="flex items-center bg-hovercolor dark:bg-blackgrey p-2 rounded-main gap-2">
        <div className="h-9 w-9 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="flex flex-col">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-1"></div>
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      </div>

      {/* Content lines */}
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-5 w-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      ))}

      {/* Footer */}
      <div className="absolute bottom-2 left-2">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
      </div>
      
      <div className="absolute right-2 bottom-2">
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-12 left-2 flex items-center gap-2">
        <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
      </div>
    </div>
  );
};

/**
 * Event Card Skeleton Component (for TBT, Drill, Audit, HSE, Training cards)
 */
export const EventCardSkeleton = () => {
  return (
    <li className="group dark:text-subtextcolor max-h-96 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative dark:bg-blackgrey bg-backgroundcolor border-transparent animate-pulse">
      <div className="p-4 pb-0">
        <div className="flex h-[95px] gap-3 items-start">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
            </div>
            
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
          </div>
        </div>
      </div>
      
      <div className="flex h-full bg-subcolor/50 mt-3 flex-wrap rounded gap-2 p-3 pb-3 dark:border-gray-800">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        ))}
      </div>
      
      <div className="bg-subcolor/50 flex h-full items-center justify-between gap-2 p-3 pt-3">
        <div className="flex items-center gap-1 rounded-full bg-gray-300 dark:bg-gray-600 p-1 pr-3 w-32">
          <div className="h-7 w-7 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-400 dark:bg-gray-500 rounded-md"></div>
        </div>
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
      </div>
      
      <div className="absolute top-[75px] right-4">
        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
    </li>
  );
};

/**
 * Abnormal Card Skeleton Component
 */
export const AbnormalCardSkeleton = () => {
  return (
    <li className="group dark:text-subtextcolor max-h-96 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative dark:bg-blackgrey bg-backgroundcolor border-transparent animate-pulse">
      <div className="p-4 pb-0">
        <div className="flex h-[95px] gap-3 items-start">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 bg-red-200 dark:bg-red-900 rounded-full"></div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="h-6 w-16 bg-green-200 dark:bg-green-900 rounded-full"></div>
              </div>
            </div>
            
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
          </div>
        </div>
      </div>
      
      <div className="flex h-full bg-subcolor/50 mt-3 flex-wrap rounded gap-2 p-3 pb-3 dark:border-gray-800">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-8 w-24 bg-red-200 dark:bg-red-900 rounded-md"></div>
        ))}
      </div>
      
      <div className="bg-subcolor/50 flex h-full items-center justify-between gap-2 p-3 pt-3">
        <div className="flex items-center gap-1 rounded-full bg-red-300 dark:bg-red-800 p-1 pr-3 w-32">
          <div className="h-7 w-7 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-400 dark:bg-gray-500 rounded-md"></div>
        </div>
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
      </div>
      
      <div className="absolute top-[75px] right-4">
        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
    </li>
  );
};

/**
 * Test component for EventCardSkeleton displaying multiple skeletons
 */
export const EventSkeletonTest = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Event Card Skeletons</h2>
      <ul className="space-y-4">
        {[1, 2, 3].map((index) => (
          <EventCardSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};

/**
 * Test component for AbnormalCardSkeleton displaying multiple skeletons
 */
export const AbnormalSkeletonTest = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Abnormal Card Skeletons</h2>
      <ul className="space-y-4">
        {[1, 2, 3].map((index) => (
          <AbnormalCardSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};

/**
 * Test component for ProjectsContainerSkeleton
 */
export const ProjectsSkeletonTest = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Projects Container Skeleton</h2>
      <ProjectsContainerSkeleton />
    </div>
  );
};

/**
 * Test component for NavbarSkeleton
 */
export const NavbarSkeletonTest = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Navbar Skeleton</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <NavbarSkeleton />
      </div>
    </div>
  );
};

/**
 * Test component for HeaderSkeleton
 */
export const HeaderSkeletonTest = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Header Skeleton</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <HeaderSkeleton />
      </div>
    </div>
  );
};

export const EventsStatsChartSkeleton = () => {
    return (
      <div className="h-52 w-full p-2 bg-boxcolor gap-1 flex flex-col rounded-main shadow animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          {/* Labels Skeleton */}
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"
              ></div>
            ))}
          </div>
  
          {/* Filters Skeleton */}
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"
              ></div>
            ))}
          </div>
        </div>
  
        {/* Chart Area Skeleton */}
        <div className="w-full relative h-full">
          <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
        </div>
      </div>
    );
  };


  export const EditPageSkeleton = () => {
    return (
      <div className="w-full p-4 h-full md:h-full overflow-y-auto dark:text-subtextcolor flex gap-3 justify-center rounded-main">
        <div className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center dark:bg-blackgrey bg-boxcolor animate-pulse">
          {/* Header Skeleton */}
          <div className="w-full flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
  
          {/* Date Field Skeleton */}
          <div className="w-full">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
  
          {/* Location Field Skeleton */}
          <div className="w-full">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
  
          {/* Type Selection Skeleton */}
          <div className="w-full">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
  
          {/* Topic and Attendees Skeleton */}
          <div className="w-full">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
  
          {/* Description Field Skeleton */}
          <div className="w-full">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
            <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
  
          {/* File Upload Section Skeleton */}
          <div className="w-full p-4 border-2 rounded-main border-darkbox">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
              ))}
            </div>
          </div>
  
          {/* Buttons Skeleton */}
          <div className="w-full flex flex-col gap-2">
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };

  export const LoginPageSkeleton = () => {
    return (
      <div className="p-4 w-full dark:text-subtextcolor gap-3 flex flex-col justify-center h-[500px] items-center animate-pulse">
        {/* Logo Skeleton */}
        <div className="text-maincolor text-[15px] font-extralight h-full flex flex-col justify-center items-center">
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mt-2"></div>
        </div>
  
        {/* Login Form Skeleton */}
        <div className="bg-hovercolor dark:bg-blackgrey p-4 flex gap-3 items-center flex-col w-full sm:w-96 justify-center rounded-main">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center w-full">
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
  
          {/* Form Fields Skeleton */}
          <div className="w-full max-w-96 flex flex-col gap-2 rounded-main p-4 items-center">
            {/* ID Field Skeleton */}
            <div className="w-full">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            </div>
  
            {/* Password Field Skeleton */}
            <div className="w-full">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            </div>
  
            {/* Submit Button Skeleton */}
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
        </div>
      </div>
    );
  };


/**
 * DayContent Skeleton Component
 */
export const DayContentSkeleton = () => {
  return (
    <div className="p-4 dark:text-subtextcolor min-h-screen animate-pulse">
      <div className="max-w-full mx-auto">
        {/* Header Section Skeleton */}
        <div className="bg-hovercolor dark:bg-blackgrey rounded-main shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-circle">
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </div>
                <div>
                  <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Stats Section Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-hovercolor dark:bg-darkbox p-4 rounded-main shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-circle">
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </div>
                <div>
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Events Section Skeleton */}
          <div className="flex-1">
            <div className="dark:bg-subcolor rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Section Skeleton */}
          <div className="md:w-1/2 lg:w-96">
            <div className="dark:bg-blackgrey rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="space-y-4 rounded-main p-6 bg-backgroundcolor">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const NoteDetailsPageSkeleton = () => {
  return (
    <div className="px-4 mb-4 animate-pulse">
      <div className="bg-hovercolor dark:bg-darkbox rounded-main overflow-hidden">
        {/* Header Skeleton */}
        <div className="bg-gray-200 dark:bg-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
          </div>

          {/* Target Date Skeleton */}
          <div className="mt-6 flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>

          {/* Images Skeleton */}
          <div className="mt-6">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative aspect-square bg-gray-200 dark:bg-gray-700 rounded-main"></div>
              ))}
            </div>
          </div>

          {/* Files Skeleton */}
          <div className="mt-6">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="grid gap-3">
              {[1, 2].map((item) => (
                <div key={item} className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
              ))}
            </div>
          </div>

          {/* Users Skeleton */}
          <div className="mt-6">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
                  <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditUserPageSkeleton = () => {
    return (
      <div className="lg:p-4 flex gap-3 justify-center dark:bg-darkbox lg:bg-maincolor dark:text-subtextcolor bg-darkbluec m-2 rounded-main animate-pulse">
        {/* Header Skeleton */}
        <div className="hidden justify-center items-center lg:flex w-full">
          <div className="h-12 w-48 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
  
        {/* Form Skeleton */}
        <div className="w-full md:min-w-[700px] shadow-sm shadow-darkbluec flex flex-col gap-4 rounded-main p-4 items-center dark:bg-blackgrey bg-boxcolor">
          {/* Images Skeleton */}
          <div className="flex flex-col md:flex-row gap-2 w-full items-center">
            <div className="h-64 w-64 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            <div className="h-64 w-64 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
  
          {/* Inputs Skeleton */}
          <div className="grid w-full md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            ))}
          </div>
  
          {/* Permissions Skeleton */}
          <div className="flex flex-col gap-4 p-2 w-full">
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="flex justify-center gap-4 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              ))}
            </div>
          </div>
  
          {/* Verified Checkbox Skeleton */}
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
  
          {/* File Input Skeleton */}
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
  
          {/* Submit Button Skeleton */}
          <div className="h-12 w-full md:w-96 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  };
/**
 * ProjectNavMobile Skeleton Component
 */
export const ProjectNavMobileSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 items-end w-full relative animate-pulse">
      {/* Menu Icon Skeleton */}
      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

      {/* Menu Content Skeleton */}
      <div className="w-full h-screen p-4 pt-20 shadow-lg top-0 right-0 dark:bg-darkbox bg-hovercolor justify-center flex fixed overflow-hidden duration-200 flex-col gap-2 items-center">
        {/* Close Icon Skeleton */}
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full absolute top-12 right-4"></div>

        {/* Links Skeleton */}
        <div className="gap-4 rounded-main grid text-subtextcolor w-full overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div
              key={item}
              className="p-2 w-full px-3 flex gap-2 rounded-main hover:bg-darkbluec dark:text-subtextcolor dark:bg-blackgrey items-center duration-200 text-xl text-subcolor bg-boxcolor font-bold hover:text-subtextcolor group"
            >
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const CoverSkeleton = () => {
    return (
      <div className="animate-pulse">
        {/* Header Section Skeleton */}
        <div className="relative bg-verylightblue dark:bg-darkbox p-2 py-4 rounded-t-main flex items-center gap-2">
          {/* Settings Icon Skeleton */}
          <div className="top-4 right-4 absolute h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
  
          {/* Avatar Skeleton */}
          <div className="rounded-circle relative flex justify-center items-start overflow-hidden w-32 h-32">
            <div className="w-full min-h-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
  
          {/* User Info Skeleton */}
          <div className="flex-col gap-2 text-darkbluec dark:text-subtextcolor flex">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
  
        {/* Permissions Section Skeleton */}
        <div className="w-full items-center flex gap-2 dark:bg-blackgrey bg-darkbluec text-boxcolor py-4 p-2">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div key={item} className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          ))}
        </div>
  
        {/* Stats Section Skeleton */}
        <div className="bg-darkbluec mb-4 dark:bg-blackgrey justify-evenly flex gap-4 rounded-b-main p-4 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  };

  export const UserCardSkeleton = () => {
    return (
      <div className="bg-[#ffffff] border border-[#dddddd] rounded-lg shadow-sm overflow-hidden animate-pulse">
        <div className="flex items-stretch w-full">
          {/* Status indicator */}
          <div className="w-2 bg-gray-200 dark:bg-gray-700"></div>
  
          {/* Avatar section */}
          <div className="flex-shrink-0 p-4 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
  
          {/* User information */}
          <div className="flex-1 p-4 flex flex-col justify-center">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
  
          {/* Action buttons */}
          <div className="flex-shrink-0 flex items-center p-4 border-l border-[#dddddd]">
            <div className="flex flex-col gap-2">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
  
          {/* Go to details arrow */}
          <div className="flex items-center pr-6">
            <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };
  

export const ProjectNavSkeleton = () => {
    return (
      <div className="gap-2 items-center flex animate-pulse">
        {/* Buttons Skeleton */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"
          ></div>
        ))}
  
        {/* Icons Skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  };
  export const FiltersSkeleton = () => {
    return (
      <div className="flex flex-col md:flex-row gap-2 animate-pulse">
        {/* Search Input Skeleton */}
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
  
        {/* Project Filter Skeleton */}
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
  
        {/* Role Filter Skeleton */}
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
      </div>
    );
  };
/**
 * Infocontainer Skeleton Component
 */
export const InfocontainerSkeleton = () => {
  return (
    <div className="flex-col mt-4 flex gap-2 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* InfoBoxes Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 md:px-0">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="flex-col flex justify-between bg-gray-200 dark:bg-gray-700 rounded-main w-full font-semibold md:h-24 p-3"
          >
            <div className="flex gap-2 items-center">
              <div className="h-8 w-8 min-w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full self-end"></div>
          </div>
        ))}
      </div>

      {/* Full Day Link Skeleton */}
      <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </div>
  );
};
/**
 * AbnormalEvents Skeleton Component
 */
export const AbnormalEventsSkeleton = () => {
  return (
    <div className="w-full dark:text-subtextcolor animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Filters Skeleton */}
      <div className="mb-4 space-y-2">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
        </div>
      </div>

      {/* Events List Skeleton */}
      <div className="relative">
        <ul className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-52 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          ))}
        </ul>

        {/* Show More Button Skeleton */}
        <div className="w-full mt-2 px-4 py-2 flex items-center justify-center">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export const StatsSkeleton = () => {
    return (
      <div className="group gap-2 p-2 dark:bg-blackgrey bg-boxcolor rounded-main duration-300 w-full justify-between flex animate-pulse">
        {/* Icon Section Skeleton */}
        <div className="flex items-center flex-col">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="flex flex-col gap-2 font-bold text-sm sm:text-base py-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            ))}
          </div>
        </div>
  
        {/* Abnormal Events Section Skeleton */}
        <div className="flex items-center flex-col w-full">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
          <div className="flex flex-col text-sm font-bold w-full gap-2 rounded-main py-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            ))}
          </div>
        </div>
  
        {/* Open Events Section Skeleton */}
        <div className="flex items-center flex-col w-full">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
          <div className="flex flex-col text-sm font-bold w-full gap-2 rounded-main py-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            ))}
          </div>
        </div>
  
        {/* Closed Events Section Skeleton */}
        <div className="flex items-center flex-col w-full">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
          <div className="flex flex-col text-sm font-bold w-full gap-2 rounded-main py-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
export const ChartsSkeleton = () => {
    return (
      <div className="h-52 w-full p-2 bg-boxcolor dark:bg-blackgrey gap-1 flex flex-col rounded-main animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            ))}
          </div>
        </div>
  
        {/* Chart Area Skeleton */}
        <div className="w-full relative h-full">
          <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
        </div>
      </div>
    );
  };

export const CardSkeleton = () => {
  return (
    <li className="group dark:text-subtextcolor max-h-96 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative dark:bg-blackgrey bg-backgroundcolor animate-pulse">
      {/* Header Section */}
      <div className="p-4 pb-0">
        <div className="flex h-[95px] gap-3 items-start">
          {/* Icon Skeleton */}
          <div className="flex-shrink-0">
            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>

          {/* Content Skeleton */}
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>

            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
          </div>
        </div>
      </div>

      {/* Files Section Skeleton */}
      <div className="flex h-full bg-subcolor/50 mt-3 flex-wrap rounded gap-2 p-3 pb-3 dark:border-gray-800">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        ))}
      </div>

      {/* Footer Section Skeleton */}
      <div className="bg-subcolor/50 flex h-full items-center justify-between gap-2 p-3 pt-3">
        <div className="flex items-center gap-1 rounded-full bg-gray-200 dark:bg-gray-700 p-1 pr-3 w-32">
          <div className="h-7 w-7 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Settings Icon Skeleton */}
      <div className="absolute top-[75px] right-4">
        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </li>
  );
};
export const ProjectCalendarSkeleton = () => {
    return (
      <div className="p-4 dark:text-subtextcolor animate-pulse">
        {/* Navigation Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
  
        {/* Calendar Grid Skeleton */}
        <div className="grid grid-cols-7 gap-0.5 md:gap-1">
          {/* Day Headers Skeleton */}
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div key={item} className="text-center font-bold p-2">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto"></div>
            </div>
          ))}
  
          {/* Calendar Days Skeleton */}
          {Array.from({ length: 42 }).map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-main min-h-[100px] bg-gray-200 dark:bg-gray-700"
            ></div>
          ))}
        </div>
      </div>
    );
  };
export const AuditFormSkeleton = () => {
  return (
    <div className="w-full scrollbar-hide text-nowrap h-full md:h-full overflow-y-auto flex gap-3 justify-center rounded-main animate-pulse">
      <div className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center bg-boxcolor dark:bg-blackgrey">
        {/* Header Skeleton */}
        <div className="w-full flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* Success/Error Message Skeleton */}
        <div className="w-full p-4 mb-4 bg-gray-200 dark:bg-gray-700 rounded-main"></div>

        {/* Type Selection Skeleton */}
        <div className="w-full">
          <div className="flex flex-col gap-1 p-2">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-main"></div>
          </div>
        </div>

        {/* File Upload Section Skeleton */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {[1, 2].map((item) => (
            <div key={item} className="relative p-1 rounded-main flex">
              <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Submit Button Skeleton */}
        <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

export const AbStatsSkeleton = () => {
    return (
      <div className="group p-4 dark:bg-blackgrey bg-boxcolor rounded-main duration-300 w-full animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
  
        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="dark:text-subtextcolor border-b border-red-200">
                <th className="text-left p-2">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </th>
                <th className="p-2 text-center">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </th>
                <th className="p-2 text-center">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </th>
                <th className="p-2 text-center">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </th>
                <th className="p-2 text-center">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7].map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-lightred dark:text-subtextcolor bg-opacity-10' : ''}>
                  <td className="p-2">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </td>
                  <td className="p-2 text-center">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </td>
                  <td className="p-2 text-center">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </td>
                  <td className="p-2 text-center">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </td>
                  <td className="p-2 text-center">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </td>
                </tr>
              ))}
              <tr className="text-subtextcolor font-bold">
                <td className="p-2 bg-darkred rounded-l-main">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </td>
                <td className="p-2 text-center bg-darkred">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </td>
                <td className="p-2 text-center bg-darkred">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </td>
                <td className="p-2 text-center bg-darkred">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </td>
                <td className="p-2 text-center bg-darkred rounded-r-main">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
export const NestedDoughnutChartSkeleton = () => {
    return (
      <div className="bg-boxcolor dark:bg-blackgrey rounded-main w-full animate-pulse">
        <div className="h-[400px] w-full flex items-center justify-center">
          <div className="h-64 w-64 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  };
/**
 * Combined test page for all skeletons
 */
export const AllSkeletonsTest = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Skeleton Components Test Page</h1>
      
      <section className="border dark:border-gray-700 rounded-lg p-4">
        <HeaderSkeletonTest />
      </section>
      
      <section className="border dark:border-gray-700 rounded-lg p-4">
        <NavbarSkeletonTest />
      </section>
      
      <section className="border dark:border-gray-700 rounded-lg p-4">
        <ProjectsSkeletonTest />
      </section>
      
      <section className="border dark:border-gray-700 rounded-lg p-4">
        <EventSkeletonTest />
      </section>
      
      <section className="border dark:border-gray-700 rounded-lg p-4">
        <AbnormalSkeletonTest />
      </section>
    </div>
  );
};



/**
 * Default export as the combined test component
 */
export default AllSkeletonsTest;