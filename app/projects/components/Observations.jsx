import React, { Suspense, useContext, useState } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import { Icon } from '@iconify/react';
import ObservationCard from './cards/ObservationCard';

const Observations = () => {
  const { project } = useContext(ProjectsContext);
  const [showAll, setShowAll] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    startDate: '',
    endDate: '',
  });

  if (!project) {
    return <span>Loading project data...</span>;
  }

  // Available types for filtering
  const observationTypes = [
    "Access/Egress", "Barriers/Guards", "Behavioural aspects", "Briefings", 
    "Competence/Training/Licences", "Confined Space", "Driving", "Electrical safety", 
    "Emergency Response", "Environment", "Excavations", "Falling Objects", 
    "Fire safety", "First Aid/Medical", "Floor Openings/Gaps/Holes", "Gas Cylinders",
    "Good Practice", "Hand Tools/Power Tools", "Hazardous Substances/Dusts/Gases",
    "Health", "Heat Stress", "Hot Works", "Housekeeping", "Isolations",
    "Lifting Equipment", "Lifting Operations", "Lighting", "Manual Handling",
    "Noise", "Plant & Equipment", "PPE", "Pressure Systems",
    "Records/Registers", "Risk Assessment/Method Statement/Permits", "Security",
    "Signage", "Slip/Trips/Falls", "Storage", "Supervision", "Temporary Works",
    "Traffic Management", "Vibration", "Welfare", "Work at Height/Scaffolding/Ladders"
  ];

  // Extract all observations
  const allObservations = project?.calendar
    ?.flatMap(month => month.months)
    ?.flatMap(week => week.weeks)
    ?.flatMap(day => day.days)
    ?.flatMap(day => day.observations) || [];

// Sort observations by date in descending order
const sortedObservations = [...allObservations].sort((a, b) => 
  new Date(b.dateTime) - new Date(a.dateTime)
);

const filteredObservations = sortedObservations.filter(obs => {
  const obsDate = new Date(obs.dateTime);
  const matchesStatus = filters.status === 'all' || obs.status === filters.status;
  const matchesType = filters.type === 'all' || obs.type === filters.type;
  const matchesDateRange = (!filters.startDate || obsDate >= new Date(filters.startDate)) &&
                         (!filters.endDate || obsDate <= new Date(filters.endDate));
  
  return matchesStatus && matchesType && matchesDateRange;
});

// Limit to 20 observations
const maxObservations = 20;
const displayObservations = showAll ? filteredObservations.slice(0, maxObservations) : filteredObservations.slice(0, 1);

const handleFilterChange = (name, value) => {
  setFilters(prev => ({
    ...prev,
    [name]: value
  }));
  setShowAll(false); // Reset expand/collapse state when filter changes
};

return (
   <Suspense fallback={<div/>}>
  
  <div className="w-full dark:text-subtextcolor">
    <h2 className="text-xl font-bold flex justify-between items-center mb-4">
      Observations 
      <span className='text-sm bg-orangecolor px-4 p-1 rounded-full'>
      {filteredObservations.length}
      </span>
    </h2>

    <div className="mb-4 space-y-2">
      <div className="flex w-full flex-col gap-4">
        <div className='w-full flex gap-2'>
          <select 
            className="p-2 w-full rounded-main dark:border-blackgrey border-2 dark:bg-subcolor border-border transition-all hover:border-orangecolor focus:border-orangecolor"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">كل الحالات</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <select 
            className="p-2 w-full rounded-main dark:border-blackgrey border-2 dark:bg-subcolor border-border transition-all hover:border-orangecolor focus:border-orangecolor"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">كل الأنواع</option>
            {observationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="date"
            className="p-2 w-full rounded-main dark:border-blackgrey border-2 dark:bg-subcolor border-border transition-all hover:border-orangecolor focus:border-orangecolor"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
          />
          <span>إلى</span>
          <input
            type="date"
            className="p-2 w-full rounded-main dark:border-blackgrey border-2 dark:bg-subcolor border-border transition-all hover:border-orangecolor focus:border-orangecolor"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
          />
        </div>
      </div>
    </div>

    {filteredObservations.length > 0 ? (
      <div className="relative">
        <ul className={`space-y-4 transition-all duration-500 ease-in-out ${showAll ? 'max-h-[5000px]' : 'max-h-68'} overflow-hidden`}>
          {displayObservations.map((event, index) => (
                        <Suspense fallback={<div className=' h-52 bg-backgroundcolor dark:bg-blackgrey animate-pulse'></div>}>

          <ObservationCard key={event._id || index} event={event} index={index} />
          </Suspense>))}
        </ul>

        {filteredObservations.length > 1 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-2 px-4 py-2 text-white hover:text-orangecolor transition-all duration-300 flex items-center justify-center"
            aria-label={showAll ? 'Show less' : 'Show more'}
          >
            <Icon 
              icon="mingcute:down-fill" 
              className={`transform transition-transform duration-300 ${showAll ? 'rotate-180' : ''} text-2xl`}
            />
          </button>
        )}
      </div>
    ) : (
      <span className="text-gray-500">لا توجد ملاحظات تطابق معايير البحث.</span>
    )}
  </div>
  </Suspense>
);
};

export default Observations;