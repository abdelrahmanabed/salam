'use client';

import { useContext, useState, useRef } from 'react';
import { TodayContext } from '../../context/TodayContext';
import { Icon } from '@iconify/react';
import ObservationCard from '../../components/cards/ObservationCard';
import TBTCard from '../../components/cards/TBTCard';
import AuditCard from '../../components/cards/AuditCard';
import DrillCard from '../../components/cards/DrillCard';
import HSECard from '../../components/cards/HSECard';
import AbnormalCard from '../../components/cards/AbnormalCard';
import TrainingCard from '../../components/cards/TrainingCard';
import NoteCard from '../../components/cards/NoteCard';
import NanoNote from '../../components/cards/NanoNote';
import { useNotes } from '../../../contexts/NoteContext';

const LoadingState = () => (
  <div className="flex items-center justify-center w-full h-64">
    <div className="flex flex-col items-center gap-4">
      <Icon icon="eos-icons:loading" className="w-12 h-12 animate-spin text-bluecolor" />
      <span className="text-lg text-gray-600">جاري تحميل البيانات...</span>
    </div>
  </div>
);

const DayContent = () => {
  const { projectNotes, getPinnedNotes, toggleNotePin } = useNotes();

  const todayData = useContext(TodayContext);
  const notesRef = useRef(null);

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const manPower = todayData?.manhours?.manpower || 0;
  const dayHours = todayData?.manhours?.dayWorkingHours || 0;
  const manHours = todayData?.manhours?.totalManhours || 0;
  const lti = todayData?.manhours?.LTI || 0;

  const pinnedNotes = todayData?.notes?.filter(note => note.pinned) || [];
  const regularNotes = todayData?.notes || [];

  const allEvents = [
    ...(todayData?.abnormalEvents || []).map(event => ({ ...event, type: 'abnormal' })),
    ...(todayData?.observations || []).map(event => ({ ...event, type: 'observation' })),
    ...(todayData?.tbts || []).map(event => ({ ...event, type: 'tbt' })),
    ...(todayData?.drillReports || []).map(event => ({ ...event, type: 'drill' })),
    ...(todayData?.auditReports || []).map(event => ({ ...event, type: 'audit' })),
    ...(todayData?.trainingRecords || []).map(event => ({ ...event, type: 'training' })),
    ...(todayData?.hseReports || []).map(event => ({ ...event, type: 'hse' }))
  ].sort((a, b) => new Date(b.date || b.dateTime) - new Date(a.date || a.dateTime));

  const scrollToNotes = () => {
    notesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderEventCard = (event, index) => {
    switch (event.type) {
      case 'observation':
        return <ObservationCard key={index} event={event} index={index} />;
      case 'tbt':
        return <TBTCard key={index} event={event} index={index} />;
      case 'audit':
        return <AuditCard key={index} event={event} index={index} />;
      case 'drill':
        return <DrillCard key={index} event={event} index={index} />;
      case 'hse':
        return <HSECard key={index} event={event} index={index} />;
      case 'abnormal':
        return <AbnormalCard key={index} event={event} index={index} />;
      case 'training':
        return <TrainingCard key={index} event={event} index={index} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 pt-0 dark:text-subtextcolor   min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="bg-hovercolor dark:bg-blackgrey   rounded-main shadow-sm p-6 mb-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-bluecolor/10 p-2 rounded-circle">
                  <Icon icon="material-symbols:calendar-month" className="w-6 h-6 text-bluecolor" />
                </div>
                <div>
                  <h1 className="text-bluecolor font-black text-2xl">TODAY</h1>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{today}</span>
                </div>
              </div>
              <button 
                onClick={scrollToNotes}
                className="md:hidden px-4 py-2 bg-bluecolor text-white rounded-full text-sm flex items-center gap-2 hover:bg-bluecolor/90 transition-colors"
              >
                <Icon icon="material-symbols:sticky-note-2" />
                Notes
              </button>
            </div>

            {pinnedNotes.length > 0 && (
              <div className="mt-2 space-y-2">
                {pinnedNotes.map((note, index) => (
                  <NanoNote key={index} note={note} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-hovercolor dark:bg-darkbox p-4 rounded-main shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-bluecolor/10 p-2 rounded-circle">
                <Icon icon="fluent:people-team-20-filled" className="w-6 h-6 text-bluecolor" />
              </div>
              <div>
                <p className="text-sm text-gray-600 text-nowrap dark:text-gray-400">Man Power</p>
                <p className="text-xl font-semibold">{manPower}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-hovercolor dark:bg-darkbox p-4 rounded-main shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-bluecolor/10 p-2 rounded-circle">
                <Icon icon="tabler:clock-hour-4-filled" className="w-6 h-6 text-bluecolor" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">W Hours</p>
                <p className="text-xl font-semibold">{dayHours}h</p>
              </div>
            </div>
          </div>
          
          <div className="bg-hovercolor dark:bg-darkbox p-4 rounded-main shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-bluecolor/10 p-2 rounded-circle">
                <Icon icon="fa-solid:business-time" className="w-6 h-6 text-bluecolor" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Man Hours</p>
                <p className="text-xl font-semibold">{manHours}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-hovercolor dark:bg-darkbox p-4 rounded-main shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-bluecolor/10 p-2 rounded-circle">
                <Icon icon="bi:person-fill-x" className="w-6 h-6 text-bluecolor" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">LTI</p>
                <p className="text-xl font-semibold">{lti}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Events Section */}
          <div className="flex-1">
            <div className=" dark:bg-subcolor rounded-xl shadow-sm ">
              <div className="flex items-center gap-2 mb-6">
                <Icon icon="material-symbols:event-note" className="w-6 h-6 text-bluecolor" />
                <h2 className="text-lg font-semibold">Events</h2>
              </div>
              {allEvents.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                  {allEvents.map((event, index) => renderEventCard(event, index))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Icon icon="material-symbols:event-busy" className="w-12 h-12 mx-auto mb-2" />
                  <p>No events found for today</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div ref={notesRef} className=" md:w-1/2 lg:w-96">
            <div className=" ">
              <div className="flex items-center gap-2 mb-6">
                <Icon icon="material-symbols:sticky-note-2" className="w-6 h-6 text-bluecolor" />
                <h2 className="text-lg font-semibold">Notes</h2>
              </div>
              {regularNotes.length > 0 ? (
                <div className="space-y-4 rounded-main  dark:bg-blackgrey  p-6 bg-backgroundcolor">
                  {regularNotes.map((note, index) => (
                    <NoteCard key={index} note={note} 
                    onPinToggled={toggleNotePin}

                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Icon icon="material-symbols:note-stack" className="w-12 h-12 mx-auto mb-2" />
                  <p>No notes for today</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DayContent