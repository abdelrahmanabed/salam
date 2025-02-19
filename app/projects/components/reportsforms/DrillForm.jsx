'use client'
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import Addinput from '../../addproject/components/Addinput';
import React from 'react'
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';

const DrillForm = ({className }) => {
  const projectId = useParams()
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    error: null 
  });

  const formik = useFormik({
    initialValues: {
      manpower: '',
      dayWorkingHours: '8', // Default value
      LTI: '0'  // Default value as string
    },
    validationSchema: Yup.object({
      manpower: Yup.number()
        .required('Manpower is required')
        .positive('Must be a positive number')
        .integer('Must be a whole number'),
      dayWorkingHours: Yup.number()
        .required('Working hours are required')
        .oneOf([6, 7, 8, 9, 10, 11, 12], 'Invalid working hours'),
      LTI: Yup.number()
        .required('LTI status is required')
        .oneOf([0, 1], 'Invalid LTI value')
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const token = localStorage.getItem('token');
        
        const formData = {
          manpower: parseInt(values.manpower),
          dayWorkingHours: parseInt(values.dayWorkingHours),
          LTI: values.LTI === '1',
          project: projectId
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/manhours/add`,
          formData,
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
        
        console.log('Manhours record created:', response.data);
        resetForm();
        
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while creating the manhours record";
        setSubmitStatus({
          success: false,
          error: errorMessage
        });
        console.error('Error creating manhours record:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={`${className} w-full h-full md:h-full overflow-hidden flex gap-3 justify-center rounded-main`}>
      <form onSubmit={formik.handleSubmit} className='shadow-sm flex flex-col w-full gap-4 rounded-main p-4 items-center bg-boxcolor'>
        <div className='w-full flex gap-2 items-center'>
          <Icon className="text-2xl duration-300 text-maincolor" icon="mdi:time-of-day" />
          <span className='self-start font-bold'>Working Hours & Man Power</span>
        </div>
        
        {submitStatus.success && (
          <div className="w-full p-4 mb-4 text-green-700 bg-green-100 rounded-main">
            Manhours record created successfully!
          </div>
        )}
        
        {submitStatus.error && (
          <div className="w-full p-4 mb-4 text-red-700 bg-red-100 rounded-main">
            {submitStatus.error}
          </div>
        )}

        <div className='justify-end flex flex-col w-full'>
          <Addinput 
            label='Manpower'
            name='manpower'
            for='manpower'
            type='number'
            value={formik.values.manpower}
            onChange={formik.handleChange}
          />
          {formik.touched.manpower && formik.errors.manpower && 
            <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.manpower}</span>
          }

          <div className="flex flex-col gap-1 p-2">
            <label htmlFor='dayWorkingHours' className="text-sm font-semibold">Day Working Hours</label>
            <select
              id='dayWorkingHours'
              onChange={formik.handleChange}
              value={formik.values.dayWorkingHours}
              name='dayWorkingHours'
              className="shadow-sm border-border border-2 rounded-main p-2"
            >
              {[6, 7, 8, 9, 10, 11, 12].map(hours => (
                <option key={hours} value={hours}>{hours}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 p-2">
            <label htmlFor='LTI' className="text-sm font-semibold">LTI Status</label>
            <select
              id='LTI'
              onChange={formik.handleChange}
              value={formik.values.LTI}
              name='LTI'
              className="shadow-sm border-border border-2 rounded-main p-2"
            >
              <option value="0">No LTI (0)</option>
              <option value="1">LTI Occurred (1)</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          disabled={formik.isSubmitting}
          className="rounded-full w-full md:w-96 bg-darkbluec hover:bg-maincolor duration-300 text-subtextcolor text-xl font-black py-3 px-8 disabled:opacity-50"
        >
          {formik.isSubmitting ? 'Submitting...' : 'Submit Manhours'}
        </button>
      </form>
    </div>
  );
};

export default DrillForm;