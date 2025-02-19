'use client'
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import Addinput from './components/Addinput';
import MapLocation from './components/MapLocation';

const Page = () => {

  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    error: null 
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      location: {
        type: 'Point',
        coordinates: [],
        address: ''
      },
      scopeOfWork: '',
      type: '',
      startDate: '',
      endDate: '',
      client: '',
      subcontractors: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      location: Yup.object({
        type: Yup.string().required(),
        coordinates: Yup.array()
          .of(Yup.number())
          .min(2)
          .required('Location coordinates are required'),
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

    onSubmit: async (values, { setSubmitting, resetForm }) => {
        const formattedValues = {
            ...values,
            startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
          // Calculate duration in days
          duration: Math.ceil((new Date(values.endDate) - new Date(values.startDate)) / (1000 * 60 * 60 * 24))
          };
      try {
        const token = localStorage.getItem('token'); // استرجاع الـ Token من الـ localStorage
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/projects`,  formattedValues, {
          headers: { 
            'Authorization': `Bearer ${token}` // إرسال الـ Token في الهيدر
           },
        });
        
        setSubmitStatus({
          success: true,
          error: null
        });
        
        console.log('Project created:', response.data);
        resetForm();
        
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while creating the project";
        setSubmitStatus({
          success: false,
          error: errorMessage
        });
        console.error('Error creating project:', errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleLocationSelect = (locationData) => {
    formik.setFieldValue('location', locationData);
  };
  return (
    <div className='p-4 dark:text-subtextcolor dark:bg-darkbox flex gap-3 justify-center  bg-subtextcolor m-2 rounded-main'>
      <div className='hidden justify-center items-center xl:flex w-full'> 
        <span className='text-7xl font-black text-center lg:text-darkbluec text-maincolor'>ADD A NEW PROJECT</span>
      </div>
      <form onSubmit={formik.handleSubmit} className='w-full dark:bg-darkbox md:min-w-[700px]  xl:p-4 flex flex-col gap-4 rounded-main p-0 items-center bg-boxcolor'>
        <div className='w-full p-2 xl:hidden'>
          <span className='self-start  font-bold'>Add New Project</span>
        </div>
        
        {submitStatus.success && (
          <div className="w-full p-4 mb-4 text-green-700 bg-green-100 rounded-main">
            Project created successfully!
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
            label='Subcontractor'
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
        <div className="mb-4 w-full">
          <label className="block pl-2 font-bold mb-2">Location</label>
          <MapLocation onLocationSelect={handleLocationSelect} />
          
          {formik.values.location.address && (
            <div className="mt-2 text-sm">
              Address {formik.values.location.address}
            </div>
          )}
        </div>

        {/* Display selected address */}
        {formik.values.location.address && (
          <div className="w-full">
            <p className="text-sm">Selected Address: {formik.values.location.address}</p>
          </div>
        )}
        <button 
          type="submit"
          disabled={formik.isSubmitting}
          className="rounded-full w-full md:w-96 bg-maincolor text-subtextcolor text-xl font-black py-3 px-8 disabled:opacity-50"
        >
          {formik.isSubmitting ? 'Adding Project...' : 'Add Project'}
        </button>
      </form>
    </div> 
  );
};

export default Page;