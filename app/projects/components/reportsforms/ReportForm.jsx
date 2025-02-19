'use client'
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import Addinput from '../Addinput';
import React from 'react'
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';

const DayDataForm = ({ className }) => {
  const { _id: projectId } = useParams();
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    error: null 
  });


  const formik = useFormik({
    initialValues: {
      manpower: '',
      dayWorkingHours: '8', // Default value
      LTI: '0' ,
      project: projectId
      // Default value as string
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
      setLoading(true)
      setSubmitStatus({ success: false, error: null, message: '' });

      try {
        const token = localStorage.getItem('token');
        
        const formData = {     
               date: new Date(), // Adding current date explicitly
          manpower: parseInt(values.manpower),
          dayWorkingHours: parseInt(values.dayWorkingHours),
          LTI: values.LTI === '1',
          project: projectId
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/manhours/addadmin`,
          formData,
          {
            headers: { 
              'Authorization': `Bearer ${token}`
            },
          }
        );
        const isUpdate = response.data.isUpdate;

        setSubmitStatus({
          success: true,
          error: null,
          message: isUpdate 
            ? "Manhours record updated successfully!"
            : "Manhours record created successfully!"
        });
        
        if (formData.LTI) {
          setSubmitStatus(prev => ({
            ...prev,
            message: prev.message + " Warning: LTI occurrence has reset all previous safe manhours to 0."
          }));
        }

        console.log('Manhours record created:', response.data);
        resetForm();
     
      } catch (error) {
        let errorMessage = "An error occurred while saving the manhours record";
        
        // Handle specific error cases
        if (error.response?.status === 409) {
          errorMessage = "A manhours record already exists for today. The existing record has been updated.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        
        setSubmitStatus({
          success: false,
          error: true,
          message: errorMessage
        });
        
        console.error('Error with manhours record:', error);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });
  return (
    <div className={`${className} overflow-y-auto w-full h-full md:h-full overflow-hidden flex gap-3 justify-center rounded-main`}>
    {loading ? (
      <div className='w-full h-full flex justify-center items-center'>
        <div className="loader"></div>
      </div>
    ) : (
      <form onSubmit={formik.handleSubmit} className='shadow-sm flex flex-col w-full gap-4 rounded-main p-4 items-center dark:bg-blackgrey dark:text-subtextcolor bg-boxcolor'>
        <div className='w-full flex gap-2 items-center'>
          <Icon className="text-2xl duration-300 text-maincolor" icon="mdi:time-of-day" />
          <span className='self-start font-bold'>Working Hours & Man Power</span>
        </div>
        
        {submitStatus.message && (
          <div className={`w-full p-4 mb-4 rounded-main ${
            submitStatus.success 
              ? 'text-green-700 bg-green-100' 
              : 'text-red-700 bg-red-100'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <div className='justify-end flex flex-col w-full'>
          <div className="flex flex-col gap-1 p-2">
            <label htmlFor='manpower' className="text-sm font-semibold">Manpower</label>
            <input
              id='manpower'
              type='number'
              onChange={formik.handleChange}
              value={formik.values.manpower}
              name='manpower'
              className="shadow-sm border-border dark:bg-darkbox dark:border-darkbox border-2 rounded-main p-2"
            />
            {formik.touched.manpower && formik.errors.manpower && 
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.manpower}
              </span>
            }
          </div>

          <div className="flex flex-col gap-1 p-2">
            <label htmlFor='dayWorkingHours' className="text-sm font-semibold">Day Working Hours</label>
            <select
              id='dayWorkingHours'
              onChange={formik.handleChange}
              value={formik.values.dayWorkingHours}
              name='dayWorkingHours'
              className="shadow-sm border-border dark:bg-darkbox dark:border-darkbox border-2 rounded-main p-2"
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
              className="shadow-sm dark:bg-darkbox dark:border-darkbox border-border border-2 rounded-main p-2"
            >
              <option value="0">No LTI (0)</option>
              <option value="1">LTI Occurred (1)</option>
            </select>
            {formik.values.LTI === '1' && (
              <span className="text-xs text-orange-500 mt-1">
                Warning: Setting LTI will reset all previous safe manhours to 0
              </span>
            )}
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
    )}
  </div>
);
};

export default DayDataForm;