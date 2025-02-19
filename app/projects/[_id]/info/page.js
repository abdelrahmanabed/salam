'use client'
import { useContext } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext';
import { Icon } from '@iconify/react';

const ProjectInfoPage = () => {
  const { project } = useContext(ProjectsContext);

  if (!project) {
    return <div className="p-4">Loading project...</div>;
  }

  // Calculate total reports
  const calculateTotals = () => {
    let totals = {
      tbts: 0,
      abnormalEvents: 0,
      hseReports: 0,
      observations: 0,
      auditReports: 0,
      manhours: 0,
      trainingRecords: 0,
      drillReports: 0
    };

    project.calendar?.forEach(year => {
      year.months?.forEach(month => {
        month.weeks?.forEach(week => {
          week.days?.forEach(day => {
            totals.tbts += day.tbts?.length || 0;
            totals.abnormalEvents += day.abnormalEvents?.length || 0;
            totals.hseReports += day.hseReports?.length || 0;
            totals.observations += day.observations?.length || 0;
            totals.auditReports += day.auditReports?.length || 0;
            totals.manhours += day.manhours?.length || 0;
            totals.trainingRecords += day.trainingRecords?.length || 0;
            totals.drillReports += day.drillReports?.length || 0;
          });
        });
      });
    });

    return totals;
  };

  const totals = calculateTotals();

  const reportCards = [
    { icon: "mdi:clipboard-text", title: "TBTs", count: totals.tbts, color: "text-red-500" },
    { icon: "mdi:alert-circle", title: "Abnormal Events", count: totals.abnormalEvents, color: "text-orange-500" },
    { icon: "mdi:file-document", title: "HSE Reports", count: totals.hseReports, color: "text-blue-500" },
    { icon: "mdi:eye", title: "Observations", count: totals.observations, color: "text-green-500" },
    { icon: "mdi:clipboard-check", title: "Audit Reports", count: totals.auditReports, color: "text-purple-500" },
    { icon: "mdi:clock", title: "Manhours", count: totals.manhours, color: "text-yellow-500" },
    { icon: "mdi:school", title: "Training Records", count: totals.trainingRecords, color: "text-indigo-500" },
    { icon: "mdi:fire", title: "Drill Reports", count: totals.drillReports, color: "text-pink-500" }
  ];

  return (
    <div className="p-4 dark:text-subtextcolor">
      {/* Project Header */}
      <div className="mb-6 p-6 rounded-main dark:bg-darkbox bg-hovercolor">
        <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p><span className="font-semibold">Location:</span> {project.location.address}</p>
            <p><span className="font-semibold">Client:</span> {project.client}</p>
            <p><span className="font-semibold">Type:</span> {project.type}</p>
            <p><span className="font-semibold">Duration:</span> {project.duration} days</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-semibold">Start Date:</span> {new Date(project.startDate).toLocaleDateString()}</p>
            <p><span className="font-semibold">End Date:</span> {new Date(project.endDate).toLocaleDateString()}</p>
            <p><span className="font-semibold">Scope of Work:</span> {project.scopeOfWork}</p>
            <p><span className="font-semibold">Subcontractors:</span> {project.subcontractors?.join(', ') || 'None'}</p>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <h2 className="text-xl font-bold mb-4">Reports Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCards.map((card, index) => (
          <div key={index} className="p-4 rounded-main dark:bg-darkbox bg-hovercolor">
            <div className="flex items-center space-x-3">
              <Icon 
                icon={card.icon} 
                className={`${card.color} bg-backgroundcolor dark:bg-darkbox p-2 rounded-circle`} 
                width="40" 
                height="40"
              />
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-2xl font-bold">{card.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectInfoPage;