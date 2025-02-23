'use client'
import { useState, useEffect, useContext, Suspense, lazy } from 'react';
import axios from 'axios';
import { ProjectsContext } from '../../context/ProjectsContext';
import { UserCardSkeleton } from '@/app/components/Loading';

// Lazy load components
const SearchBar = lazy(() => import('./components/SearchBar'));
const RoleFilter = lazy(() => import('./components/RoleFilters'));
const UserGrid = lazy(() => import('./components/UsersGrid'));
const Pagination = lazy(() => import('./components/Pagination'));

// Loading components for Suspense
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const ProjectUsersPage = () => {
  const { project } = useContext(ProjectsContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    role: ''
  });

  const fetchUsers = async () => {
    if (!project?._id) return;

    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        currentProject: project._id,
        ...filters
      });

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/users?${params}`);
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, filters, project]);

  if (!project) {
    return;
  }

  return (
    <div className="p-4 dark:text-subtextcolor">
    <Suspense fallback={<div className='h-2 rounded-full bg-backgroundcolor dark:bg-blackgrey animate-pulse'></div>}>  <span className='text-blackgrey dark:text-hovercolor font-bold'>
        {project.name} Users
      </span>  </Suspense>  
      
      <div className="flex my-4 flex-col md:flex-row gap-2">
        <Suspense fallback={<div className=' bg-backgroundcolor animate-pulse dark:bg-blackgrey rounded-main h-8 w-100'></div>}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Suspense>
        
        <Suspense fallback={<div className=' bg-backgroundcolor animate-pulse dark:bg-blackgrey rounded-main h-8 w-100'></div>}>
          <RoleFilter filters={filters} setFilters={setFilters} />
        </Suspense>
      </div>

      <Suspense fallback={<UserCardSkeleton />}>
        <UserGrid users={users} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
        />
      </Suspense>
    </div>
  );
};

export default ProjectUsersPage;