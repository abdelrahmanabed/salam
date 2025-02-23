'use client'
import React, { lazy, Suspense, useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import { ProjectsContext } from '../../context/ProjectsContext';
import { AbnormalCardSkeleton } from '@/app/components/Loading';
const TBTCard = lazy(() => import('../../components/cards/TBTCard'));
const DrillCard = lazy(() => import('../../components/cards/DrillCard'));
const AuditCard = lazy(() => import('../../components/cards/AuditCard'));
const HSECard = lazy(() => import('../../components/cards/HSECard'));
const TrainingCard = lazy(() => import('../../components/cards/TrainingCard'));
const Page = () => {
  const { project } = useContext(ProjectsContext);
  const [visibleActivities, setVisibleActivities] = useState(20);
  const [filters, setFilters] = useState({
    type: 'all',
    subType: 'all',
    startDate: '',
    endDate: '',
  });

  const safeParseDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const getSubTypeOptions = (type) => {
    switch(type) {
      case 'Drill Report': return [
        'Fire Drills', 'Evacuation Drills', 'Medical Emergency Drills',
        'Confined Space Rescue Drills', 'Hazardous Material Spill Drills'
      ];
      case 'Audit Report': return ['Internal', 'External'];
      case 'HSE Report': return ['Weekly', 'Monthly'];
      default: return [];
    }
  };


  const allActivities = [
    ...(project?.calendar
        ?.flatMap(month => month.months)
        ?.flatMap(week => week.weeks)
        ?.flatMap(day => day.days)
        ?.flatMap(day => day.tbts) || []).map(tbt => ({
      ...tbt,
      activityType: 'TBT',
      date: tbt.dateTime,
      hasFiles: tbt.image && tbt.image.length > 0,
    })),
  
    ...(project?.calendar
        ?.flatMap(month => month.months)
        ?.flatMap(week => week.weeks)
        ?.flatMap(day => day.days)
        ?.flatMap(day => day.drillReports) || []).map(drill => ({
      ...drill,
      activityType: 'Drill Report',
      date: drill.date,
      hasFiles: drill.file,
      subType: drill.type
    })),

    ...(project?.calendar
        ?.flatMap(month => month.months)
        ?.flatMap(week => week.weeks)
        ?.flatMap(day => day.days)
        ?.flatMap(day => day.auditReports) || []).map(audit => ({
      ...audit,
      activityType: 'Audit Report',
      date: audit.date,
      hasFiles: audit.file || audit.closeoutFile,
      subType: audit.type
    })),

    ...(project?.calendar
        ?.flatMap(month => month.months)
        ?.flatMap(week => week.weeks)
        ?.flatMap(day => day.days)
        ?.flatMap(day => day.hseReports) || []).map(hse => ({
      ...hse,
      activityType: 'HSE Report',
      date: hse.date,
      hasFiles: hse.file,
      subType: hse.type
    })),

    ...(project?.calendar
        ?.flatMap(month => month.months)
        ?.flatMap(week => week.weeks)
        ?.flatMap(day => day.days)
        ?.flatMap(day => day.trainingRecords) || []).map(training => ({
      ...training,
      activityType: 'Training Record',
      date: training.date,
      hasFiles: training.file,
    }))
  ];

  const filteredActivities = allActivities.filter(activity => {
    const activityDate = safeParseDate(activity.date);
    const matchesType = filters.type === 'all' || activity.activityType === filters.type;
    const matchesSubType = filters.subType === 'all' || activity.subType === filters.subType;
    const matchesDateRange = (!filters.startDate || activityDate >= new Date(filters.startDate)) &&
                           (!filters.endDate || activityDate <= new Date(filters.endDate));
    
    return matchesType && matchesSubType && matchesDateRange;
  });

  const sortedActivities = filteredActivities.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const displayActivities = sortedActivities.slice(0, visibleActivities);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && { subType: 'all' })
    }));
  };

  const handleShowMore = () => {
    setVisibleActivities(prev => prev + 10);
  };

  const renderActivityCard = (activity, index) => {
    switch(activity.activityType) {
      case 'TBT':
        return <Suspense fallback={<AbnormalCardSkeleton/>}><TBTCard event={activity} index={index} key={activity._id || index} /></Suspense>;
      case 'Drill Report':
        return <Suspense fallback={<AbnormalCardSkeleton/>}> <DrillCard event={activity} index={index} key={activity._id || index} /></Suspense>;
      case 'Audit Report':
        return <Suspense fallback={<AbnormalCardSkeleton/>}><AuditCard event={activity} index={index} key={activity._id || index} /></Suspense>;
      case 'HSE Report':
        return <Suspense fallback={<AbnormalCardSkeleton/>}> <HSECard event={activity} index={index} key={activity._id || index} /></Suspense>;
      case 'Training Record':
        return <Suspense fallback={<AbnormalCardSkeleton/>}> <TrainingCard event={activity} index={index} key={activity._id || index} /></Suspense>;
      default:
        return null;
    }
  };
  const shouldShowSubTypeFilter = ['Drill Report', 'Audit Report', 'HSE Report'].includes(filters.type);

  return (
    <div className="w-full p-4">
    <h2 className="text-xl dark:text-subtextcolor font-bold flex justify-between items-center mb-4">
      Activities
      <span className='text-sm bg-bluecolor px-4 p-1 rounded-full'>
        {sortedActivities.length}
      </span>
    </h2>

      <div className="mb-4">
        <div className="flex dark:text-subtextcolor flex-wrap gap-4">
          <div className='w-full flex gap-5'>
            <select 
              className="p-1 py-3 rounded-main w-full border-2 border-border dark:border-blackgrey dark:bg-subcolor"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">All Activities</option>
              <option value="TBT">TBTs</option>
              <option value="Drill Report">Drills</option>
              <option value="Audit Report">Audits</option>
              <option value="Training Record">Trainings</option>
              <option value="HSE Report">HSE Reports</option>
            </select>

            {shouldShowSubTypeFilter && (
              <select 
                className="p-1 py-3 rounded-main w-full border-2 border-border dark:border-blackgrey dark:bg-subcolor"
                value={filters.subType}
                onChange={(e) => handleFilterChange('subType', e.target.value)}
              >
                <option value="all">All {filters.type} Types</option>
                {getSubTypeOptions(filters.type).map(subType => (
                  <option key={subType} value={subType}>{subType}</option>
                ))}
              </select>
            )}
          </div>

          <div className="w-full flex gap-1 items-center">
            <input
              type="date"
              className="p-1 w-full py-3 rounded-main border-2 border-border dark:border-blackgrey dark:bg-subcolor"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              className="p-1 w-full py-3 rounded-main border-2 border-border dark:border-blackgrey dark:bg-subcolor"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {sortedActivities.length > 0 ? (
        <>
          <ul className="transition-all grid gap-4 md:grid-cols-2 xl:grid-cols-3 overflow-hidden duration-1000">
          {displayActivities.map((activity, index) => (
                <li key={activity._id||`${activity.activityType}-${activity.date}-${index}`}>
                  {renderActivityCard(activity, index)}
                </li>
              ))}          </ul>
          
          {visibleActivities < sortedActivities.length && (
            <button
              onClick={handleShowMore}
              className="mt-2 gap-1 flex px-4 py-2 text-white dark:text-backgroundcolor 
              dark:hover:text-maincolor hover:text-bluecolor transition-colors"
            >
              See More
              <Icon icon="mingcute:down-fill" width="24" height="24" />
            </button>
          )}
        </>
      ) : (
        <span className="text-gray-500">No activities match the search criteria.</span>
      )}
  </div>
);
};

export default Page;