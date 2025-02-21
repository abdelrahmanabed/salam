import React, { useState } from 'react';
import Addinput from '../Addinput';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';

const TBTForm = () => {
  const { _id: projectId } = useParams();
  console.log('Project ID:', projectId);

  const [apiError, setApiError] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(false);
  // إضافة حالة لتتبع نسبة التقدم
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    error: null 
  });

  const formik = useFormik({
    initialValues: {
      location: '',
      topic: '',
      numberOfAttendees: '',
      project: projectId
    },
    validationSchema: Yup.object({
      location: Yup.string().required('Location is required'),
      topic: Yup.string().required('topic is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setIsUploading(true);
      setUploadProgress(0);
      
      const formData = new FormData();
      Object.keys(values).forEach(key => formData.append(key, values[key]));
      imageFiles.forEach(file => formData.append('images', file));

      const token = localStorage.getItem('token');
      if (!token) {
        setApiError("Authentication token is missing.");
        setIsUploading(false);
        setLoading(false);

        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/tbts/admin`,
          formData,
          { 
            headers: { 
              'Content-Type': 'multipart/form-data', 
              'Authorization': `Bearer ${token}` 
            },
            // إضافة مراقبة التقدم للطلب
            onUploadProgress: (progressEvent) => {
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
        console.log('observations created:', response.data);

        formik.resetForm();
        setLoading(false);
        setIsUploading(false);
        setUploadProgress(0);

        setImageFiles([]);
        setFormKey(prev => prev + 1);
        setApiError("");
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        setSubmitStatus({
          success: false,
          error: errorMessage
        });
        setApiError(errorMessage);
        setIsUploading(false);
        setLoading(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

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

  return (
    <div className="w-full h-full md:h-full overflow-y-auto flex gap-3 justify-center rounded-main">
      
      {loading && !isUploading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <div className="loader"></div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center dark:text-subtextcolor dark:bg-blackgrey bg-boxcolor">
          <div className="w-full flex items-center gap-2">
            <Icon
              className="text-xl text-greencolor duration-300"
              icon="mdi:talk"
            />
            <span className="self-start font-bold">New TBT</span>
          </div>

          {/* عرض شريط التقدم فقط أثناء الرفع */}
          {isUploading && (
                     <EnhancedProgressBar progress={uploadProgress} isUploading={isUploading} />

          )}

          {submitStatus.success && (
            <div className="w-full p-4 mb-4 text-green-700 bg-green-100 rounded-main">
              TBT created successfully!
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
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="ml-2 items-center relative p-1 gap-2 rounded-main flex">
              <label className="flex gap-3 flex-col">Image
                <input
                  className="rounded-full w-28 cursor-pointer file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr file:bg-lightgreen file:text-white hover:file:bg-greencolor"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                />
              </label>

              {imageFiles.length > 0 && (
                <div className="flex flex-col mt-2">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-xs overflow-hidden self-end text-greencolor mt-1">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="bg-redcolor flex items-center justify-center h-4 w-4 rounded-full text-xs font-bold hover:text-darkred"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {apiError && 
            <div className="text-greencolor text-sm font-bold">
              Error: {apiError}
            </div>
          }

          <button
            type="submit"
            disabled={isUploading}
            className={`rounded-full w-full md:w-96 duration-200 text-subtextcolor text-xl font-black py-3 px-8 ${
              isUploading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "hover:bg-greencolor bg-darkgreen"
            }`}
          >
            {isUploading ? 'Uploading...' : 'Submit TBT'}
          </button>
        </form>
      )}
    </div>
  );
};

export default TBTForm;