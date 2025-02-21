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
        <span className=' flex w-fit items-center gap-2  text-darkbluea pr-4 dark:text-hovercolor text-xl font-bold bg-bluecolor/40 p-2 rounded-main '>        <Icon icon="mdi-worker" className=' text-darkbluea bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle  pointer-events-none ' width="28" height="28" />
        ALL USERS</span>
      <div className="flex mb-4 flex-col mt-4  md:flex-row gap-4">
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
        
        <div className="flex w-full gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {users.map(user => (
     <Link 
     href={`/users/${user._id}`} 
     key={user._id} 
     className="block  transition-all duration-300 hover:translate-y-1 hover:shadow-xl"
   >
     <div className="overflow-hidden rounded-main bg-boxcolor dark:bg-darkbox border border-border dark:border-darkgrey shadow-md">
       {/* Top Accent Bar */}
       <div className="h-12 bg-gradient-to-r from-maincolor to-cyancolor"></div>
       
       {/* Profile Image Section */}
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
       
       {/* User Info Section */}
       <div className="px-4 pb-6 -mt-4 text-center">
         <h3 className="font-bold text-lg mb-1 text-subcolor text-nowrap dark:text-subtextcolor">{user.name}</h3>
         
         {/* Role Badge */}
        
         
         {/* Project Status */}
         <div className=" py-2 px-2 bg-hovercolor dark:bg-blackgrey rounded-main">
         <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-verylightblue dark:bg-darkbluec text-bluecolor dark:text-lightblue ">
           {user.role}
         </span>           <div className="flex items-center justify-center gap-2 mt-1">
             <div className={`w-2 h-2 rounded-circle ${user.currentProject?.name ? 'bg-greencolor dark:bg-lightgreen' : 'bg-redcolor dark:bg-lightred'}`}></div>
             <p className="font-medium text-subcolor dark:text-subtextcolor">
               {user.currentProject?.name || 'لا يوجد مشروع'}
             </p>
           </div>
         </div>
         
         {/* View Profile Button */}
         <button className="w-full mt-5 py-2 px-4 bg-transparent hover:bg-verylightblue dark:hover:bg-darkbluec text-maincolor dark:text-lightblue border border-maincolor dark:border-bluecolor rounded-main transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-2">
           View Full Profile
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
           </svg>
         </button>
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