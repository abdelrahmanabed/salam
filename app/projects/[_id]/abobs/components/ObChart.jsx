import React, { useContext, useMemo } from 'react';
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

const observationChart = (props) => {
  const { project } = useContext(ProjectsContext);
  const allObservationTypes = [
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
  
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(today.getDate() - offset);
  
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const projectStartDate = new Date(project.startDate);

  const filterObservationsByType = (calendar, startDate, endDate, observationType) => {
    let count = 0;
    calendar.forEach(year => {
      year.months.forEach(month => {
        month.weeks.forEach(week => {
          week.days.forEach(day => {
            if (day && day.date) {
              const dayDate = new Date(day.date);
              if (dayDate >= startDate && dayDate <= endDate) {
                // Add null check for observations
                const observations = day.observations || [];
                count += observations.filter(obs => obs && obs.type === observationType).length;
              }
            }
          });
        });
      });
    });
    return count;
  };

  const getTop7Types = (startDate) => {
    const typeCounts = allObservationTypes.map(type => ({
      type,
      count: filterObservationsByType(project.calendar, startDate, today, type)
    }));
    
    typeCounts.sort((a, b) => b.count - a.count);
    
    const top7 = typeCounts.slice(0, 7);
    const others = typeCounts.slice(7).reduce((sum, item) => sum + item.count, 0);
    
    return {
      types: [...top7.map(item => item.type), "Others"],
      counts: [...top7.map(item => item.count), others]
    };
  };

  const getData = (startDate) => {
    const { types, counts } = getTop7Types(startDate);
    return counts;
  };

  const { types } = getTop7Types(projectStartDate);

  const data = {
    labels: types,
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
          '#FF4C4Caa',
          '#808080aa'
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
          '#FF4C4Ccc',
          '#808080cc'
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
          '#FF4C4Cdd',
          '#808080dd'
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
          '#FF4C4C',
          '#808080'
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
    cutout: '10%',
    radius: '90%',
    spacing: 0
  };

  return (
    <div className={`${props.className} bg-boxcolor  dark:bg-blackgrey rounded-main w-full`}>
      <div className="h-[400px] w-full">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default observationChart;