import Link from 'next/link'
import React, { Suspense, useContext, useMemo } from 'react'
import { ProjectsContext } from '../../context/ProjectsContext'
import { Icon } from '@iconify/react'

const ManHoursStats = (props) => {
    const { project } = useContext(ProjectsContext)

    // دالة لتصفية السجلات حسب التاريخ
    const filterManhours = (startDate) => {
        let manhours = []
        project.calendar?.forEach(year => {
            year.months.forEach(month => {
                month.weeks.forEach(week => {
                    week.days.forEach(day => {
                        if (day.manhours && new Date(day.manhours.date) >= startDate) {
                            manhours.push(day.manhours);
                          }
                    })
                })
            })
        })
        return manhours
    }

    // دالة لحساب بداية الأسبوع الحالي
    const getStartOfWeek = () => {
        const today = new Date()
        const dayOfWeek = today.getDay() || 7  // الأحد = 7
        today.setDate(today.getDate() - dayOfWeek + 1)
        today.setHours(0, 0, 0, 0)
        return today
    }

    // دالة لحساب بداية الشهر
    const getStartOfMonth = () => {
        const today = new Date()
        return new Date(today.getFullYear(), today.getMonth(), 1)
    }

    // دالة لحساب بداية السنة
    const getStartOfYear = () => {
        const today = new Date()
        return new Date(today.getFullYear(), 0, 1)
    }

    const stats = useMemo(() => {
        const startOfWeek = getStartOfWeek()
        const startOfMonth = getStartOfMonth()
        const startOfYear = getStartOfYear()
        const projectStartDate = new Date(project.startDate)

        const periods = {
            WTD: filterManhours(startOfWeek),
            MTD: filterManhours(startOfMonth),
            YTD: filterManhours(startOfYear),
            PTD: filterManhours(projectStartDate)
        }

        const calculateTotals = (entries) => {
            let manpower = 0
            let manhours = 0
            let safeManhours = 0
            entries.forEach(entry => {
                manpower += entry.manpower
                manhours += entry.totalManhours
                safeManhours += entry.totalSafeManhours
            })
            return { manpower, manhours, safeManhours }
        }

        return {
            WTD: calculateTotals(periods.WTD),
            MTD: calculateTotals(periods.MTD),
            YTD: calculateTotals(periods.YTD),
            PTD: calculateTotals(periods.PTD),
        }
    }, [project])

    return (
        <Suspense fallback={<div/>}>
        <Link href={'/'} className={`${ props.className} group gap-2 p-2   dark:bg-blackgrey  bg-boxcolor  rounded-main duration-300  w-full  justify-between flex`}>
            {/* أيقونة والفترات */}
            <div className='flex   items-center flex-col'>
                <Icon icon='fluent:people-team-20-filled' className='text-xl sm:text-2xl text-maincolor' />
                <div className=' font-bold flex flex-col sm:text-base text-darkbluec dark:text-subtextcolor gap-2 text-sm py-2 '>
                    <span className='  p-1 rounded-main'>WTD</span>
                    <span className='  p-1 rounded-main'>MTD</span>
                    <span className=' p-1 rounded-main'>YTD</span>
                    <span className=' p-1 rounded-main'>PTD</span>
                </div>
            </div>

            {/* Man Power */}
            <div className='flex items-center w-full  flex-col'>
                <span className=' text-darkbluec dark:text-subtextcolor  sm:text-base bg-very p-1lightblue  ml-2   font-bold text-sm'>Manpower</span>
                <div className='flex flex-col font-bold text-darkbluec  sm:text-base text-sm gap-2 w-full rounded-main items-center py-2'>
                    <span className='text-center w-full bg-lightblue dark:text-subtextcolor dark:bg-maincolor p-1 rounded-main'>{stats.WTD.manpower}</span>
                    <span className='text-center  w-full bg-lightblue dark:text-subtextcolor dark:bg-maincolor  p-1 rounded-main'>{stats.MTD.manpower}</span>
                    <span className='text-center  w-full bg-lightblue dark:text-subtextcolor dark:bg-maincolor p-1 rounded-main'>{stats.YTD.manpower}</span>
                    <span className='text-center  w-full bg-lightblue dark:text-subtextcolor dark:bg-maincolor  p-1 rounded-main'>{stats.PTD.manpower}</span>
                </div>
            </div>

            {/* Man Hours */}
            <div className='flex  items-center flex-col overflow-hidden w-full  duration-300 text-center   '>
                <span className='text-sm  dark:text-subtextcolor  text-darkbluec  sm:text-base font-bold text-center'>ManHours</span>
                <div className='flex font-bold text-darkbluec flex-col sm:text-base gap-2 items-center w-full text-sm rounded-main py-2'>
                    <span className='text-center  w-full  dark:bg-maincolor dark:text-subtextcolor bg-lightblue p-1 rounded-main'>{stats.WTD.manhours}</span>
                    <span className='text-center  w-full  dark:bg-maincolor dark:text-subtextcolor bg-lightblue p-1 rounded-main'>{stats.MTD.manhours}</span>
                    <span className='text-center  w-full  dark:bg-maincolor dark:text-subtextcolor bg-lightblue p-1 rounded-main'>{stats.YTD.manhours}</span>
                    <span className='text-center  w-full  dark:bg-maincolor dark:text-subtextcolor bg-lightblue p-1 rounded-main'>{stats.PTD.manhours}</span>
                </div>
            </div>

            {/* Safe Man Hours */}
            <div className='flex items-center flex-col overflow-hidden w-full  duration-300  '>
                <span className='text-sm dark:text-subtextcolor   text-darkbluec font-bold sm:text-base  text-center '>SafeHours</span>
                <div className='flex font-bold text-darkbluec flex-col sm:text-base w-full items-center text-sm gap-2 rounded-main py-2'>
                    <span className='text-center  dark:bg-maincolor  dark:text-subtextcolor  w-full bg-lightblue p-1 rounded-main'>{stats.WTD.safeManhours}</span>
                    <span className='text-center   dark:bg-maincolor dark:text-subtextcolor w-full bg-lightblue p-1 rounded-main'>{stats.MTD.safeManhours}</span>
                    <span className='text-center   dark:bg-maincolor dark:text-subtextcolor w-full bg-lightblue p-1 rounded-main'>{stats.YTD.safeManhours}</span>
                    <span className='text-center   dark:bg-maincolor dark:text-subtextcolor w-full bg-lightblue p-1 rounded-main'>{stats.PTD.safeManhours}</span>
                </div>
            </div>
        </Link></Suspense>
    )
}

export default ManHoursStats
