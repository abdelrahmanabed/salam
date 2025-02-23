import { Icon } from "@iconify/react";

export const FilterSection = ({ searchTerm, setSearchTerm, filters, setFilters, projects, roles }) => (
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