'use client'
import React from 'react'
import { useContext } from 'react';
import { ProjectsContext } from '../../../projects/context/ProjectsContext';

const SelectPr = (props) => {
  const { projects, loading } = useContext(ProjectsContext);

  return (
    <div className={`${props.divclassName} flex flex-col gap-1 p-2`}>
      <label htmlFor={props.for} className={`text-sm font-semibol ${props.labelclassName}`}>
        {props.label}
      </label>
      <select
        id={props.for}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        className={`${props.className} shadow-sm dark:bg-darkbox dark:border-none border-border border-2 rounded-main p-2`}
      >
        <option value="">Select Project</option>
        {loading ? (
          <option disabled>Loading projects...</option>
        ) : (
          projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))
        )}
      </select>
    </div>
  )
}

export default SelectPr