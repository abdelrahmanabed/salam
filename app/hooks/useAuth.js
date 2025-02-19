"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const usAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    // التحقق من التوكن مع الـ Backend
    const verifyToken = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token'); // حذف التوكن غير الصالح
        router.push('/login'); // تحويل المستخدم
      }
    };

    verifyToken();
  }, []);
};

export default usAuth;
