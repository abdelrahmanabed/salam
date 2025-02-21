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
  const [loading, setLoading] = useState(false);
  // إضافة حالات جديدة لتتبع التقدم
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [apiError, setApiError] = useState("");
  const [fileErrors, setFileErrors] = useState({});
  const [files, setFiles] = useState({});
  const [formKey, setFormKey] = useState(0);
  const [submitStatus, setSubmitStatus] = useState({ 
    success: false, 
    error: null 
  });


  // Enhanced Progress Bar Component
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
      setLoading(true);
      setIsUploading(true);
      setUploadProgress(0);
      setSubmitStatus({ success: false, error: null });
      
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
          `${process.env.NEXT_PUBLIC_API}/api/abnormal-events/admin`,
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
        
        // إعادة تعيين النموذج بعد النجاح
        formik.resetForm();
        setFiles({});
        setFormKey(prev => prev + 1);
        setApiError("");
        setLoading(false);
        setIsUploading(false);
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        setSubmitStatus({
          success: false,
          error: errorMessage
        });
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

  // حساب حجم الملفات الإجمالي
  const totalFileSize = Object.values(files)
    .filter(file => file)
    .reduce((total, file) => total + file.size, 0);
  
  // تحويل حجم الملف إلى صيغة مقروءة
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full h-full md:h-full overflow-y-auto flex gap-3 justify-center scrollbar-hide rounded-main">
      {loading && !isUploading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <div className="loader"></div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center dark:bg-blackgrey dark:text-subtextcolor bg-boxcolor">
          <div className="w-full flex items-center gap-2">
            <Icon
              className="text-xl text-redcolor duration-300"
              icon="icon-park-solid:abnormal"
            />
            <span className="self-start dark:text-subtextcolor font-bold">New Abnormal Event</span>
          </div>

          {/* عرض شريط التقدم أثناء الرفع فقط */}
          {isUploading && (
                     <EnhancedProgressBar progress={uploadProgress} isUploading={isUploading} />

          )}
          
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

          {/* عرض معلومات إجمالي الملفات إذا كان هناك ملفات */}
          {Object.values(files).filter(file => file).length > 0 && (
            <div className="w-full p-2 mb-2 bg-gray-100 dark:bg-gray-800 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">Files Selected: {Object.values(files).filter(file => file).length}</span>
                <span className="text-xs font-medium">Total Size: {formatFileSize(totalFileSize)}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 w-full">
            {[
              { label: 'Initial Report', name: 'initialReport' },
              { label: 'Investigation Report', name: 'investigationReport' },
              { label: 'Action Plan', name: 'actionPlan' },
              { label: 'Lesson Learned', name: 'lessonLearned' },
              { label: 'Closeout Report', name: 'closeoutReport' }
            ].map((field) => (
              <div key={field.name} className="relative p-1 rounded-main flex">
                <label className="text-xs flex flex-col">{field.label}
                <input
                  className="rounded-full text-xs w-24 cursor-pointer file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr file:bg-lightred file:text-white hover:file:bg-redcolor"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, field.name)}
                  disabled={isUploading}
                />
                </label>

                {files[field.name] && (
                  <>
                    <span className="text-xs overflow-clip text-greencolor mt-1">
                      {files[field.name].name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFiles((prev) => ({ ...prev, [field.name]: null }))}
                      className="bg-redcolor flex items-center justify-center h-4 w-4 absolute right-0 top-0 rounded-circle text-xs font-bold hover:text-darkred"
                      disabled={isUploading}
                    >
                      X
                    </button>
                  </>
                )}
          
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
            disabled={isUploading}
            className={`rounded-full w-full md:w-96 duration-200 text-subtextcolor text-xl font-black py-3 px-8 ${
              isUploading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "hover:bg-redcolor bg-darkred"
            }`}
          >
            {isUploading ? 'Uploading...' : 'Submit Abnormal Event'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AbnormalForm;