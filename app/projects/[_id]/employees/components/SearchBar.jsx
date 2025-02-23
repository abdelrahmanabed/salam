'use client'
import { Icon } from '@iconify/react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='relative w-full'>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-[10px] pl-10 border-2 dark:bg-blackgrey dark:border-blackgrey rounded-main border-border"
      />
      <Icon 
        icon="iconamoon:search-fill" 
        className='text-bluecolor bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle absolute pointer-events-none top-1/2 -translate-y-1/2 left-1.5' 
        width="28" 
        height="28" 
      />
    </div>
  );
};

export default SearchBar;