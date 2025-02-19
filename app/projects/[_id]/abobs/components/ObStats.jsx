import React, { useContext, useState } from 'react';
import { ProjectsContext } from '../../../context/ProjectsContext';

// Helper function to filter observations by type and date range
const filterObservationsByType = (calendar, startDate, endDate, observationType) => {
  let count = 0;
  
  calendar.forEach(year => {
    year.months.forEach(month => {
      month.weeks.forEach(week => {
        week.days.forEach(day => {
          const dayDate = new Date(day.date);
          if (dayDate >= startDate && dayDate <= endDate) {
            count += day.observations.filter(obs => obs.type === observationType).length;
          }
        });
      });
    });
  });

  return count;
};

const ObStats = (props) => {
  const { project } = useContext(ProjectsContext);
  const [showAll, setShowAll] = useState(false);
  
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

  if (!project || !project.calendar) return {};

  const today = new Date();
  
  // Calculate date ranges
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(today.getDate() - offset);
  
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const projectStartDate = new Date(project.startDate);

  // Generate stats for each observation type
  const stats = observationTypes.map(type => {
    const WTD = filterObservationsByType(project.calendar, startOfWeek, today, type);
    const MTD = filterObservationsByType(project.calendar, startOfMonth, today, type);
    const YTD = filterObservationsByType(project.calendar, startOfYear, today, type);
    const PTD = filterObservationsByType(project.calendar, projectStartDate, today, type);
    
    return {
      type,
      WTD,
      MTD,
      YTD,
      PTD,
    };
  });

  // Sort stats by total count and get top 7
  const sortedStats = [...stats].sort((a, b) => b.rowTotal - a.rowTotal);
  const topStats = sortedStats.slice(0, 7);
  const remainingStats = sortedStats.slice(7);

  // Calculate column totals
  const calculateTotals = (statsArray) => ({
    WTD: statsArray.reduce((sum, row) => sum + row.WTD, 0),
    MTD: statsArray.reduce((sum, row) => sum + row.MTD, 0),
    YTD: statsArray.reduce((sum, row) => sum + row.YTD, 0),
    PTD: statsArray.reduce((sum, row) => sum + row.PTD, 0),
  });

  const columnTotals = calculateTotals(stats);

  return (
    <div  className={`${props.className} group p-4 bg-boxcolor   dark:bg-blackgrey rounded-main duration-300 w-full`}>
      <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold bg-orangecolor p-2 rounded-full  ">Observations Statistics</h2>
      <button 
          onClick={(e) => {
            e.preventDefault();
            setShowAll(!showAll);
          }}
          className=" hover:text-red-700 text-sm flex items-center gap-1"
        >
          {showAll ? 'Show Less' : 'Show More'}
          <span className={`transform  text-orangecolor transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full">
          <thead>
            <tr className=" border-b border-red-200">
              <th className="text-left p-2">Observation Type</th>
              <th className="p-2 text-center">WTD</th>
              <th className="p-2 text-center">MTD</th>
              <th className="p-2 text-center">YTD</th>
              <th className="p-2 text-center">PTD</th>
            </tr>
          </thead>
          <tbody>
            {topStats.map((row, index) => (
              <tr key={row.type} className={index % 2 === 0 ? 'bg-lightred bg-opacity-10' : ''}>
                <td className="p-2 font-medium  text-nowrap">{row.type}</td>
                <td className="p-2 text-center font-medium ">{row.WTD}</td>
                <td className="p-2 text-center font-medium ">{row.MTD}</td>
                <td className="p-2 text-center font-medium ">{row.YTD}</td>
                <td className="p-2 text-center font-medium ">{row.PTD}</td>
              </tr>
            ))}
            
            {showAll && remainingStats.map((row, index) => (
              <tr key={row.type} className={index % 2 === 0 ? 'bg-lightred bg-opacity-10' : ''}>
                <td className="p-2 font-medium ">{row.type}</td>
                <td className="p-2 text-center font-medium ">{row.WTD}</td>
                <td className="p-2 text-center font-medium ">{row.MTD}</td>
                <td className="p-2 text-center font-medium ">{row.YTD}</td>
                <td className="p-2 text-center font-medium ">{row.PTD}</td>
              </tr>
            ))}
            
            <tr className=" text-subtextcolor font-bold">
              <td className="p-2 bg-darkorange rounded-l-main ">Total</td>
              <td className="p-2 text-center bg-darkorange  ">{columnTotals.WTD}</td>
              <td className="p-2 text-center bg-darkorange ">{columnTotals.MTD}</td>
              <td className="p-2 text-center bg-darkorange ">{columnTotals.YTD}</td>
              <td className="p-2 text-center bg-darkorange rounded-r-main">{columnTotals.PTD}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ObStats;