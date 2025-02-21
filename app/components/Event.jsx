'use client'
import React, { Suspense, useContext } from 'react';
import { Icon } from '@iconify/react';
import { ProjectsContext } from '../projects/context/ProjectsContext';
import { EventCardSkeleton } from './Loading';

// Import new card components
const TBTCard = React.lazy(() => import('../projects/components/cards/TBTCard'));
const DrillCard = React.lazy(() => import('../projects/components/cards/DrillCard'));
const AuditCard = React.lazy(() => import('../projects/components/cards/AuditCard'));
const HSECard = React.lazy(() => import('../projects/components/cards/HSECard'));
const TrainingCard = React.lazy(() => import('../projects/components/cards/TrainingCard'));

const Event = () => {
  const { project } = useContext(ProjectsContext);

    const safeParseDate = (dateString) => {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    };

    if (!project) {
      return (
        <div className="w-full p-4">
          <ul className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <EventCardSkeleton key={index} />
            ))}
          </ul>
        </div>
      );
    }


  const getActivities = () => {
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

    return allActivities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  };


  const renderActivityCard = (activity, index) => {
    return (
      <Suspense key={activity._id || index} fallback={<EventCardSkeleton />}>
        {(() => {
          switch(activity.activityType) {
            case 'TBT':
              return <TBTCard event={activity} index={index} />;
            case 'Drill Report':
              return <DrillCard event={activity} index={index} />;
            case 'Audit Report':
              return <AuditCard event={activity} index={index} />;
            case 'HSE Report':
              return <HSECard event={activity} index={index} />;
            case 'Training Record':
              return <TrainingCard event={activity} index={index} />;
            default:
              return null;
          }
        })()}
      </Suspense>
    );
  };
  return (
    <div className="w-full  p-4">
      

      <ul className="space-y-4">
        {getActivities().map((activity, index) => renderActivityCard(activity, index))}
      </ul>
    </div>
  );
};

export default Event;