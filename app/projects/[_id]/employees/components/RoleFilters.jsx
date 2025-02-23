'use client'
import { Icon } from '@iconify/react';

const RoleFilter = ({ filters, setFilters }) => {
  const roles = ['HSE Officer', 'Admin', 'Project Manager'];

  return (
    <div className='w-full relative'> 
      <Icon 
        icon="tabler:military-rank-filled" 
        className='text-bluecolor bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle absolute pointer-events-none top-1/2 -translate-y-1/2 left-1.5' 
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
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleFilter;