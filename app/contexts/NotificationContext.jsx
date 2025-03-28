'use client';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ToastNotification from '../components/toast';
import { jwtDecode } from 'jwt-decode';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [toasts, setToasts] = useState([]);
    const [adminId, setAdminId] = useState(null);
    useEffect(() => {
        const getAdminFromToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setAdminId(decoded.id || decoded._id);
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            }
        };

        getAdminFromToken();
    }, []);

  
    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
    if (!token) {
        setNotifications([]);
        setUnreadCount(0);
        return;
    }
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/notifications`);
                const decoded = jwtDecode(token);
                const adminId = decoded.id || decoded._id;
                
            // فلترة الإشعارات حسب المشروع
                setNotifications(data);
                const unreadNotifications = data.filter(notification => {
                    return !notification.readByAdmin || !notification.readByAdmin.includes(adminId);
                });
                setUnreadCount(unreadNotifications.length);
                console.log('object unread',unreadCount);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setNotifications([]);
                setUnreadCount(0); 
            }
        };
        if (adminId) {
            fetchNotifications();
        }
    }, [toasts, adminId]);

    useEffect(() => {
      

        const socket = io(`${process.env.NEXT_PUBLIC_API}`);
        const token = localStorage.getItem('token');

        if (!token) return;
        
        const decoded = jwtDecode(token);
        const adminId = decoded.id || decoded._id;
        
       
        socket.on('newNotification', (notification) => {
            setNotifications(prev => [notification, ...prev]);

            if (!notification.readByAdmin || !notification.readByAdmin.includes(adminId)) {
                setUnreadCount(prev => prev + 1);
            }
            
            const toastId = Date.now();
            setToasts(prev => [...prev, {
                id: toastId,
                message: notification.message,
                type:notification.type
            }]);
        });

        return () => socket.disconnect();
    }, [adminId]);
    const removeToast = (toastId) => {
        setToasts(prev => prev.filter(toast => toast.id !== toastId));
    };

    const markAsRead = async (notificationIds) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/notifications/mark-read-admin`, 
                { notificationIds },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              setNotifications(prev => 
                prev.map(notification => 
                  notificationIds.includes(notification._id) 
                    ? { ...notification, readByAdmin: [...(notification.readByAdmin || []), jwtDecode(token).id] }
                    : notification
                )
              );
              
              // Update unread count
              setUnreadCount(prev => Math.max(0, prev - notificationIds.length));
              
              return data;
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