'use client';

import React, { useContext, useState, useRef,Suspense  } from 'react';
import { Icon } from '@iconify/react';
import { UsersContext } from '../../../contexts/UsersContext';
import { EventCardSkeleton, PinnedNotesSkeleton } from '@/app/components/Loading';
const ObservationCard = React.lazy(() => import('../../../projects/components/cards/ObservationCard'));
const TBTCard = React.lazy(() => import('../../../projects/components/cards/TBTCard'));
const AuditCard = React.lazy(() => import('../../../projects/components/cards/AuditCard'));
const DrillCard = React.lazy(() => import('../../../projects/components/cards/DrillCard'));
const HSECard = React.lazy(() => import('../../../projects/components/cards/HSECard'));
const AbnormalCard = React.lazy(() => import('../../../projects/components/cards/AbnormalCard'));
const TrainingCard = React.lazy(() => import('../../../projects/components/cards/TrainingCard'));
const NoteCard = React.lazy(() => import('../../../projects/components/cards/NoteCard'));
const NanoNote = React.lazy(() => import('../../../projects/components/cards/NanoNote'));

const Activities = () => {
  const { user, userLoading } = useContext(UsersContext);
  const [showAll, setShowAll] = useState(false);
  const notesRef = useRef(null);
  const [filters, setFilters] = useState({
    type: 'all',
    startDate: '',
    endDate: '',
    status: 'all'
  });
  const allNotes = user?.notes|| [];

  // Get pinned and regular notes directly from user
  const pinnedNotes = allNotes.filter(note => note.pinned === true);
  const regularNotes = allNotes 
  const scrollToNotes = () => {
    notesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const allActivities = user ? [
    ...(user.abnormalEvents || []).map(event => ({
      ...event,
      activityType: 'Abnormal Event',
      date: event.date,
      hasFiles: event.initialReport || event.investigationReport || event.actionPlan || event.lessonLearned || event.closeoutReport 
    })),
    ...(user.tbts || []).map(tbt => ({
      ...tbt,
      activityType: 'TBT',
      date: tbt.dateTime,
      hasFiles: tbt.image && tbt.image.length > 0
    })),
    ...(user.observations || []).map(obs => ({
      ...obs,
      activityType: 'Safety Observation',
      date: obs.dateTime,
      hasFiles: obs.image && obs.image.length > 0
    })),
    ...(user.drillReports || []).map(drill => ({
      ...drill,
      activityType: 'Drill Report',
      date: drill.date,
      hasFiles: drill.file
    })),
    ...(user.hseReports || []).map(hse => ({
      ...hse,
      activityType: 'HSE Report',
      date: hse.date,
      hasFiles: hse.file
    })),
    ...(user.auditReports || []).map(audit => ({
      ...audit,
      activityType: 'Audit Report',
      date: audit.date,
      hasFiles: audit.file || audit.closeoutFile
    })),
    ...(user.trainingRecords || []).map(training => ({
      ...training,
      activityType: 'Training Record',
      date: training.date,
      hasFiles: training.file
    }))
  ] : [];

  const filteredActivities = allActivities.filter(activity => {
    const activityDate = new Date(activity.date);
    const matchesType = filters.type === 'all' || activity.activityType === filters.type;
    const matchesDateRange = (!filters.startDate || activityDate >= new Date(filters.startDate)) &&
                           (!filters.endDate || activityDate <= new Date(filters.endDate));
    const matchesStatus = filters.status === 'all' || 
                         (activity.status === filters.status) || 
                         (!activity.status && filters.status === 'Open');
    
    return matchesType && matchesDateRange && matchesStatus;
  });

  const sortedActivities = filteredActivities.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const displayActivities = showAll ? sortedActivities : sortedActivities.slice(0, 25);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderActivityCard = (activity, index) => {
    switch (activity.activityType) {
      case 'Safety Observation':
        return <Suspense fallback={<EventCardSkeleton/>}>  <Suspense fallback={<EventCardSkeleton/>}> <ObservationCard key={activity._id || index} event={activity} index={index} /></Suspense> </Suspense>;
      case 'TBT':
        return <Suspense fallback={<EventCardSkeleton/>}>  <TBTCard key={activity._id || index} event={activity} index={index} /></Suspense>;
      case 'Audit Report':
        return <Suspense fallback={<EventCardSkeleton/>}>  <AuditCard key={activity._id || index} event={activity} index={index} /></Suspense>;
      case 'Drill Report':
        return <Suspense fallback={<EventCardSkeleton/>}>  <DrillCard key={activity._id || index} event={activity} index={index} /></Suspense>;
      case 'HSE Report':
        return <Suspense fallback={<EventCardSkeleton/>}>  <HSECard key={activity._id || index} event={activity} index={index} /></Suspense>;
      case 'Abnormal Event':
        return <Suspense fallback={<EventCardSkeleton/>}>  <AbnormalCard key={activity._id || index} event={activity} index={index} /></Suspense>;
      case 'Training Record':
        return <Suspense fallback={<EventCardSkeleton/>}>  <TrainingCard key={activity._id || index} event={activity} index={index} /></Suspense>;
      default:
        return null;
    }
  };



  return (
    <div className="mx-auto">
    {/* Header with Pinned Notes */}
    <div className="bg-white  rounded-xl shadow-sm  mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Activities
          <span className="text-sm bg-bluecolor text-white px-3 py-1 rounded-full">
            {sortedActivities.length}
          </span>
        </h2>
        <button 
          onClick={scrollToNotes}
          className="md:hidden px-4 py-2 bg-bluecolor text-white rounded-full text-sm flex items-center gap-2 hover:bg-bluecolor/90 transition-colors"
        >
          <Icon icon="material-symbols:sticky-note-2" />
          Notes
        </button>
      </div>

      <Suspense fallback={<PinnedNotesSkeleton/>}>{pinnedNotes.length > 0 && (
        <div className="space-y-2">
          {pinnedNotes.map((note, index) => (
            <NanoNote key={index} note={note} />
          ))}
        </div>
      )}</Suspense>
    </div>
          
      <div className="mb-4 space-y-2">
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <select 
              className="p-2 w-full rounded-main dark:border-subtextcolor border-2 border-darkgrey dark:bg-subcolor"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">كل الأنواع</option>
              <option value="Abnormal Event">Abnormal Events</option>
              <option value="TBT">TBTs</option>
              <option value="Safety Observation">Safety Observations</option>
              <option value="Drill Report">Drill Reports</option>
              <option value="Audit Report">Audit Reports</option>
              <option value="Training Record">Training Records</option>
              <option value="HSE Report">HSE Report</option>
            </select>

            <select 
              className="p-2 rounded-main w-full dark:border-subtextcolor border-2 border-darkgrey dark:bg-subcolor"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">كل الحالات</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          

            <div className=' flex gap-4'>
              <input
                type="date"
                className="p-2 w-full rounded-main dark:border-subtextcolor border-2 border-darkgrey dark:bg-subcolor"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />

            
              <input
                type="date"
                className="p-2 w-full rounded-main dark:border-subtextcolor border-2 border-darkgrey dark:bg-subcolor"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              /></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Activities Section */}
          <div className="flex-1">
            <div className="bg-white  rounded-xl shadow-sm ">
              {sortedActivities.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                  {displayActivities.map((activity, index) => renderActivityCard(activity, index))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Icon icon="material-symbols:event-busy" className="w-12 h-12 mx-auto mb-2" />
                  <p>No activities found</p>
                </div>
              )}

              {sortedActivities.length > 25 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="inline-flex items-center gap-2 px-4 py-2  hover:text-blue-700 transition-colors"
                  >
                    {showAll ? 'Show Less' : 'Show More'}
                    <Icon 
                      icon="mingcute:down-fill" 
                      className={`transform ${showAll ? 'rotate-180' : ''} transition-transform`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div ref={notesRef} className="  rounded-main   lg:w-96 md:w-1/2">
            <div className=" dark:bg-blackgrey bg-backgroundcolor rounded-main p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon icon="material-symbols:sticky-note-2" className="w-5 h-5 text-bluecolor" />
                Notes
              </h2>
              <Suspense fallback={<div></div>}>
              {regularNotes.length > 0 ? (
                <div className="space-y-4">
                  {regularNotes.map((note, index) => (
                    <NoteCard key={index} note={note} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Icon icon="material-symbols:note-stack" className="w-12 h-12 mx-auto mb-2" />
                  <p>No notes found</p>
                </div>
              )}</Suspense>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Activities;