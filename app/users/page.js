
// pages/UsersPage.js
'use client';
import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import axios from 'axios';
import { ProjectsContext } from '../projects/context/ProjectsContext';
import { Icon } from '@iconify/react';
import { UserCardSkeleton } from '../components/Loading';

// صحيح lazy loading للمكون
const UserCard = lazy(() => import('./components/usercard'));

// مكونات الفلترة
const FilterSection = ({ searchTerm, setSearchTerm, filters, setFilters, projects, roles }) => (
    <div className="flex mb-4 flex-col mt-4 md:flex-row gap-4">
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-[10px] pl-10 border-2 dark:bg-blackgrey dark:border-blackgrey rounded-main border-border"
            />
            <Icon 
                icon="iconamoon:search-fill" 
                className="text-bluecolor bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle absolute pointer-events-none top-1/2 -translate-y-1/2 left-1.5" 
                width="28" 
                height="28" 
            />
        </div>
        
        <div className="flex w-full gap-4">
            <div className="w-full relative">
                <Icon 
                    icon="fa6-solid:helmet-safety" 
                    className="text-bluecolor bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle absolute pointer-events-none top-1/2 -translate-y-1/2 left-1.5" 
                    width="28" 
                    height="28" 
                />
                <select
                    value={filters.currentProject}
                    onChange={(e) => setFilters(prev => ({ ...prev, currentProject: e.target.value }))}
                    className="w-full p-2 pl-9 py-3 border-2 dark:bg-blackgrey dark:border-blackgrey rounded-main border-border"
                >
                    <option value="">All Projects</option>
                    {projects.map(project => (
                        <option key={project._id} value={project._id}>{project.name}</option>
                    ))}
                </select>
            </div>
            <div className="w-full relative">
                <Icon 
                    icon="tabler:military-rank-filled" 
                    className="text-bluecolor bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle absolute pointer-events-none top-1/2 -translate-y-1/2 left-1.5" 
                    width="28" 
                    height="28" 
                />
                <select
                    value={filters.role}
                    onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full py-3 pl-9 p-2 border-2 dark:bg-blackgrey dark:border-blackgrey rounded-main border-border"
                >
                    <option value="">All Roles</option>
                    {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
        </div>
    </div>
);

// الصفحة الرئيسية
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

    const roles = ['HSE Officer', 'Admin', 'Project Manager'];

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
            <span className="flex w-fit items-center gap-2 text-darkbluea pr-4 dark:text-hovercolor text-xl font-bold bg-bluecolor/40 p-2 rounded-main">
                <Icon 
                    icon="mdi-worker" 
                    className="text-darkbluea bg-backgroundcolor dark:text-subtextcolor dark:bg-darkbox/50 p-1 rounded-circle pointer-events-none" 
                    width="28" 
                    height="28" 
                />
                ALL USERS
            </span>
<Suspense fallback={<div className='h-8 bg-backgroundcolor dark:bg-blackgrey rounded-main'></div>}>
            <FilterSection 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
                projects={projects}
                roles={roles}
            />
</Suspense>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <Suspense fallback={<UserCardSkeleton />}>

                {users.map(user => (
                    <Suspense key={user._id} fallback={<UserCardSkeleton />}>
                        <UserCard user={user} />
                    </Suspense>
                ))}
                </Suspense>

            </div>
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