'use client'

import React, { useState, useEffect, useContext } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { ProjectsContext } from '../../context/ProjectsContext'
import ManhoursCard from '../../components/cards/ManhoursCard'

const ManhoursPage = () => {
  const { project } = useContext(ProjectsContext);
  const [manhoursList, setManhoursList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to extract all manhours from the project calendar structure
  useEffect(() => {
    if (project) {
      // Extract manhours from the nested calendar structure
      const extractedManhours = [];
      
      if (project.calendar) {
        project.calendar.forEach(yearItem => {
          yearItem.months?.forEach(monthItem => {
            monthItem.weeks?.forEach(weekItem => {
              weekItem.days?.forEach(dayItem => {
                if (dayItem.manhours) {
                  extractedManhours.push(dayItem.manhours);
                }
              });
            });
          });
        });
      }
      const sortedManhours = extractedManhours.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      setManhoursList(sortedManhours);
      setIsLoading(false);
    }
  }, [project]);

  // Calculate totals
  const totalManhours = manhoursList.reduce((sum, item) => sum + (item.totalManhours || 0), 0);
  const totalSafeManhours = manhoursList.reduce((sum, item) => sum + (item.totalSafeManhours || 0), 0);
  const totalLTIs = manhoursList.filter(item => item.LTI).length;

  // Loading skeleton component
  const ManhoursCardSkeleton = () => (
    <div className="border-l-4 dark:text-subtextcolor border-hovercolor bg max-h-96 rounded-main overflow-hidden gap-0 flex flex-col rounded-xl relative bg-hovercolor/50 dark:bg-darkbox/50 animate-pulse">
      <div className='p-4 h-[200px]'>
        <div className='h-6 w-32 bg-hovercolor dark:bg-blackgrey rounded mb-3'></div>
        <div className='h-4 w-24 bg-hovercolor dark:bg-blackgrey rounded mb-4'></div>
        <div className='flex gap-2'>
          <div className='h-5 w-16 bg-hovercolor dark:bg-blackgrey rounded'></div>
          <div className='h-5 w-16 bg-hovercolor dark:bg-blackgrey rounded'></div>
        </div>
      </div>
    </div>
  );

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(index => (
            <ManhoursCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className=" mx-auto p-4">
      {/* Summary statistics */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-hovercolor dark:bg-darkbox p-4 rounded-main shadow-sm">
          <h3 className="dark:text-subtextcolor text-sm">Total Manhours</h3>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:timer" className="text-bluecolor text-2xl" />
            <span className="text-2xl font-bold dark:text-subtextcolor">{totalManhours.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="bg-hovercolor dark:bg-darkbox p-4 rounded-main shadow-sm">
          <h3 className="dark:text-subtextcolor text-sm">Safe Manhours</h3>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:shield-check" className="text-greencolor text-2xl" />
            <span className="text-2xl font-bold dark:text-subtextcolor">{totalSafeManhours.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="bg-hovercolor dark:bg-darkbox p-4 rounded-main shadow-sm">
          <h3 className="dark:text-subtextcolor text-sm">Lost Time Injuries</h3>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:alert-circle" className="text-redcolor text-2xl" />
            <span className="text-2xl font-bold dark:text-subtextcolor">{totalLTIs}</span>
          </div>
        </div>
      </div>

     
      
      {/* Manhours cards */}
      {manhoursList.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {manhoursList.map((item, index) => (
            <ManhoursCard key={item._id || index} manhours={item} index={index} edit={true} />
          ))}
        </div>
      ) : (
        <div className="bg-hovercolor dark:bg-darkbox p-6 rounded-main text-center">
          <Icon icon="mdi:timer-off" className="text-5xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold dark:text-hovercolor mb-2">No Manhours Records</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">No manhours have been recorded for this project yet.</p>
          <Link 
            href="/add/manhours" 
            className="inline-flex items-center gap-2 bg-bluecolor hover:bg-blue-600 text-white py-2 px-4 rounded-main transition-all duration-300"
          >
            <Icon icon="mdi:plus" width="20" height="20" />
            Add First Record
          </Link>
        </div>
      )}
    </div>
  )
}

export default ManhoursPage