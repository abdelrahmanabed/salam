'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import axios from 'axios';
import { usePathname } from 'next/navigation';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const pathname = usePathname();
    const id = pathname.split('/')[2]; // استخراج ID المستخدم من الـ URL

    // جلب جميع المستخدمين
    const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/users/all`);
            return data;
        },
        staleTime: 300000, // البيانات تبقى صالحة لمدة 5 دقائق
    });

    // جلب بيانات المستخدم المحدد
    const { data: user, isLoading: userLoading, error: userError } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/users/${id}`);
            return data;
        },
        enabled: !!id, // لا يتم تشغيل الاستعلام إذا لم يكن هناك ID
        staleTime: 300000,
    });

    // تحديث بيانات المستخدمين
    const refreshUsers = () => queryClient.invalidateQueries(['users']);
    const refreshUser = () => queryClient.invalidateQueries(['user', id]);

    // تحديث بيانات المستخدم محليًا
    const setUser = (newUserData) => queryClient.setQueryData(['user', id], newUserData);

    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_API}`);

        socket.on('userUpdated', refreshUser);
        socket.on('usersUpdated', refreshUsers);

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <UsersContext.Provider value={{
            users,
            user,
            usersLoading,
            userLoading,
            usersError,
            userError,
            refreshUsers,
            refreshUser,
            setUser,
        }}>
            {children}
        </UsersContext.Provider>
    );
};

