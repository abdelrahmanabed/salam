'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ProjectsContext } from './ProjectsContext'; // استيراد السياق الخاص بالمشروع

// إنشاء السياق
export const TodayContext = createContext(null);

// موفر السياق
export const TodayProvider = ({ children }) => {
    const [todayData, setTodayData] = useState(null);
    const { project, loading } = useContext(ProjectsContext); // الحصول على البيانات من ProjectsContext

  const getTodayData = () => {
    if (!project || !project.calendar) return null;

    const today = new Date();
    for (const year of project.calendar) {
      for (const month of year.months) {
        for (const week of month.weeks) {
          for (const day of week.days) {
            if (new Date(day.date).toDateString() === today.toDateString()) {
              return { ...day, year: year.year, month: month.month, week: week.week };
            }
          }
        }
      }
    }
    return null;
  };

  useEffect(() => {
    
       // الانتظار حتى يتم تحميل بيانات المشروع
       if (project && !loading) {
        const data = getTodayData();
        setTodayData(data); // تحديث اليوم
      }
    }, [project, loading]);

  return <TodayContext.Provider value={todayData || {}}>{children}</TodayContext.Provider>; // تأكد من إرجاع قيمة غير null
};

// دالة استخدام السياق

