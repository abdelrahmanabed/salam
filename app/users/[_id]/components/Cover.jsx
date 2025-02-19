import { UsersContext } from '../../../contexts/UsersContext';
import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link';

const Cover = () => {
 
const { user, userLoading } = useContext(UsersContext);

    
  const permissions = user?.permissions
  return (
   userLoading? 'loading':<>
    <div className='relative bg-verylightblue dark:bg-darkbox p-2 py-4 rounded-t-main flex items-center gap-2'>
    <Link className=' top-4 right-4 absolute ' href={`/requests/${user._id}`}><Icon icon="ant-design:setting-filled" width="24" height="24" /></Link>

         
          <div className='rounded-circle relative flex justify-center items-start overflow-hidden w-32 h-32'>
            <img className='w-full min-h-full'  src={`${process.env.NEXT_PUBLIC_API}${user?.image}`} alt={user?.name} />
           
          </div>
  
          <div className='flex-col gap-2 text-darkbluec dark:text-subtextcolor flex'>
            <span className='flex gap-2 font-extrabold text-sm items-center'>
              <Icon icon="tabler:military-rank-filled" className='bg-boxcolor dark:bg-bluecolor rounded-circle p-1' width="35" height="35" /> {user?.role.toUpperCase()}
            </span>
            <span className='flex text-xs sm:text-base items-center gap-2'>
              <Icon icon="icon-park-solid:at-sign" className='bg-boxcolor dark:bg-bluecolor rounded-circle p-1 ml-1' width="26" height="26" />{user?.name}
            </span>
          </div>
        </div>
      {permissions&& <div className='w-full items-center flex gap-2 dark:bg-blackgrey bg-darkbluec text-boxcolor py-4 p-2'>
          <span className='text-xs font-bold text-subtextcolor dark:text-subtextcolor'>Permissions</span>
          {permissions?.tbt && <Icon icon="mdi:talk" className='bg-greencolor rounded-circle p-1' width="26" height="26" />}
          {permissions?.observations && <Icon icon="tabler:eye-filled" className='bg-orangecolor rounded-circle p-1' width="26" height="26" />}
          {permissions?.auditReport && <Icon icon="icon-park-solid:audit" className='bg-bluecolor rounded-circle p-1' width="26" height="26" />}
          {permissions?.drillReport && <Icon icon="fa-solid:star-of-life" className='bg-bluecolor rounded-circle p-1' width="26" height="26" />}
          {permissions?.manhours && <Icon icon="tabler:clock-hour-4-filled" className='bg-bluecolor rounded-circle p-1' width="26" height="26" />}
          {permissions?.abnormalEvents && <Icon icon="icon-park-solid:abnormal" className='bg-redcolor rounded-circle p-1' width="26" height="26" />}
          {permissions?.trainingRecords && <Icon icon="fluent:learning-app-16-filled" className='bg-bluecolor rounded-circle p-1' width="26" height="26" />}
          {permissions?.hseReports && <Icon icon="mingcute:safety-certificate-fill" className='bg-bluecolor rounded-circle p-1' width="26" height="26" />}
        </div>}
        <div className='bg-darkbluec mb-4 dark:bg-blackgrey justify-evenly flex gap-4 rounded-b-main p-4 flex-wrap'>
          <span className='flex items-center gap-1 bg-boxcolor dark:bg-darkbox p-2 rounded-full'>
            <Icon className="text-2xl bg-orangecolor p-1 rounded-circle text-subtextcolor" icon="weui:eyes-on-filled" /> {user?.observations.length}
          </span>
          <span className='flex items-center bg-boxcolor dark:bg-darkbox p-2 rounded-full gap-1'>
            <Icon className="text-2xl bg-redcolor p-1 rounded-circle text-subtextcolor" icon="icon-park-solid:abnormal" /> {user.abnormalEvents.length}
          </span>
          <span className='flex items-center bg-boxcolor dark:bg-darkbox p-2 rounded-full gap-1'>
            <Icon className="text-2xl bg-greencolor p-1 rounded-circle text-subtextcolor" icon="mdi:talk" /> {user.tbts.length}
          </span>
          <span className='flex items-center bg-boxcolor dark:bg-darkbox p-2 rounded-full gap-1'>
            <Icon className="text-2xl bg-bluecolor p-1 rounded-circle text-subtextcolor" icon="tabler:clock-hour-4-filled" /> {user.manhours.length}
          </span>
          <span className='flex items-center gap-1 dark:bg-darkbox bg-boxcolor p-2 rounded-full'>
            <Icon className="text-2xl bg-maincolor p-1 rounded-circle text-subtextcolor" icon="icon-park-solid:audit" /> {user.hseReports.length}
          </span>
          <span className='flex items-center gap-1 dark:bg-darkbox bg-boxcolor p-2 rounded-full'>
            <Icon className="text-2xl bg-maincolor p-1 rounded-circle text-subtextcolor" icon="fluent:learning-app-16-filled" /> {user.trainingRecords.length}
          </span>
          <span className='flex items-center gap-1 dark:bg-darkbox bg-boxcolor p-2 rounded-full'>
            <Icon className="text-2xl bg-maincolor p-1 rounded-circle text-subtextcolor" icon="fa-solid:star-of-life" /> {user.drillReports.length}
          </span>
          <span className='flex items-center gap-1 dark:bg-darkbox bg-boxcolor p-2 rounded-full'>
            <Icon className="text-2xl bg-maincolor p-1 rounded-circle text-subtextcolor" icon="mingcute:safety-certificate-fill" /> {user.hseReports.length}
          </span>
        </div>
       </>  )
  }
  
  export default Cover