import React, { Suspense, useContext, useState } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import { Icon } from '@iconify/react';
import AbnormalCard from './cards/AbnormalCard';

const AbnormalEvents = () => {
  const { project } = useContext(ProjectsContext);
  const [showAll, setShowAll] = useState(false);
  
  // إضافة حالة التصفية
  const [filters, setFilters] = useState({
    status: 'all',
    eventType: 'all',
    startDate: '',
    endDate: '',
    hasReport: 'all' // للتصفية حسب وجود التقارير
  });

 
  // أنواع الأحداث غير الطبيعية المتاحة
  const eventTypes = [
    'Near miss', 'Property Damage', 'Environmental Harm', 
    'First Aid', 'Medical Treatment', 'LTI', 'Fatality'
  ];

  const allAbnormalEvents = project?.calendar
    ?.flatMap(month => month.months)
    ?.flatMap(week => week.weeks)
    ?.flatMap(day => day.days)
    ?.flatMap(day => day.abnormalEvents)
    ?.filter(Boolean) || [];
     
  // Sort events by date in descending order
    const sortedEvents = [...allAbnormalEvents].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
  
  // تصفية الأحداث بناءً على المرشحات
  const filteredEvents = sortedEvents.filter(event => {
    const eventDate = new Date(event.date);
    const matchesStatus = filters.status === 'all' || event.status === filters.status;
    const matchesType = filters.eventType === 'all' || event.eventType === filters.eventType;
    const matchesDateRange = (!filters.startDate || eventDate >= new Date(filters.startDate)) &&
                           (!filters.endDate || eventDate <= new Date(filters.endDate));
    
    const hasAnyReport = event.initialReport || event.investigationReport || 
                        event.actionPlan || event.lessonLearned || event.closeoutReport;
    const matchesReport = filters.hasReport === 'all' || 
                         (filters.hasReport === 'yes' && hasAnyReport) ||
                         (filters.hasReport === 'no' && !hasAnyReport);
    
    return matchesStatus && matchesType && matchesDateRange && matchesReport;
  });

  // Limit to 20 events
  const maxEvents = 20;
  const displayAbnormalEvents = showAll ? filteredEvents.slice(0, maxEvents) : filteredEvents.slice(0, 1);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setShowAll(false); // Reset expand/collapse state when filter changes
  };

  return (
    <div className="w-full dark:text-subtextcolor">
      <h2 className="text-xl font-bold flex justify-between items-center mb-4">
        Abnormal Events 
        <span className='text-sm bg-redcolor px-4 p-1 rounded-full'>
          {filteredEvents.length}
        </span>
      </h2>

      <div className="mb-4 space-y-2">
        <div className="flex flex-col gap-4">
          <div className='flex gap-2'>
            <select 
              className="p-2 w-full rounded-main dark:border-blackgrey border-2 dark:bg-subcolor border-border transition-all hover:border-redcolor focus:border-redcolor"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">كل الحالات</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>

            <select 
              className="p-2 w-full rounded-main dark:border-blackgrey border-2 dark:bg-subcolor border-border transition-all hover:border-redcolor focus:border-redcolor"
              value={filters.eventType}
              onChange={(e) => handleFilterChange('eventType', e.target.value)}
            >
              <option value="all">كل الأنواع</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select 
              className="p-2 w-full rounded-main dark:border-blackgrey border-2 dark:bg-subcolor border-border transition-all hover:border-redcolor focus:border-redcolor"
              value={filters.hasReport}
              onChange={(e) => handleFilterChange('hasReport', e.target.value)}
            >
              <option value="all">كل التقارير</option>
              <option value="yes">لديها تقارير</option>
              <option value="no">بدون تقارير</option>
            </select>
          </div>
          
          <div className="flex gap-2 items-center">
            <input
              type="date"
              className="p-2 w-full rounded-main dark:border-blackgrey border-2 dark:bg-subcolor border-border transition-all hover:border-redcolor focus:border-redcolor"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            <span>إلى</span>
            <input
              type="date"
              className="p-2 w-full rounded-main dark:border-blackgrey border-2 dark:bg-subcolor border-border transition-all hover:border-redcolor focus:border-redcolor"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="relative">
          <ul className={`space-y-4 transition-all duration-500 ease-in-out ${showAll ? 'max-h-[5000px]' : 'max-h-68'} overflow-hidden`}>
            {displayAbnormalEvents.map((event, index) => (
              <Suspense fallback={<div className=' h-52 bg-backgroundcolor dark:bg-blackgrey animate-pulse'></div>}>
    <AbnormalCard key={event._id || index} event={event} index={index} />
    </Suspense>  ))}
          </ul>

          {filteredEvents.length > 1 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-2 px-4 py-2 text-white hover:text-redcolor transition-all duration-300 flex items-center justify-center"
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
        <span className="text-gray-500">لا توجد أحداث تطابق معايير البحث.</span>
      )}
    </div>
  );
};

export default AbnormalEvents;