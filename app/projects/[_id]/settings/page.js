'use client'
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect, useContext, Suspense } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext';
import Addinput from '../../addproject/components/Addinput';
import EditProjectSkeleton from './Editskeleton';
import MapLocation from './MapLocation';



const EditProject = () => {
  const { project, loading, refreshProject } = useContext(ProjectsContext);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
  
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    error: null 
  });
  const EnhancedProgressBar = ({ progress, isUploading }) => {
    if (!isUploading) return null;
    
    return (
      <div className="fixed inset-0 bg-darkbox/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
        <div className="w-11/12 md:w-2/3 lg:w-1/2 max-w-md bg-boxcolor dark:bg-blackgrey rounded-main p-6 shadow-lg transform scale-100 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-subcolor dark:text-subtextcolor font-bold">updating</h3>
            <div className="flex items-center">
              <span className="text-bluecolor dark:text-lightblue font-medium text-lg mr-1">{progress}%</span>
              <div className="animate-spin h-4 w-4 border-2 border-bluecolor dark:border-lightblue border-t-transparent rounded-circle"></div>
            </div>
          </div>
          
          {/* Main progress track */}
          <div className="h-3 w-full bg-gray-200 dark:bg-darkbox rounded-full overflow-hidden mb-2">
            {/* Animated gradient progress fill */}
            <div 
              className="h-full bg-gradient-to-r from-bluecolor via-maincolor to-rosecolor rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
              }}
            >
              {/* Shimmer effect */}
              <div className="w-full h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 skew-x-12 animate-shimmer"></div>
              </div>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex justify-between items-center mt-3 text-xs">
            <span className="text-darkgrey dark:text-gray-400">
              {progress < 30 ? 'Starting upload...' : 
               progress < 70 ? 'Processing...' : 
               progress < 100 ? 'Almost done...' : 'Complete!'}
            </span>
            <span className="text-greencolor dark:text-lightgreen font-medium">
              {progress === 100 ? 'Upload complete!' : 'Please wait...'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: project?.name || '',
      location: project?.location || {
        type: 'Point',
        coordinates: [],
        address: ''
      },
      scopeOfWork: project?.scopeOfWork || '',
      type: project?.type || '',
      startDate: project?.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project?.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
      client: project?.client || '',
      subcontractors: project?.subcontractors?.join(', ') || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      location: Yup.object({
        type: Yup.string().required(),
        coordinates: Yup.array()
          .of(Yup.number())
          .min(2)
          .required('Location coordinates are required'),
        address: Yup.string().required('Address is required')
      }),
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
      setIsUploading(true);
      setUploadProgress(0);
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
            }, onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          
          }
        );
        
        setSubmitStatus({
          success: true,
          error: null
        });
        
        console.log('Project updated:', response.data);
        refreshProject();
        
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while updating the project";
        setSubmitStatus({
          success: false,
          error: errorMessage
        });
        setIsUploading(false);
        console.error('Error updating project:', errorMessage);
      } finally {
        setSubmitting(false);
        setIsUploading(false);

      }
    },
  });

  const handleLocationSelect = (locationData) => {
    formik.setFieldValue('location', locationData);
  };

  return (
    <Suspense className={<div/>}>
    <div className=' flex gap-3 justify-center lg:bg-maincolor bg-darkbluec dark:text-subtextcolor m-4 rounded-main'>
      <div className='hidden justify-center items-center lg:flex w-full'> 
        <span className='text-7xl font-black text-center lg:text-darkbluec text-maincolor'>EDIT PROJECT</span>
      </div>
      
      {loading && !isUploading ? (
      <EditProjectSkeleton/>
      )  : <form onSubmit={formik.handleSubmit} className='w-full md:min-w-[700px] shadow-sm shadow-darkbluec flex flex-col gap-4 rounded-main p-4 items-center dark:bg-darkbox bg-boxcolor'>
        <div className='w-full lg:hidden'>
          <span className='self-start font-bold'>Edit Project</span>
        </div>
        {isUploading && (
                     <EnhancedProgressBar progress={uploadProgress} isUploading={isUploading} />

          )}
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
        {!isUploading && (
            <div className="mb-4 w-full">
              <label className="block pl-2 font-bold mb-2">Location</label>
              <MapLocation 
                onLocationSelect={handleLocationSelect}
                initialLocation={project?.location?.coordinates ? {
                  lat: project.location.coordinates[1],
                  lng: project.location.coordinates[0]
                } : null}
              />
              
              {formik.values.location.address && (
                <div className="mt-2 text-sm">
                  Selected Address: {formik.values.location.address}
                </div>
              )}
            </div>
          )}
        <button 
          type="submit"
          disabled={formik.isSubmitting}
          className="rounded-full w-full md:w-96 bg-maincolor text-subtextcolor text-xl font-black py-3 px-8 disabled:opacity-50"
        >
          {formik.isSubmitting ? 'Updating Project...' : 'Update Project'}
        </button>
      </form>}
    </div></Suspense>
  );
};

export default EditProject;