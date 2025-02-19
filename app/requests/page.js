'use client'
import React, { useContext } from 'react';
import { UsersContext } from '@/app/contexts/UsersContext';
import Link from 'next/link';

const Page = () => {
  const { users } = useContext(UsersContext);

  // تصفية المستخدمين الذين لم يتم التحقق منهم
  const unverifiedUsers = users.filter(user => user.verified === false);

  return (
    <div className='p-4 dark:text-subtextcolor'>
      <h1>Unverified Users</h1>
      {unverifiedUsers.length > 0 ? (
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
  );
}

export default Page;