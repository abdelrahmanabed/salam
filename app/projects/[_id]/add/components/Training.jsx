import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';

import Addinput from '../../../addproject/components/Addinput';
import { useParams } from 'next/navigation';

const TrainingForm = (props) => {
  const { _id: projectId } = useParams();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [apiError, setApiError] = useState("");
  const [fileErrors, setFileErrors] = useState({});
  const [files, setFiles] = useState({});
  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(false)
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

  const formik = useFormik({
    initialValues: {
      topic: '',
      numberOfAttendees: '',

      project: projectId
    },
  
    onSubmit: async (values) => {

 setLoading(true);
      setIsUploading(true);
      setUploadProgress(0);
            const formData = new FormData();
      Object.keys(values).forEach(key => formData.append(key, values[key]));
      Object.keys(files).forEach(key => {
        if (files[key]) formData.append(key, files[key]);
      });

      const token = localStorage.getItem('token');
      if (!token) {
        setApiError("Authentication token is missing.");
        setLoading(false);
        setIsUploading(false);
        return;
      }

      try {
        const response = await axios.post(
           `${process.env.NEXT_PUBLIC_API}/api/training-reports/admin`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } }
        );
        setSubmitStatus({
          success: true,
          error: null
        });
        formik.resetForm();

   setLoading(false);
        setIsUploading(false);
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
        setLoading(false);
        setIsUploading(false);
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
    <div className={`w-full ${props.className} scrollbar-hide   text-nowrap  h-full md:h-full overflow-y-auto flex gap-3 justify-center rounded-main`}>
 {loading && !isUploading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <div className="loader"></div>
        </div>
      ) :
<form onSubmit={formik.handleSubmit} className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center bg-boxcolor dark:bg-blackgrey">
 <div className="w-full flex items-center gap-2">
   <Icon
     className="text-xl text-rosecolor duration-300"
     icon="fluent:learning-app-16-filled"
   />
   <span className="self-start font-bold">New in-house Training </span>
 </div>
 {isUploading && (
                     <EnhancedProgressBar progress={uploadProgress} isUploading={isUploading} />

          )}
 {submitStatus.success && (
   <div className="w-full p-4 mb-4 text-green-700 bg-green-100 rounded-main">
     Training created successfully!
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
       label="topic" 
       name="topic" 
       type="text" 
       value={formik.values.topic} 
       onChange={formik.handleChange} 
     />
     {formik.touched.topic && formik.errors.topic && 
       <span className="error-message ml-2 text-xs font-bold text-greencolor">
         *{formik.errors.topic}
       </span>
     }
   </div>
   
   <div>
     <Addinput 
       label="Number of Attendees" 
       name="numberOfAttendees" 
       type="number" 
       value={formik.values.numberOfAttendees} 
       onChange={formik.handleChange} 
     />
     {formik.touched.numberOfAttendees && formik.errors.numberOfAttendees && 
       <span className="error-message ml-2 text-xs font-bold text-greencolor">
         *{formik.errors.numberOfAttendees}
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
         className=" rounded-full text-xs w-24 cursor-pointer file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr file:bg-darkrose file:text-subtextcolor hover:file:bg-pinkcolor"
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
   className="rounded-full text-nowrap w-full md:w-96 hover:bg-darkrose duration-200 bg-rosecolor text-subtextcolor text-xl font-black py-3 px-8"
 >
   Submit Training 
 </button>
</form>}
</div>
);
};

export default TrainingForm;