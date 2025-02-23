'use client'
import React, { useContext, useState, useEffect, Suspense } from 'react';
import Addinputdiv from './components/Addinputdiv';
import Select from './components/SelectRole';
import SelectPr from './components/SelectProject';
import Permissions from './components/Permissions';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Nationality from './components/Nationality';
import { UsersContext } from '../../contexts/UsersContext';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation'; // Import useRouter

const EditForm = () => {
  const router = useRouter(); // Initialize router
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [apiError, setApiError] = useState({});
  const { user, users, setUsers, setUser } = useContext(UsersContext);
  const [imageFile, setImageFile] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const EnhancedProgressBar = ({ progress, isUploading }) => {
    if (!isUploading) return null;
    
    return (
      <div className="fixed inset-0 bg-darkbox/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
        <div className="w-11/12 md:w-2/3 lg:w-1/2 max-w-md bg-boxcolor dark:bg-blackgrey rounded-main p-6 shadow-lg transform scale-100 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-subcolor dark:text-subtextcolor font-bold">Uploading Files</h3>
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
               progress < 70 ? 'Processing files...' : 
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
  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user.name,
        phone: user.phone,
        birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : '',
        email: user.email,
        password: '',
        role: user.role,
        currentProject: user.currentProject?._id || '',
        nationality: user.nationality,
        permissions: user.permissions || {},
      });
      setIsVerified(user.verified);
    }
  }, [user]);

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    formik.setFieldValue(`permissions.${name}`, checked);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      birthdate: '',
      email: '',
      password: '',
      role: 'HSE Officer',
      currentProject: '',
      nationality: '',
      permissions: {
        tbt: false,
        abnormalEvents: false,
        auditReport: false,
        hseReports: false,
        drillReport: false,
        hseReport: false,
        manhours: false,
        trainingRecords: false,
        observations: false,
      },
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      currentProject: Yup.string().required('Please select a project'),
    }),
    onSubmit: async (values) => {
      setIsSuccess(false);
      setIsLoading(true);
      setIsUploading(true);
      setUploadProgress(0);
      setApiError({}); // Clear previous errors
      const formData = new FormData();

      // Append all form values
      Object.keys(values).forEach(key => {
        if (key !== 'permissions') {
          formData.append(key, values[key]);
        }
      });

      // Append permissions
      Object.keys(values.permissions).forEach((key) => {
        formData.append(`permissions[${key}]`, values.permissions[key]);
      });

      formData.append('verified', isVerified);

      // Append the image file if it exists
      if (imageFile) {
        formData.append('image', imageFile);
      }

      try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API}/api/users/${user._id}`, formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }, onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        });
        

        // Success handling
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 1000)
        // Optionally, show success message or redirect
        setIsUploading(false);


        router.back();
      } catch (error) {
        if (error.response && error.response.data.errors) {
          // Handle specific field errors from backend
          setApiError(error.response.data.errors);

        } else {
          // Handle general error
          setApiError({ 
            general: error.response?.data?.message || "An unexpected error occurred" 
          });
        }
        console.error('Error updating user:', error);
        setIsUploading(false);
        setIsLoading(false);

      }
    },
  });

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const toggleVerified = () => {
    setIsVerified(!isVerified);
  };



  return (
    <Suspense fallback={<div ></div>}>
    <div className=' lg:p-4 flex gap-3 justify-center dark:bg-darkbox lg:bg-maincolor  dark:text-subtextcolor bg-darkbluec m-2 rounded-main'>
      <div className='hidden justify-center items-center lg:flex w-full'>
        <span className='text-7xl font-black text-center lg:text-darkbluec text-maincolor'>EDIT USER</span>
      </div>
      {isLoading? <div className='w-full h-screen flex justify-center items-center'><div className='loader'></div></div> :
      <form onSubmit={formik.handleSubmit} className='w-full md:min-w-[700px] shadow-sm shadow-darkbluec flex flex-col gap-4 rounded-main p-4 items-center dark:bg-blackgrey bg-boxcolor'>
           {/* عرض شريط التقدم أثناء الرفع فقط */}
           {isUploading && (
                     <EnhancedProgressBar progress={uploadProgress} isUploading={isUploading} />

          )}
        <div className='w-full lg:hidden'>
          <span className='self-start font-bold'>Edit User</span>
        </div>
        <div className='flex  flex-col md:flex-row gap-2 w-full items-center'>
            <Suspense fallback={<div className='h-64 bg-hovercolor dark:bg-darkgrey animate-pulse rounded-main'></div>}>
         <div>{user.image && <img src={`${process.env.NEXT_PUBLIC_API}${user.image}`} alt="User " className="h-64  object-cover rounded-main" />}</div> 
         <div>{user.idImage && <img src={`${process.env.NEXT_PUBLIC_API}${user.idImage}`} alt="ID" className=" h-64 object-cover rounded-main" />}</div> 
         </Suspense>
        </div>
        <div className='grid w-full md:grid-cols-2'>
          <div>
            <Addinputdiv label='Name.' name='name' for='name' type='text' value={formik.values.name} onChange={formik.handleChange} />
            {formik.touched.name && (formik.errors.name || apiError.name) && 
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.name || apiError.name}
              </span>}
          </div>
          <div>
            <Addinputdiv label='Phone Number.' name='phone' for='phone' type='tel' value={formik.values.phone} onChange={formik.handleChange} />
            {(formik.touched.phone && formik.errors.phone) || apiError.phone ? 
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.phone || apiError.phone}
              </span> : null}
          </div>
          <Addinputdiv label='Birth Date' name='birthdate' for='birthdate' type='date' value={formik.values.birthdate} onChange={formik.handleChange} />
          <div>
            <Addinputdiv label='Email.' name='email' for='email' type='email' value={formik.values.email} onChange={formik.handleChange} />
            {(formik.touched.email && formik.errors.email) || apiError.email ? 
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.email || apiError.email}
              </span> : null}
          </div>
          <Select label='Role' name='role' for='role' value={formik.values.role} onChange={formik.handleChange} />
          <div>
            <SelectPr label='Current Project' name='currentProject' for='currentProject' value={formik.values.currentProject} onChange={formik.handleChange} />
            {(formik.touched.currentProject && formik.errors.currentProject) || apiError.currentProject ? 
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.currentProject || apiError.currentProject}
              </span> : null}
          </div>
          <Nationality label='Nationality' name='nationality' for='nationality' value={formik.values.nationality} onChange={formik.handleChange} />
        </div>

        <div className='flex flex-col gap-4 p-2'>
          <span>Permissions</span>
          <div className='flex justify-center gap-4 flex-wrap'>
            <Permissions label='TBT' id='tbt' for='tbt' name='tbt' checked={formik.values.permissions.tbt} onChange={handlePermissionChange} />
            <Permissions label='Abnormal Events' name='abnormalEvents' id='abnormalEvents' for='abnormalEvents' checked={formik.values.permissions.abnormalEvents} onChange={handlePermissionChange} />
            <Permissions label='Drill Events' name='drillReport' id='drillReport' for='drillReport' checked={formik.values.permissions.drillReport} onChange={handlePermissionChange} />
            <Permissions label='HSE Reports' name='hseReports' id='hseReports' for='hseReports' checked={formik.values.permissions.hseReports} onChange={handlePermissionChange} />
            <Permissions label='Observations' name='observations' id='observations' for='observations' checked={formik.values.permissions.observations} onChange={handlePermissionChange} />
            <Permissions label='Training Reports' name='trainingRecords' id='trainingRecords' for='trainingRecords' checked={formik.values.permissions.trainingRecords} onChange={handlePermissionChange} />
            <Permissions label='Audit Reports' name='auditReport' id='auditReport' for='auditReport' checked={formik.values.permissions.auditReport} onChange={handlePermissionChange} />
            <Permissions label='Man Hours' name='manhours' id='manhours' for='manhours' checked={formik.values.permissions.manhours} onChange={handlePermissionChange} />
          </div>
        </div>

        <div className='flex items-center'>
          <Permissions label='Verified' id='verified' for='verified' name='verified' checked={isVerified} onChange={toggleVerified} />
        </div>

       

        <input type='file' name='image' onChange={handleImageChange} />
        {apiError.general && <span className="error-message ml-2 text-xs font-bold text-redcolor">*{apiError.general}</span>}
        {isSuccess && (
        <div className="flex items-center justify-center text-green-500">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          User updated successfully!
        </div>
      )}
        <input type='submit'            disabled={isLoading}
     value={isLoading ? 'Updating...' : 'Update User'} 
 className='rounded-full w-full md:w-96 bg-maincolor text-subtextcolor text-xl font-black py-3 px-8' />
      </form>}
    </div></Suspense>

  );
}

export default EditForm;