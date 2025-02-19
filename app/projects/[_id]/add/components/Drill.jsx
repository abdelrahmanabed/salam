import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';


const DrillForm = (props) => {
  const { _id: projectId } = useParams();

  const [apiError, setApiError] = useState("");
  const [fileErrors, setFileErrors] = useState({});
  const [files, setFiles] = useState({});
  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    error: null 
  });

  const formik = useFormik({
    initialValues: {
      type: '',
      project: projectId
    },
    validationSchema: Yup.object({
      type: Yup.string()
        .required('Type is required'),
     
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
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/drill-reports/admin`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } }
        );
        console.log('Drill created:', response.data);
        setSubmitStatus({
          success: true,
          error: null
        });
        formik.resetForm();
        setLoading(false)
        setFiles({});
        setFormKey(prev => prev + 1);
        setApiError("");
      } catch (error) {
        setSubmitStatus({
          success: false,
          error: errorMessage
        });
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
    <div className={`w-full ${props.className} scrollbar-hide  text-nowrap  h-full md:h-full overflow-y-auto flex gap-3 justify-center rounded-main`}>
           {loading?<div className='w-full h-64 flex justify-center items-center'><div className="loader"></div></div>:

      <form onSubmit={formik.handleSubmit} className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center  bg-boxcolor dark:bg-blackgrey">
        <div className="w-full flex items-center gap-2">
          <Icon
            className="text-xl text-yellowcolor duration-300"
            icon="fa-solid:star-of-life"
          />
          <span className="self-start font-bold">New Drill </span>
        </div>
        {submitStatus.success && (
          <div className="w-full p-4 mb-4 text-green-700 bg-green-100 rounded-main">
            Drill created successfully!
          </div>
        )}
        
        {submitStatus.error && (
          <div className="w-full p-4 mb-4 text-red-700 bg-red-100 rounded-main">
            {submitStatus.error}
          </div>
        )}
        <div className="w-full">
          

          <div className="flex flex-col gap-1 p-2">
            <label htmlFor="type" className="text-sm font-semibold">
               Type
            </label>
            <select
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              className="shadow-sm border-border  dark:border-darkbox  dark:bg-darkbox  border-2 rounded-main p-2"
            >
              <option value="">Select Type</option>
              {[
      'Fire Drills', 'Evacuation Drills', 'Medical Emergency Drills',
      'Confined Space Rescue Drills', 'Hazardous Material Spill Drills',
      'High-Altitude Rescue Drills', 'Severe Weather Drills', 'Electrical Emergency Drills',
      'Gas Leak Drills', 'Active Shooter Drills'
           ].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {formik.touched.type && formik.errors.type && 
              <span className="error-message ml-2 text-xs font-bold text-bluecolor">
                *{formik.errors.type}
              </span>
            }
          </div>

        
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            { label: 'file', name: 'file' },
           
          ].map((field) => (
            <div key={field.name} className=" relative  p-1 rounded-main flex ">
              <label className="text-xs flex flex-col">{field.label}
              <input
                className=" rounded-full text-xs w-24 cursor-pointer file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr file:bg-darkyellow file:text-subtextcolor hover:file:bg-yellowcolor"
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
      className="bg-redcolor flex items-center justify-center h-4 w-4 absolute right-0 top-0 rounded-circle text-xs font-bold hover:text-darkpink"
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
          className="rounded-full w-full md:w-96 hover:bg-darkyellow duration-200 bg-yellowcolor text-subtextcolor text-xl font-black py-3 px-8"
        >
          Submit Drill 
        </button>
      </form>}
    </div>
  );
};

export default DrillForm;