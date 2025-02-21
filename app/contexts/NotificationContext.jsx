'use client';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ToastNotification from '../components/toast';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/notifications`);
                setNotifications(data);
                setUnreadCount(data.filter(n => !n.isRead).length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [ toasts]);
    useEffect(() => {
      

        const socket = io(`${process.env.NEXT_PUBLIC_API}`);
        socket.on('newNotification', (notification) => {
            setUnreadCount(prev => prev + 1);

            const toastId = Date.now();
            setToasts(prev => [...prev, {
                id: toastId,
                message: notification.message,
                type:notification.type
            }]);
        });

        return () => socket.disconnect();
    }, []);
    const removeToast = (toastId) => {
        setToasts(prev => prev.filter(toast => toast.id !== toastId));
    };

    const markAsRead = async (notificationIds) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API}/api/notifications/mark-read`, {
                notificationIds
            });
            setUnreadCount(prev => prev - notificationIds.length);
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    return (
        <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead }}>
            {toasts.length > 0 && (
                <div className="fixed top-0 right-0 z-50">
                    {toasts.map(toast => (
                        <ToastNotification
                            key={toast.id}
                            message={toast.message}
                            onClose={() => removeToast(toast.id)}
                            type={toast.type} // Make sure this is being passed

                        />
                    ))}
                </div>
            )}
            {children}
        </NotificationsContext.Provider>
    );
};