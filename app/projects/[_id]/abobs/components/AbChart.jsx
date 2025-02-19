import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale
} from 'chart.js';
import { ProjectsContext } from '../../../context/ProjectsContext';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const NestedDoughnutChart = (props) => {
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
  
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(today.getDate() - offset);
  
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const projectStartDate = new Date(project.startDate);

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

  const getData = (startDate) => {
    return eventTypes.map(type => 
      filterEventsByType(project.calendar, startDate, today, type)
    );
  };

  const data = {
    labels: eventTypes,
    datasets: [
      {
        label: 'Project to Date',
        data: getData(projectStartDate),
        backgroundColor: [
          '#FF8042aa',
          '#00C49Faa',
          '#FFBB28aa',
          '#0088FEaa',
          '#FF6B6Baa',
          '#4C4CFFaa',
          '#FF4C4Caa'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        weight: 0.5
      },
      {
        label: 'Year to Date',
        data: getData(startOfYear),
        backgroundColor: [
          '#FF8042cc',
          '#00C49Fcc',
          '#FFBB28cc',
          '#0088FEcc',
          '#FF6B6Bcc',
          '#4C4CFcc',
          '#FF4C4Ccc'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        weight: 0.5
      },
      {
        label: 'Month to Date',
        data: getData(startOfMonth),
        backgroundColor: [
          '#FF8042dd',
          '#00C49Fdd',
          '#FFBB28dd',
          '#0088FEdd',
          '#FF6B6Bdd',
          '#4C4CFdd',
          '#FF4C4Cdd'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        weight: 0.5
      },
      {
        label: 'Week to Date',
        data: getData(startOfWeek),
        backgroundColor: [
          '#FF8042',
          '#00C49F',
          '#FFBB28',
          '#0088FE',
          '#FF6B6B',
          '#4C4CFF',
          '#FF4C4C'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        weight: 0.5
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          generateLabels: function(chart) {
            const original = ChartJS.overrides.doughnut.plugins.legend.labels.generateLabels;
            const labels = original.call(this, chart);
            
            return labels.map(label => ({
              ...label,
              text: label.text
            }));
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const labelIndex = context.datasetIndex;
            const timeframe = labelIndex === 0 ? 'PTD' : 
                            labelIndex === 1 ? 'YTD' : 
                            labelIndex === 2 ? 'MTD' : 'WTD';
            return `${timeframe} - ${context.label}: ${context.raw}`;
          }
        }
      }
    },
    cutout: '10%',  // تم تغيير هذه القيمة لجعل الرسم البياني مفرغاً من المنتصف
    radius: '90%',   // تم إضافة هذه الخاصية لجعل الدونت أكبر
    spacing: 0      // تم إضافة مسافة بين الحلقات
  };

  return (
    <div className={`${props.className} bg-boxcolor  dark:bg-blackgrey rounded-main w-full`}>
      <div className="h-[400px] w-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default NestedDoughnutChart;