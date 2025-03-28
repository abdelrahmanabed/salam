'use client'
import { createContext, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { usePathname } from 'next/navigation';
import axios from 'axios';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const id = pathname.split('/')[2]; // استخراج ID المستخدم من الـ URL

  const { data: admin, isLoading, error } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/admins/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        cache: 'no-store' // Ensure fresh data each request

      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token might be expired, remove it
          localStorage.removeItem('token');
          return null;
        }
        throw new Error('Failed to fetch user data');
      }

      return response.json();
    },
    suspense: true, // مهم: تفعيل خاصية suspense
    retry: 1,
    staleTime: 300000, // 5 minutes
  });

  const { data: theAdmin, isLoading: adminLoading, error: adminError } = useQuery({
    queryKey: ['theAdmin', id],
    queryFn: async () => {
        if (!id) return null;
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/admins/${id}`);
        return data;
    },
    enabled: !!id, // لا يتم تشغيل الاستعلام إذا لم يكن هناك ID
    staleTime: 300000,
});


  const refreshAdmin = () => {
    queryClient.invalidateQueries(['admin']);
  };

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.setQueryData(['admin'], null);
    queryClient.invalidateQueries();
  };

  const setAdmin = (newUserData) => {
    queryClient.setQueryData(['admin'], newUserData);
  };
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API}`);
    
    socket.on('adminUpdated', () => {
      // Check if the updated project is the current one
      refreshAdmin()
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <AdminContext.Provider value={{
      admin,
      loading: isLoading,
      error,
      refreshAdmin,
      logout,
      setAdmin,
      theAdmin,
      adminLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};