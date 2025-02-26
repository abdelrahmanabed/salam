'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import axios from 'axios';
import { usePathname } from 'next/navigation';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const pathname = usePathname();
    const id = pathname.split('/')[2]; // استخراج ID المشروع من الـ URL

    // جلب جميع المشاريع
    const { data: projects = [], isLoading: projectsLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/projects/all`);
            return data || [];  // تأكد من إرجاع مصفوفة فارغة في حالة عدم وجود بيانات
        },
        staleTime: 300000,
    });

    // جلب المشروع المحدد
    const { data: project, isLoading: projectLoading, error: projectError } = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/projects/${id}`);
            return data;
        },
        enabled: !!id,
        staleTime: 300000,
    });

    // تعريف استعلامات لجميع أنواع التقارير
    // const reportTypes = [
    //     { key: 'tbts', endpoint: 'tbts' },
    //     { key: 'manhours', endpoint: 'manhours' },
    //     { key: 'abnormalEvents', endpoint: 'abnormal-events' },
    //     { key: 'drillReports', endpoint: 'drill-reports' },
    //     { key: 'auditReports', endpoint: 'audit-reports' },
    //     { key: 'trainingRecords', endpoint: 'training-reports' },
    //     { key: 'hseReports', endpoint: 'hse-reports' },
    //     { key: 'observations', endpoint: 'observations' }
    // ];

    // // إنشاء استعلامات لكل نوع من التقارير
    // const reportQueries = {};
    
    // reportTypes.forEach(({ key, endpoint }) => {
    //     const { data = [], isLoading } = useQuery({
    //         queryKey: [key, id],
    //         queryFn: async () => {
    //             if (!id) return [];
    //             const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/${endpoint}/project/${id}`);
    //             return data || [];
    //         },
    //         enabled: !!id,
    //         staleTime: 300000,
    //     });
        
    //     reportQueries[key] = { data, isLoading };
    // });

    // دالة لتحديث المشاريع
    const refreshProjects = () => queryClient.invalidateQueries(['projects']);
    const refreshProject = () => queryClient.invalidateQueries(['project', id]);
    const refreshSProject = (projectId) => queryClient.invalidateQueries(['project', projectId]);

    // دالة لتحديث نوع معين من التقارير للمشروع الحالي
    // const refreshReportType = (reportType) => queryClient.invalidateQueries([reportType, id]);
    
    // دالة لتحديث نوع معين من التقارير لمشروع محدد
    // const refreshProjectReportType = (projectId, reportType) => queryClient.invalidateQueries([reportType, projectId]);
    
    // دالة لتحديث جميع أنواع التقارير للمشروع الحالي
    // const refreshAllReports = () => {
    //     reportTypes.forEach(({ key }) => {
    //         queryClient.invalidateQueries([key, id]);
    //     });
    // };

    useEffect(() => {
        if (!id) return;
        
        const socket = io(`${process.env.NEXT_PUBLIC_API}`);

        // الاستماع لتحديثات المشاريع
        socket.on('projectUpdated', (updatedProject) => {
                refreshSProject(updatedProject._id);
        
        });

        // تسجيل مستمعي الأحداث لكل نوع من التقارير
        // const eventHandlers = {
        //     'tbt': 'tbts',
        //     'manhour': 'manhours',
        //     'abnormalEvent': 'abnormalEvents',
        //     'drillReport': 'drillReports',
        //     'auditReport': 'auditReports',
        //     'trainingRecord': 'trainingRecords',
        //     'hseReport': 'hseReports',
        //     'observation': 'observations'
        // };

        // إضافة مستمعين للأحداث (إنشاء، تحديث، حذف) لكل نوع تقرير
        // Object.entries(eventHandlers).forEach(([eventPrefix, reportType]) => {
        //     ['Created', 'Updated', 'Deleted'].forEach(action => {
        //         const eventName = `${eventPrefix}${action}`;
                
        //         socket.on(eventName, (data) => {
        //             const projectId = data.project || (data.projectId);
                    
        //             if (projectId === id) {
        //                 refreshReportType(reportType);
        //                 refreshProject(); // تحديث المشروع أيضًا لأن التقارير مرتبطة بالمشروع
        //             }
        //         });
        //     });
        // });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    // إنشاء كائن القيم للسياق
    const contextValue = {
        projects,
        project,
        projectsLoading,
        projectLoading,
        projectError,
        refreshProjects,
        refreshProject,
        refreshSProject,
        // refreshReportType,
        // refreshProjectReportType,
        // refreshAllReports,
    };

    // إضافة بيانات التقارير وحالات التحميل للسياق
    // reportTypes.forEach(({ key }) => {
    //     contextValue[key] = reportQueries[key].data;
    //     contextValue[`${key}Loading`] = reportQueries[key].isLoading;
    // });

    return (
        <ProjectsContext.Provider value={contextValue}>
            {children}
        </ProjectsContext.Provider>
    );
};