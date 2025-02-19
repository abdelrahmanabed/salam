import React, { useState } from 'react';
import Addinput from '../Addinput';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';

const AbnormalForm = () => {
  const { _id: projectId } = useParams();
  console.log('Project ID:', projectId);
  const [loading, setLoading] = useState(false)

  const [apiError, setApiError] = useState("");
  const [fileErrors, setFileErrors] = useState({});
  const [files, setFiles] = useState({});
  const [formKey, setFormKey] = useState(0);
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    error: null 
  });

  const formik = useFormik({
    initialValues: {
      location: '',
      eventType: '',
      description: '',
      status: 'Open',
      project: projectId
    },
    validationSchema: Yup.object({
      location: Yup.string().required('Location is required'),
      eventType: Yup.string()
        .required('Event Type is required')
        .oneOf(['Near miss', 'Property Damage', 'Environmental Harm', 
                'First Aid', 'Medical Treatment', 'LTI', 'Fatality']),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      const formData = new FormData();
      Object.keys(values).forEach(key => formData.append(key, values[key]));
      Object.keys(files).forEach(key => {
        if (files[key]) formData.append(key, files[key]);
      });

      const token = localStorage.getItem('token');
      if (!token) {
        setApiError("Authentication token is missing.");
        setLoading(false)

        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/abnormal-events/admin`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } }
        );
        setLoading(false)

        formik.resetForm();
        setFiles({});
        setFormKey(prev => prev + 1);
        setApiError("");
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        setApiError(errorMessage);
      }
    },
  });

  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (file && (!validTypes.includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setFileErrors(prev => ({
        ...prev,
        [fieldName]: validTypes.includes(file.type)
          ? 'Maximum file size is 5MB'
          : 'Please upload PDF or Word documents only',
      }));
      return;
    }

    setFiles(prev => ({ ...prev, [fieldName]: file }));
    setFileErrors(prev => ({ ...prev, [fieldName]: null }));
  };
  return (
    <div className="w-full   h-full md:h-full overflow-y-auto flex gap-3 justify-center scrollbar-hide rounded-main">
     {loading?<div className='w-full h-full flex justify-center items-center'><div className="loader"></div></div>:

      <form onSubmit={formik.handleSubmit} className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center dark:bg-blackgrey dark:text-subtextcolor bg-boxcolor">
        <div className="w-full flex items-center gap-2">
          <Icon
            className="text-xl text-redcolor duration-300"
            icon="icon-park-solid:abnormal"
          />
          <span className="self-start dark:text-subtextcolor font-bold">New Abnormal Event</span>
        </div>
        {submitStatus.success && (
          <div className="w-full p-4 mb-4 text-green-700 bg-green-100 rounded-main">
            Abnormal Event created successfully!
          </div>
        )}
        
        {submitStatus.error && (
          <div className="w-full p-4 mb-4 text-red-700 bg-red-100 rounded-main">
            {submitStatus.error}
          </div>
        )}

        <div className="w-full">
          <div>
            <Addinput 
              label="Location" 
              name="location" 
              type="text" 
              value={formik.values.location} 
              onChange={formik.handleChange} 
            />
            {formik.touched.location && formik.errors.location && 
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.location}
              </span>
            }
          </div>

          <div className="flex flex-col gap-1 p-2">
            <label htmlFor="eventType" className="text-sm font-semibold">
              Event Type
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formik.values.eventType}
              onChange={formik.handleChange}
              className="shadow-sm border-border dark:border-darkbox dark:bg-darkbox border-2 rounded-main p-2"
            >
              <option value="">Select Event Type</option>
              {['Near miss', 'Property Damage', 'Environmental Harm', 
                'First Aid', 'Medical Treatment', 'LTI', 'Fatality'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {formik.touched.eventType && formik.errors.eventType && 
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.eventType}
              </span>
            }
          </div>

          <div>
            <Addinput 
              label="Description" 
              name="description" 
              type="text" 
              value={formik.values.description} 
              onChange={formik.handleChange} 
            />
            {formik.touched.description && formik.errors.description && 
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.description}
              </span>
            }
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            { label: 'Initial Report', name: 'initialReport' },
            { label: 'Investigation Report', name: 'investigationReport' },
            { label: 'Action Plan', name: 'actionPlan' },
            { label: 'Lesson Learned', name: 'lessonLearned' },
            { label: 'Closeout Report', name: 'closeoutReport' }
          ].map((field) => (
            <div key={field.name} className=" relative  p-1 rounded-main flex ">
              <label className="text-xs flex flex-col">{field.label}
              <input
                className=" rounded-full text-xs w-24 cursor-pointer file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr file:bg-lightred file:text-white hover:file:bg-redcolor"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, field.name)}
              /></label>


              {files[field.name] && <>
                <span className="text-xs overflow-clip text-greencolor mt-1">
                {files[field.name].name}
                </span>      <button
      type="button"
      onClick={() => setFiles((prev) => ({ ...prev, [field.name]: null }))}
      className="bg-redcolor flex items-center justify-center h-4 w-4 absolute right-0 top-0 rounded-circle text-xs font-bold hover:text-darkred"
    >
      X
            </button>   </>}
        
   
              {fileErrors[field.name] && 
                <span className="text-xs text-redcolor mt-1">
                  {fileErrors[field.name]}
                </span>
              }
            </div>
          ))}
        </div>

        {apiError && 
          <div className="text-redcolor text-sm font-bold">
            Error: {apiError}
          </div>
        }

        <button
          type="submit"
          className="rounded-full w-full md:w-96 hover:bg-redcolor duration-200 bg-darkred text-subtextcolor text-xl font-black py-3 px-8"
        >
          Submit Abnormal Event
        </button>
      </form>}
    </div>
  );
};

export default AbnormalForm;