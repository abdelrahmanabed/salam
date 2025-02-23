'use client'
import React, { Suspense, useContext } from 'react';
import { UsersContext } from '@/app/contexts/UsersContext';
import Link from 'next/link';

const Page = () => {
  const { users } = useContext(UsersContext);
if(!users) {
return( <div className=' flex-col p-4 flex gap-4'>
<div className=' h-8 bg-backgroundcolor dark:bg-blackgrey rounded-main animate-pulse w-24'></div>
<div className=' flex flex-col md:flex-row  gap-4 '>
<div className=' h-20 bg-backgroundcolor dark:bg-blackgrey rounded-main animate-pulse w-full md:w-1/2 lg:w-1/3'></div>
<div className=' h-20 bg-backgroundcolor dark:bg-blackgrey rounded-main animate-pulse w-full md:w-1/2 lg:w-1/3'></div>
<div className=' h-20 bg-backgroundcolor dark:bg-blackgrey rounded-main animate-pulse w-full md:w-1/2 lg:w-1/3'></div>
<div className=' h-20 bg-backgroundcolor dark:bg-blackgrey rounded-main animate-pulse w-full md:w-1/2 lg:w-1/3'></div>
<div className=' h-20 bg-backgroundcolor dark:bg-blackgrey rounded-main animate-pulse w-full md:w-1/2 lg:w-1/3'></div>

</div>

</div>)}
  // تصفية المستخدمين الذين لم يتم التحقق منهم
  const unverifiedUsers = users.filter(user => user.verified === false);

  return (
<Suspense fallback={<div></div>} >
    <div className='p-4 dark:text-subtextcolor'>
      <h1>Unverified Users</h1>
      {users && unverifiedUsers.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unverifiedUsers.map(user => (
                   <Link href={`/users/${user._id}`} key={user._id} className="p-4  rounded-main dark:bg-darkbox  bg-hovercolor">
                   <div className="flex items-center space-x-4">
                     <img
                       src={`${process.env.NEXT_PUBLIC_API}${user.image}` || '/placeholder-avatar.png'}
                       alt={user.name}
                       className="w-16 h-16 rounded-full object-cover"
                     />
                     <div>
                       <h3 className="font-bold">{user.name}</h3>
                       <p className="text-gray-600">{user.role}</p>
                       <p className="text-sm text-gray-500">
                         {user.currentProject?.name || 'لا يوجد مشروع'}
                       </p>
                     </div>
                   </div>
                 </Link>
          ))}
        </div>
      ) : (
        <p>No unverified users found.</p>
      )}
    </div>
</Suspense>
  );
}

export default Page;