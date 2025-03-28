import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link';
import { useAdmin } from '@/app/contexts/AdminContext';

const Cover = () => {
 
const { theAdmin,  adminLoading } =  useAdmin();
console.log(  'theadmin', theAdmin)
    
  return (
    adminLoading? 'loading':<>
    <div className='relative bg-verylightblue dark:bg-darkbox p-2 py-4 rounded-t-main flex items-center gap-2'>
    <Link className=' top-4 right-4 absolute ' href={`/requests/${theAdmin._id}`}><Icon icon="ant-design:setting-filled" width="24" height="24" /></Link>

         
         
  
          <div className='flex-col gap-2 text-darkbluec dark:text-subtextcolor flex'>
            <span className='flex gap-2 font-extrabold text-sm items-center'>
              <Icon icon="tabler:military-rank-filled" className='bg-boxcolor dark:bg-bluecolor rounded-circle p-1' width="35" height="35" /> {theAdmin?.role.toUpperCase()}
            </span>
            <span className='flex text-xs sm:text-base items-center gap-2'>
              <Icon icon="icon-park-solid:at-sign" className='bg-boxcolor dark:bg-bluecolor rounded-circle p-1 ml-1' width="26" height="26" />{theAdmin?.name}
            </span>
          </div>
        </div>
   
        <div className='bg-darkbluec mb-4 dark:bg-blackgrey justify-evenly flex gap-4 rounded-b-main p-4 flex-wrap'>
          <span className='flex items-center gap-1 bg-boxcolor dark:bg-darkbox p-2 rounded-full'>
            <Icon className="text-2xl bg-orangecolor p-1 rounded-circle text-subtextcolor" icon="weui:eyes-on-filled" /> {theAdmin?.observations.length}
          </span>
          <span className='flex items-center bg-boxcolor dark:bg-darkbox p-2 rounded-full gap-1'>
            <Icon className="text-2xl bg-redcolor p-1 rounded-circle text-subtextcolor" icon="icon-park-solid:abnormal" /> {theAdmin.abnormalEvents.length}
          </span>
          <span className='flex items-center bg-boxcolor dark:bg-darkbox p-2 rounded-full gap-1'>
            <Icon className="text-2xl bg-greencolor p-1 rounded-circle text-subtextcolor" icon="mdi:talk" /> {theAdmin.tbts.length}
          </span>
          <span className='flex items-center bg-boxcolor dark:bg-darkbox p-2 rounded-full gap-1'>
            <Icon className="text-2xl bg-bluecolor p-1 rounded-circle text-subtextcolor" icon="tabler:clock-hour-4-filled" /> {theAdmin.manhours.length}
          </span>
          <span className='flex items-center gap-1 dark:bg-darkbox bg-boxcolor p-2 rounded-full'>
            <Icon className="text-2xl bg-maincolor p-1 rounded-circle text-subtextcolor" icon="icon-park-solid:audit" /> {theAdmin.hseReports.length}
          </span>
          <span className='flex items-center gap-1 dark:bg-darkbox bg-boxcolor p-2 rounded-full'>
            <Icon className="text-2xl bg-maincolor p-1 rounded-circle text-subtextcolor" icon="fluent:learning-app-16-filled" /> {theAdmin.trainingRecords.length}
          </span>
          <span className='flex items-center gap-1 dark:bg-darkbox bg-boxcolor p-2 rounded-full'>
            <Icon className="text-2xl bg-maincolor p-1 rounded-circle text-subtextcolor" icon="fa-solid:star-of-life" /> {theAdmin.drillReports.length}
          </span>
          <span className='flex items-center gap-1 dark:bg-darkbox bg-boxcolor p-2 rounded-full'>
            <Icon className="text-2xl bg-maincolor p-1 rounded-circle text-subtextcolor" icon="mingcute:safety-certificate-fill" /> {theAdmin.hseReports.length}
          </span>
        </div>
       </>  )
  }
  
  export default Cover