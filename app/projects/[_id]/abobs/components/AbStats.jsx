import React, { useContext } from 'react';
import { ProjectsContext } from '../../../context/ProjectsContext';

// Helper function to filter events by type and date range
const filterEventsByType = (calendar, startDate, endDate, eventType) => {
  let count = 0;
  
  calendar.forEach(year => {
    year.months.forEach(month => {
      month.weeks.forEach(week => {
        week.days.forEach(day => {
          const dayDate = new Date(day.date);
          if (dayDate >= startDate && dayDate <= endDate) {
            count += day.abnormalEvents.filter(event => event.eventType === eventType).length;
          }
        });
      });
    });
  });

  return count;
};

const AbStats = (props) => {
  const { project } = useContext(ProjectsContext);
  const eventTypes = [
    'Near miss',
    'Property Damage',
    'Environmental Harm',
    'First Aid',
    'Medical Treatment',
    'LTI',
    'Fatality'
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

  // Generate stats for each event type
  const stats = eventTypes.map(type => {
    const WTD = filterEventsByType(project.calendar, startOfWeek, today, type);
    const MTD = filterEventsByType(project.calendar, startOfMonth, today, type);
    const YTD = filterEventsByType(project.calendar, startOfYear, today, type);
    const PTD = filterEventsByType(project.calendar, projectStartDate, today, type);
    
    return {
      type,
      WTD,
      MTD,
      YTD,
      PTD,
    };
  });

  // Calculate column totals
  const columnTotals = {
    WTD: stats.reduce((sum, row) => sum + row.WTD, 0),
    MTD: stats.reduce((sum, row) => sum + row.MTD, 0),
    YTD: stats.reduce((sum, row) => sum + row.YTD, 0),
    PTD: stats.reduce((sum, row) => sum + row.PTD, 0),
  };

  return (
    <div  className={`${props.className} group p-4  dark:bg-blackgrey bg-boxcolor   rounded-main duration-300 w-full`}>
      <div className="flex items-center gap-2 mb-4">
      <h2 className="text-lg font-bold bg-redcolor p-2 rounded-full  ">Abnormals Statistics</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="  dark:text-subtextcolor border-b border-red-200">
              <th className="text-left p-2">Event Type</th>
              <th className="p-2 text-center">WTD</th>
              <th className="p-2 text-center">MTD</th>
              <th className="p-2 text-center">YTD</th>
              <th className="p-2 text-center">PTD</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((row, index) => (
              <tr key={row.type} className={index % 2 === 0 ? 'bg-lightred  dark:text-subtextcolor bg-opacity-10' : ''}>
                <td className="p-2 font-medium  dark:text-subtextcolor  text-nowrap">{row.type}</td>
                <td className="p-2 text-center font-medium ">{row.WTD}</td>
                <td className="p-2 text-center font-medium ">{row.MTD}</td>
                <td className="p-2 text-center font-medium ">{row.YTD}</td>
                <td className="p-2 text-center font-medium ">{row.PTD}</td>
              </tr>
            ))}
            <tr className=" text-subtextcolor font-bold">
            <td className="p-2 bg-darkred rounded-l-main ">Total</td>
            <td className="p-2 text-center  bg-darkred ">{columnTotals.WTD}</td>
              <td className="p-2 text-center  bg-darkred ">{columnTotals.MTD}</td>
              <td className="p-2 text-center  bg-darkred ">{columnTotals.YTD}</td>
              <td className="p-2 text-center  bg-darkred rounded-r-main">{columnTotals.PTD}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AbStats;