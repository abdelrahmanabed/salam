'use client';
import { Icon } from '@iconify/react';
import React, { useContext, useState, useEffect } from 'react';
import { NotificationsContext } from '../contexts/NotificationContext';
import NotificationItem from './Notification';
import { useAdmin } from '../contexts/AdminContext';

const Notifications = () => {
    const { notifications, unreadCount, markAsRead } = useContext(NotificationsContext);
    const [isOpen, setIsOpen] = useState(false);
    const [displayedNotifications, setDisplayedNotifications] = useState([]);
    const { admin } = useAdmin(); // Get current user

    // Update displayed notifications whenever the notifications list changes
    useEffect(() => {
        setDisplayedNotifications(notifications);
    }, [notifications]);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        
        if (newState && admin && unreadCount > 0) {
            const unreadIds = notifications
                .filter(notification => 
                    !notification.readByAdmin || 
                    !notification.readByAdmin.includes(admin?._id)
                )
                .map(notification => notification._id);
                
            if (unreadIds.length > 0) {
                markAsRead(unreadIds);
            }
        }
    };
    return (
        <>
            <button 
                className="fixed right-[24px] bottom-[90px] bg-bluecolor text-darkbluec shadow-md p-2 rounded-circle z-40"
                onClick={handleToggle}
            >
                <Icon icon="basil:notification-solid" width="30" height="30" />
                {unreadCount > 0 && (
                    <span className="absolute text-subtextcolor bg-redcolor   -top-2 -right-2  text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed bg-backgroundcolor  dark:bg-darkbox rounded-main right-[24px] bottom-[150px] w-80 max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4 z-50 scrollbar-hide">
                    <h3 className="text-lg  dark:text-subtextcolor font-semibold mb-4">Notifications</h3>
                    {displayedNotifications.length > 0 ? (
                        displayedNotifications.map(notification => (
                            <NotificationItem
                                key={notification?._id}
                                notification={notification}
                                onMarkAsRead={() => handleMarkAsRead(notification._id)}
                            />
                        ))
                    ) : (
                        <p className="text-center dark:text-subtextcolor text-gray-500">No notifications</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Notifications;