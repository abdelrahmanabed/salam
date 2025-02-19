import React, { useState } from 'react';

const Search = ({ onSearch, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [projectFilter, setProjectFilter] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleRoleFilter = (e) => {
        setRoleFilter(e.target.value);
        onFilter('role', e.target.value);
    };

    const handleProjectFilter = (e) => {
        setProjectFilter(e.target.value);
        onFilter('currentProject', e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <select value={roleFilter} onChange={handleRoleFilter}>
                <option value="">Filter by Role</option>
                <option value="HSE Officer">HSE Officer</option>
                <option value="Manager">Manager</option>
                {/* Add more roles as needed */}
            </select>

            <select value={projectFilter} onChange={handleProjectFilter}>
                <option value="">Filter by Project</option>
                <option value="Project1">Project 1</option>
                <option value="Project2">Project 2</option>
                {/* Add more projects as needed */}
            </select>
        </div>
    );
};

export default Search;