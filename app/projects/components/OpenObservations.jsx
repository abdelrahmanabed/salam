import React, { Suspense, useContext, useState } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import ObservationCard from './cards/ObservationCard';

const OpenObservations = () => {
  const { project } = useContext(ProjectsContext);
  const [showAll, setShowAll] = useState(false);  // ⬅️ حالة لإظهار أو إخفاء الملاحظات



  // استخراج كل الملاحظات ذات الحالة "Open"
  const openObservations = project?.calendar
    ?.flatMap(month => month.months)
    ?.flatMap(week => week.weeks)
    ?.flatMap(day => day.days)
    ?.flatMap(day => day.observations)
    ?.filter(event => event.status === 'Open') || [];

  // تحديد عدد الملاحظات المعروضة
  const sortedOpenObservations= openObservations
  .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
  .slice(0, 10);

  const displayedObservations = showAll ? sortedOpenObservations : sortedOpenObservations.slice(0, 1);

 
  return (
    <Suspense fallback={<div/>}>
    <div className=" w-full">
      <h2 className="text-xl font-bold flex justify-between dark:text-subtextcolor items-center mb-4">Open Observations <span className=' text-sm  dark:text-darkorange bg-orangecolor px-4 p-1 rounded-full '>{openObservations.length}</span></h2>

      {sortedOpenObservations.length > 0 ? (
      <ul className={`${showAll ? 'max-h-[5000px]' : 'max-h-68'} transition-all space-y-4 overflow-hidden dark:text-subtextcolor duration-1000`}>

                {displayedObservations.map((event, index) => (
              <ObservationCard key={event._id || index} event={event} index={index} />

                ))}
              </ul>
                    ) : (
        <span className="text-gray-500">No open observations found.</span>
      )}

      {openObservations.length > 1 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className=" px-4 py-2  text-white rounded-full text-orangecolor hover:text-orangecolor transition-all duration-300"
        >
          {showAll ? <Icon  className=' rotate-180' icon="mingcute:down-fill" width="24" height="24" />: <Icon icon="mingcute:down-fill" width="24" height="24" />}
          
        </button>
      )}
    </div></Suspense>
  );
};

export default OpenObservations;
