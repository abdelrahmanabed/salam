'use client'
import { useState, useEffect, useContext, use } from 'react';
import axios from 'axios';
import { ProjectsContext } from '../projects/context/ProjectsContext';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const UsersPage = () => {
  const { projects } = useContext(ProjectsContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    currentProject: '',
    role: ''
  });

  const roles = ['HSE Officer', 'Admin', 'Project Manager']; // أضف المزيد من الأدوار حسب الحاجة

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        search: searchTerm,
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
  }, [currentPage, searchTerm, filters]);

  return (
    <div className="p-4 dark:text-subtextcolor">
        <span className=' text-blackgrey dark:text-hovercolor font-bold '>All Users</span>
      <div className="flex mb-4 flex-col  md:flex-row gap-2">
        {/* Search Input */}
       <div className='relative w-full'> <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-[10px] pl-10  border-2 dark:bg-blackgrey  dark:border-blackgrey rounded-main border-border "
        />
        <Icon icon="iconamoon:search-fill" className=' text-bluecolor bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle absolute pointer-events-none top-1/2 -translate-y-1/2 left-1.5' width="28" height="28" />
        </div>
        
        <div className="flex w-full gap-2">
          {/* Project Filter p5*/}
        
        <div className='w-full relative'> 
        <Icon icon="fa6-solid:helmet-safety" className=' text-bluecolor bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle absolute pointer-events-none top-1/2 -translate-y-1/2 left-1.5' width="28" height="28" />

            <select
            value={filters.currentProject}
            onChange={(e) => setFilters(prev => ({ ...prev, currentProject: e.target.value }))}
            className="w-full p-2 pl-9 py-3 border-2 dark:bg-blackgrey dark:border-blackgrey rounded-main border-border "
            >
                
            <option value="">All Projects</option>
            {projects.map(project => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select></div> 

        <div className='w-full relative'> 
        <Icon icon="tabler:military-rank-filled" className=' text-bluecolor bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle absolute pointer-events-none top-1/2 -translate-y-1/2 left-1.5' width="28" height="28" />

            <select
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
            className="w-full py-3 pl-9 p-2 border-2 dark:bg-blackgrey dark:border-blackgrey rounded-main border-border "
            >
            <option value=""> All Roles </option>
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select></div> 
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
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

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;