'use client';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const UserCard = ({ user }) => {
    return (
        <Link href={`/users/${user._id}`} className="block transition-all duration-300">
            <div className="overflow-hidden rounded-main bg-boxcolor dark:bg-darkbox border border-border dark:border-darkgrey">
                <div className="h-12 bg-gradient-to-r from-maincolor to-cyancolor"></div>
                <div className="flex justify-center -mt-1">
                    <div className="relative -top-8">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-maincolor via-bluecolor to-cyancolor blur-sm opacity-70"></div>
                        <img
                            src={`${process.env.NEXT_PUBLIC_API}${user.image}` || '/placeholder-avatar.png'}
                            alt={user.name}
                            className="relative w-40 h-40 rounded-full object-cover border-4 border-boxcolor dark:border-darkbox shadow-lg"
                        />
                    </div>
                </div>
                <div className="px-4 pb-6 -mt-4 text-center">
                    <h3 className="font-bold text-lg mb-1 text-subcolor text-nowrap dark:text-subtextcolor">{user.name}</h3>
                    <div className="py-2 px-2 bg-hovercolor dark:bg-blackgrey rounded-main">
                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-verylightblue dark:bg-darkbluec text-bluecolor dark:text-lightblue">
                            {user.role}
                        </span>
                        <div className="flex items-center justify-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-circle ${user.currentProject?.name ? 'bg-greencolor dark:bg-lightgreen' : 'bg-redcolor dark:bg-lightred'}`}></div>
                            <p className="font-medium text-subcolor dark:text-subtextcolor">
                                {user.currentProject?.name || 'لا يوجد مشروع'}
                            </p>
                        </div>
                    </div>
                    <button className="w-full mt-5 py-2 px-4 bg-transparent hover:bg-verylightblue dark:hover:bg-darkbluec text-maincolor dark:text-lightblue border border-maincolor dark:border-bluecolor rounded-main transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-2">
                        View Full Profile
                        <Icon icon="ep:arrow-right-bold" width="24" height="24" />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default UserCard;