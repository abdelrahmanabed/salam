'use client';

import { useState, useEffect, useContext, Suspense } from 'react';
import { Line, Bar } from 'react-chartjs-2';
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

const AbnormalEventsCharts = () => {
  const { project } = useContext(ProjectsContext);
  const [filter, setFilter] = useState('WTD');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const calculateFilteredData = (events, filterType) => {
    const today = dayjs();
    let filteredData = [];

    switch (filterType) {
      case 'WTD':
        const startOfWeek = today.startOf('week').subtract(1, 'day'); // يبدأ السبت
        filteredData = events.filter(event => dayjs(event.date).isAfter(startOfWeek));
        break;
      case 'MTD':
        filteredData = events.filter(event => dayjs(event.date).isSame(today, 'month'));
        break;
      case 'YTD':
        filteredData = events.filter(event => dayjs(event.date).isSame(today, 'year'));
        break;
      case 'PTD':
        filteredData = events; // كل البيانات
        break;
      default:
        filteredData = events;
    }
    return filteredData;
  };

  const prepareChartData = () => {
    if (!project || !project.calendar) return;

    const abnormalEventsData = project.calendar.flatMap(year =>
      year.months.flatMap(month =>
        month.weeks.flatMap(week =>
          week.days.flatMap(day => day.abnormalEvents)
        )
      )
    );

    const filteredData = calculateFilteredData(abnormalEventsData, filter);

    // جمع البيانات حسب التواريخ
    const groupedData = filteredData.reduce((acc, event) => {
      const date = dayjs(event.date).format('DD/MM');
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += 1; // زيادة عدد الأحداث في نفس اليوم
      return acc;
    }, {});

    // استخراج التواريخ والقيم
    const dates = Object.keys(groupedData);
    const counts = Object.values(groupedData);

    setChartData({
      labels: dates,
      datasets: [
        {
          label: 'Abnormal Events',
          data: counts,
          borderColor: '#ef4444',
          fill: false,
        }
      ]
    });
  };

  useEffect(() => {
    prepareChartData();
  }, [filter, project]);

  return (
    <Suspense fallback={<div/>}>
    <div className="h-52 w-full p-2 bg-boxcolor  dark:bg-blackgrey gap-1 flex flex-col rounded-main ">
      <div className="flex items-center justify-between text-subtextcolor ">
        <div className="flex items-center">
          <span className="p-1 bg-redcolor text-xs rounded-full">Abnormal Events</span>
        </div>
        <div className="flex gap-1">
          {['WTD', 'MTD', 'YTD', 'PTD'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-2 py-1 text-xs duration-300 rounded-full ${
                filter === type ? 'bg-redcolor text-subtextcolor' : 'bg-hovercolor text-textcolor'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full relative h-full">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                mode: 'index',
                intersect: false
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
          }}
        />
      </div>
    </div></Suspense>
  );
};

export default AbnormalEventsCharts;
