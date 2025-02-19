'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

const EventsStatsChart = ({ data, filters, labels, colors }) => {
  const [filter, setFilter] = useState(filters[0].value || 'WTD');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const calculateFilteredData = (data, filterType) => {
    const today = dayjs();
    let filteredData = [];

    switch (filterType) {
      case 'WTD':
        const startOfWeek = today.startOf('week').subtract(1, 'day');
        filteredData = data.filter(entry => dayjs(entry.date).isAfter(startOfWeek));
        break;
      case 'MTD':
        filteredData = data.filter(entry => dayjs(entry.date).isSame(today, 'month'));
        break;
      case 'YTD':
        filteredData = data.filter(entry => dayjs(entry.date).isSame(today, 'year'));
        break;
      case 'PTD':
        filteredData = data; // كل البيانات
        break;
      default:
        filteredData = data;
    }
    return filteredData;
  };

  const prepareChartData = () => {
    const filteredData = labels.map(label => {
      const entries = calculateFilteredData(data[label.key], filter);
      return entries.length; // عدد العناصر لكل مجموعة
    });

    const dates = data[labels[0].key]
      .map(entry => dayjs(entry.date).format('DD/MM'))
      .filter((value, index, self) => self.indexOf(value) === index); // التأكد من عدم تكرار التواريخ

    setChartData({
      labels: dates,
      datasets: labels.map((label, index) => ({
        label: label.name,
        data: filteredData,
        borderColor: colors[index],
        fill: false,
        tension: 0.4,
      })),
    });
  };

  useEffect(() => {
    prepareChartData();
  }, [filter, data]);

  return (
    <div className="h-52 w-full p-2 bg-boxcolor gap-1 flex flex-col rounded-main shadow">
      <div className="flex items-center justify-between text-subtextcolor">
        <div className="flex items-center gap-1">
          {labels.map((label, index) => (
            <span
              key={label.key}
              className={`px-2 py-1 rounded-full text-xs`}
              style={{ backgroundColor: colors[index], color: '#fff' }}
            >
              {label.name}
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          {filters.map(({ name, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-2 py-1 text-xs duration-300 rounded-full ${
                filter === value ? 'bg-maincolor text-subtextcolor' : 'bg-hovercolor text-textcolor'
              }`}
            >
              {name}
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
                display: true,
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              x: {
                title: { display: false, text: 'Date' },
              },
              y: {
                title: { display: false, text: 'Count' },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default EventsStatsChart;
