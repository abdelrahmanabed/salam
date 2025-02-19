'use client'
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect, useContext } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext';
import Addinput from '../../addproject/components/Addinput';

const LoadingSpinner = () => (
  <div className='w-full h-screen flex justify-center items-center'>
    <div className='loader'></div>
  </div>
);

const EditProject = () => {
  const { project, loading } = useContext(ProjectsContext);
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    error: null 
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: project?.name || '',
      location: project?.location || '',
      scopeOfWork: project?.scopeOfWork || '',
      type: project?.type || '',
      startDate: project?.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project?.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
      client: project?.client || '',
      subcontractors: project?.subcontractors?.join(', ') || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      location: Yup.string().required('Location is required'),
      scopeOfWork: Yup.string().required('Scope of work is required'),
      type: Yup.string().required('Type is required'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date()
        .required('End date is required')
        .min(Yup.ref('startDate'), 'End date must be after start date'),
      client: Yup.string().required('Client is required'),
      subcontractors: Yup.string()
    }),

    onSubmit: async (values, { setSubmitting }) => {
      const formattedValues = {
        ...values,
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
        duration: Math.ceil((new Date(values.endDate) - new Date(values.startDate)) / (1000 * 60 * 60 * 24)),
        subcontractors: values.subcontractors.split(',').map(s => s.trim()).filter(Boolean)
      };

      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/projects/${project._id}`,
          formattedValues,
          {
            headers: { 
              'Authorization': `Bearer ${token}`
            },
          }
        );
        
        setSubmitStatus({
          success: true,
          error: null
        });
        
        console.log('Project updated:', response.data);
        
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while updating the project";
        setSubmitStatus({
          success: false,
          error: errorMessage
        });
        console.error('Error updating project:', errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className=' flex gap-3 justify-center lg:bg-maincolor bg-darkbluec dark:text-subtextcolor m-2 rounded-main'>
      <div className='hidden justify-center items-center lg:flex w-full'> 
        <span className='text-7xl font-black text-center lg:text-darkbluec text-maincolor'>EDIT PROJECT</span>
      </div>
      
      <form onSubmit={formik.handleSubmit} className='w-full md:min-w-[700px] shadow-sm shadow-darkbluec flex flex-col gap-4 rounded-main p-4 items-center dark:bg-darkbox bg-boxcolor'>
        <div className='w-full lg:hidden'>
          <span className='self-start font-bold'>Edit Project</span>
        </div>
        
        {submitStatus.success && (
          <div className="w-full p-4 mb-4 text-darkgreen bg-lightgreen rounded-main">
            Project updated successfully!
          </div>
        )}
        
        {submitStatus.error && (
          <div className="w-full p-4 mb-4 text-red-700 bg-red-100 rounded-main">
            {submitStatus.error}
          </div>
        )}

        <div className='grid w-full sm:grid-cols-2'>
          <Addinput 
            label='Name'
            name='name'
            for='name'
            type='text'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? 
            <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.name}</span> 
          : null}

          <Addinput 
            label='Location'
            name='location'
            for='location'
            type='text'
            value={formik.values.location}
            onChange={formik.handleChange}
          />
          {formik.touched.location && formik.errors.location ? 
            <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.location}</span> 
          : null}
          
          <Addinput 
            label='Scope of Work'
            name='scopeOfWork'
            for='scopeOfWork'
            type='text'
            value={formik.values.scopeOfWork}
            onChange={formik.handleChange}
          />
          {formik.touched.scopeOfWork && formik.errors.scopeOfWork ? 
            <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.scopeOfWork}</span> 
          : null}

          <Addinput 
            label='Type'
            name='type'
            for='type'
            type='text'
            value={formik.values.type}
            onChange={formik.handleChange}
          />
          {formik.touched.type && formik.errors.type ? 
            <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.type}</span> 
          : null}

          <Addinput 
            label='Start Date'
            name='startDate'
            for='startDate'
            type='date'
            value={formik.values.startDate}
            onChange={formik.handleChange}
          />
          {formik.touched.startDate && formik.errors.startDate ? 
            <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.startDate}</span> 
          : null}

          <Addinput 
            label='End Date'
            name='endDate'
            for='endDate'
            type='date'
            value={formik.values.endDate}
            onChange={formik.handleChange}
          />
          {formik.touched.endDate && formik.errors.endDate ? 
            <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.endDate}</span> 
          : null}

          <Addinput 
            label='Client'
            name='client'
            for='client'
            type='text'
            value={formik.values.client}
            onChange={formik.handleChange}
          />
          {formik.touched.client && formik.errors.client ? 
            <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.client}</span> 
          : null}
         
          <Addinput 
            label='Subcontractors'
            name='subcontractors'
            for='subcontractors'
            type='text'
            value={formik.values.subcontractors}
            onChange={formik.handleChange}
          />
          {formik.touched.subcontractors && formik.errors.subcontractors ? 
            <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.subcontractors}</span> 
          : null}
        </div>
        
        <button 
          type="submit"
          disabled={formik.isSubmitting}
          className="rounded-full w-full md:w-96 bg-maincolor text-subtextcolor text-xl font-black py-3 px-8 disabled:opacity-50"
        >
          {formik.isSubmitting ? 'Updating Project...' : 'Update Project'}
        </button>
      </form>
    </div>
  );
};

export default EditProject;