'use client';

import { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { ProjectsContext } from '../../context/ProjectsContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

const ManHoursStatsCharts = () => {
  const { project } = useContext(ProjectsContext);
  const [filter, setFilter] = useState('WTD');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const calculateFilteredData = (manhours, filterType) => {
    const today = dayjs();
    let filteredData = [];
    const manhoursEntries = manhours.filter(entry => entry && entry.manhours);

    switch (filterType) {
      case 'WTD':
        const startOfWeek = today.startOf('week').subtract(1, 'day');
        filteredData = manhoursEntries.filter(entry => 
          entry.manhours && dayjs(entry.manhours.date).isAfter(startOfWeek)
        );
        break;
      case 'MTD':
        filteredData = manhoursEntries.filter(entry => 
          entry.manhours && dayjs(entry.manhours.date).isSame(today, 'month')
        );
        break;
      case 'YTD':
        filteredData = manhoursEntries.filter(entry => 
          entry.manhours && dayjs(entry.manhours.date).isSame(today, 'year')
        );
        break;
      case 'PTD':
        filteredData = manhoursEntries;
        break;
      default:
        filteredData = manhoursEntries;
    }
    return filteredData;
  };

  const prepareChartData = () => {
    if (!project || !project.calendar) return;
    
    const manhoursData = project.calendar.flatMap(year =>
      year.months.flatMap(month =>
        month.weeks.flatMap(week =>
          week.days
        )
      )
    );

    const filteredData = calculateFilteredData(manhoursData, filter);
    const dates = filteredData.map(entry => dayjs(entry.manhours.date).format('DD/MM'));
    const manpower = filteredData.map(entry => entry.manhours.manpower);
    const totalManhours = filteredData.map(entry => entry.manhours.totalManhours);
    const safeManhours = filteredData.map(entry => entry.manhours.totalSafeManhours);
    setChartData({
      labels: dates,
      datasets: [
        {
          label: 'Manpower',
          data: manpower,
          borderColor: '#3b82f6',
          fill: false
        },
        {
          label: 'Total Manhours',
          data: totalManhours,
          borderColor: '#22c55e',
          fill: false,
          
        },
        {
          label: 'Safe Manhours',
          data: safeManhours,
          borderColor: '#1e3a8a',
          fill: false,
          tension: 0.4


        }
      ]
    });
  };

  useEffect(() => {
    prepareChartData();
  }, [filter, project]);

  return (
    <div className="h-52 min-h-52 w-full  p-2 bg-boxcolor dark:bg-blackgrey  gap-1 flex flex-col rounded-main ">
      
      <div className="flex items-center justify-between text-subtextcolor ">
        <div className=' flex items-center'>
        <span className=' rounded-l-full p-1 bg-maincolor text-xs'>Manpower</span>
        <span className=' p-1 bg-darkbluec text-xs'>ManHours</span>
        <span className=' p-1 rounded-r-full bg-greencolor text-xs'>SafeHours</span>
        </div>
       <div className=' flex gap-1'> {['WTD', 'MTD', 'YTD', 'PTD'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-2 py-1 text-xs  duration-300 rounded-full ${filter === type ? 'bg-maincolor text-subtextcolor' : 'bg-hovercolor text-textcolor'}`}
          >
            {type}
          </button>
        ))}      </div>

      </div>
      <div className=' w-full  relative h-full'>
      <Line
      
      data={chartData} options={{
        
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
          legend: {
              display:false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          x: {
            title: { display: false, text: 'Date' }
          },
          y: {
            title: { display: false, text: 'Count' },
            beginAtZero: true
          }
        }
      }} /></div>
    </div>
  );
};

export default ManHoursStatsCharts;
