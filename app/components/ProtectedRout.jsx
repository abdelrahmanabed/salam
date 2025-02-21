'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/login');
          return;
        }

        try {
          // Verify token with backend
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (!response.data.isAuthenticated) {
            localStorage.removeItem('token');
            router.push('/login');
          }
        } catch (error) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div className=' h-screen dark:bg-subcolor bg-darkbluec flex-1 justify-center items-center flex'><div className='loader '></div></div>  // يمكنك استبدال هذا بأي شكل تحميل تفضله
  }

  return children;
};

export default ProtectedRoute;