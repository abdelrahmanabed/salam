'use client'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import Addinput from './Addinput';
import { ProjectsContext } from '../../../projects/context/ProjectsContext';


const EditPage = () => {
  const { id, type } = useParams();
  const [apiError, setApiError] = useState("");
  const [files, setFiles] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const [existingFiles, setExistingFiles] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingFile, setExistingFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);  const router = useRouter(); // Initialize router
  const [loading, setLoading] = useState(false);
  const [fileUploaders, setFileUploaders] = useState({}); // Track who uploaded each file
  const { refreshSProject } = useContext(ProjectsContext);

  const EnhancedProgressBar = ({ progress, isUploading }) => {
    if (!isUploading) return null;
    
    return (
      <div className="fixed inset-0 bg-darkbox/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
        <div className="w-11/12 md:w-2/3 lg:w-1/2 max-w-md bg-boxcolor dark:bg-blackgrey rounded-main p-6 shadow-lg transform scale-100 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-subcolor dark:text-subtextcolor font-bold">Updating Report</h3>
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
  const observationTypes = [
    "Access/Egress", "Barriers/Guards", "Behavioural aspects", "Briefings", 
    "Competence/Training/Licences", "Confined Space", "Driving", "Electrical safety", 
    "Emergency Response", "Environment", "Excavations", "Falling Objects", "Supervision",
    "Fire safety", "First Aid/Medical", "Floor Openings/Gaps/Holes", "Gas Cylinders",
    "Good Practice", "Hand Tools/Power Tools", "Hazardous Substances/Dusts/Gases",
    "Health", "Heat Stress", "Hot Works", "Housekeeping", "Isolations", "Storage",
    "Lifting Equipment", "Lifting Operations", "Lighting", "Manual Handling", "Temporary Works",
    "Noise", "Plant & Equipment", "PPE", "Pressure Systems", "Records/Registers",
    "Risk Assessment/Method Statement/Permits", "Security", "Signage", "Slip/Trips/Falls",   
    "Traffic Management", "Vibration", "Welfare", "Work at Height/Scaffolding/Ladders"
  ];
  
  const auditTypes = ['Internal', 'External'];
  const hseTypes = ['Weekly', 'Monthly'];
  const drillTypes = [
    'Fire Drills', 'Evacuation Drills', 'Medical Emergency Drills',
    'Confined Space Rescue Drills', 'Hazardous Material Spill Drills',
    'High-Altitude Rescue Drills', 'Severe Weather Drills', 'Electrical Emergency Drills',
    'Gas Leak Drills', 'Active Shooter Drills'
  ];
  const getApiEndpoint = () => {
    switch (type) {
      case 'abnormal':
        return `${process.env.NEXT_PUBLIC_API}/api/abnormal-events/${id}`;
      case 'observation':
        return `${process.env.NEXT_PUBLIC_API}/api/observations/${id}`;
      case 'audit':
        return `${process.env.NEXT_PUBLIC_API}/api/audit-reports/${id}`;
      case 'drill':
        return `${process.env.NEXT_PUBLIC_API}/api/drill-reports/${id}`;
      case 'hse':
        return `${process.env.NEXT_PUBLIC_API}/api/hse-reports/${id}`;
      case 'training':
        return `${process.env.NEXT_PUBLIC_API}/api/training-reports/${id}`;
      case 'tbt':
        return `${process.env.NEXT_PUBLIC_API}/api/tbts/${id}`;
      default:
        throw new Error('Unknown report type');
    }
  };
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(getApiEndpoint(), {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setInitialData(response.data);
       
        if (type === 'abnormal') {
          const fileFields = ['initialReport', 'investigationReport', 'actionPlan', 'lessonLearned', 'closeoutReport'];
          const existingFilesObj = {};
          const fileUploadersObj = {};

          fileFields.forEach(field => {
            if (response.data[field]) {
              existingFilesObj[field] = response.data[field];
            }
            if (response.data[`${field}By`]) {
              fileUploadersObj[field] = response.data[`${field}By`];  
            }
          });
          setExistingFiles(existingFilesObj);
          setFileUploaders(fileUploadersObj);
        } else if (['observation', 'tbt'].includes(type)) {
          setExistingImages(response.data.image || []);
        } else if (['audit', 'drill', 'hse', 'training'].includes(type)) {
          setExistingFile(response.data.file);
        }
        setLoading(false);

      } catch (error) {
        setApiError("Failed to fetch report data");
        setLoading(false);

      }
    };
    fetchData();
  }, [id, type]);

  const handleFileChange = (event, fieldName) => {
    if (type === 'abnormal') {
      const file = event.target.files[0];
      const validTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

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
      setExistingFiles(prev => ({ ...prev, [fieldName]: null }));
      setFileErrors(prev => ({ ...prev, [fieldName]: null }));
    } else if (['audit', 'drill', 'hse', 'training'].includes(type)) {
      const file = event.target.files[0];
      const validTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      if (file && (!validTypes.includes(file.type) || file.size > 5 * 1024 * 1024)) {
        setFileErrors(prev => ({
          ...prev,
          file: validTypes.includes(file.type)
            ? 'Maximum file size is 5MB'
            : 'Please upload PDF or Word documents only',
        }));
        return;
      }

      setFiles(prev => ({ ...prev, file }));
      setExistingFile(null);
      setFileErrors(prev => ({ ...prev, file: null }));
    } else {
      const files = Array.from(event.target.files);
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      
      const validFiles = files.filter(file => 
        validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024
      );

      setImageFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleRemoveExistingFile = (fieldName) => {
    setExistingFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fieldName];
      return newFiles;
    });
  };

  const handleRemoveExistingImage = (imagePath) => {
    setExistingImages(prev => prev.filter(img => img !== imagePath));
    setImagesToDelete(prev => [...prev, imagePath]);
  };

  const handleRemoveNewImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getInitialValues = () => {
    const baseValues = {
      project: initialData?.project._id, // Replace with the actual project name if needed
    };
    console.log('pcd', baseValues.project)
    switch (type) {
      case 'abnormal':
        return {
          ...baseValues,
          location: initialData?.location || '',
          description: initialData?.description || '',
          eventType: initialData?.eventType || ''
        };
      case 'tbt':
        return {
          ...baseValues,
          location: initialData?.location || '',
          topic: initialData?.topic || '',
          numberOfAttendees: initialData?.numberOfAttendees || '',
          imagesToDelete: []
        };
      case 'audit':
      case 'drill':
      case 'hse':
        return {
          ...baseValues,
          date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
          type: initialData?.type || ''
        };
      case 'training':
        return {
          ...baseValues,
          date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
          topic: initialData?.topic || '',
          numberOfAttendees: initialData?.numberOfAttendees || ''
        };
      default:
        return {
          ...baseValues,
          location: initialData?.location || '',
          description: initialData?.description || '',
          type: initialData?.type || ''
        };
    }
  };



  
  const formik = useFormik({
    initialValues: getInitialValues(),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      setIsUploading(true);
      setUploadProgress(0);
      const formData = new FormData();
      
      Object.keys(values).forEach(key => {
        if (key !== 'imagesToDelete') {
          formData.append(key, values[key]);
        }
      });
      
      if (['audit', 'drill', 'hse', 'training'].includes(type)) {
        if (files.file) {
          formData.append('file', files.file);
        } 
        formData.append('existing_file', existingFile ? 'true' : 'false');

      } else if (type === 'abnormal') {
        const fileFields = ['initialReport', 'investigationReport', 'actionPlan', 'lessonLearned', 'closeoutReport'];
        fileFields.forEach(field => {
          if (files[field]) {
            formData.append(field, files[field]);
            formData.append(`${field}By`, '67b0121b61d73eb526515a6d');

          }
          if (existingFiles[field]) {
            formData.append(`existing_${field}`, 'true');
            
          } else {
            formData.append(`existing_${field}`, 'false');
          }
        });
      } else {
        imageFiles.forEach(file => {
          formData.append('images', file);
        });
        
        if (imagesToDelete.length > 0) {
          formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
        }
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setApiError("Authentication token is missing.");
        setLoading(false);
        setIsUploading(false);
                return;
      }

      try {
        const response = await axios.put(
          getApiEndpoint()+'/admin',
          formData,
          { 
            headers: { 
              'Content-Type': 'multipart/form-data', 
              'Authorization': `Bearer ${token}` 
            } ,
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          }
        );
     
        
        setApiError("");
        setLoading(false);
        setIsUploading(false);
        router.back();

      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        setApiError(errorMessage);
        setLoading(false);
        setIsUploading(false);      }
    }
  });
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setApiError("Authentication token is missing.");
      return;
    }
    setLoading(true)

    try {
      await axios.delete(getApiEndpoint(), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
     
      setApiError(""); 
      setLoading(false)
    

      router.back();
        } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while deleting the report.";
      setApiError(errorMessage);
      setLoading(false)

    }
  };
  if (!initialData) {
    return <div>Loading...</div>;
  }



  return (
    <div className="w-full relative p-4 h-full md:h-full overflow-y-auto dark:text-subtextcolor flex gap-3 justify-center rounded-main">
 {loading && !isUploading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <div className="loader"></div>
        </div>
      ) :            <form onSubmit={formik.handleSubmit} className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center dark:bg-blackgrey bg-boxcolor">
        <div className="w-full flex items-center gap-2">
          <Icon
            className={`text-xl ${
              type === 'abnormal' ? 'text-redcolor' : 
              type === 'audit' ? 'text-bluecolor' :
              type === 'drill' ? 'text-purplecolor' :
              type === 'hse' ? 'text-tealcolor' :
              type === 'training' ? 'text-indigocolor' :
              type === 'tbt' ? 'text-greencolor' : 'text-orangecolor'
            } duration-300`}
            icon={
              type === 'abnormal' ? "icon-park-solid:abnormal" : 
              type === 'audit' ? "mdi:clipboard-check" :
              type === 'drill' ? "mdi:run-fast" :
              type === 'hse' ? "mdi:shield-check" :
              type === 'training' ? "mdi:school" :
              type === 'tbt' ? "mdi:talk" : "weui:eyes-on-filled"
            }
          />
          <span className="self-start font-bold">
            Edit {type.charAt(0).toUpperCase() + type.slice(1)} Report
          </span>
        </div>
   {/* عرض شريط التقدم أثناء الرفع فقط */}
   {isUploading && (
                     <EnhancedProgressBar progress={uploadProgress} isUploading={isUploading} />

          )}
        {/* Date field for relevant report types */}
        {['audit', 'drill', 'hse', 'training'].includes(type) && (
          <div className="w-full">
            <Addinput 
              label="Date" 
              name="date" 
              type="date" 
              value={formik.values.date} 
              onChange={formik.handleChange} 
            />
            {formik.touched.date && formik.errors.date && (
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.date}
              </span>
            )}
          </div>
        )}

        {/* Location field for specific report types */}
        {['abnormal', 'tbt', 'observation'].includes(type) && (
          <div className="w-full">
            <Addinput 
              label="Location" 
              name="location" 
              type="text" 
              value={formik.values.location} 
              onChange={formik.handleChange} 
            />
            {formik.touched.location && formik.errors.location && (
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.location}
              </span>
            )}
          </div>
        )}

        {/* Type selection for different report types */}
        {['audit', 'drill', 'hse', 'observation', 'abnormal'].includes(type) && (
          <div className="flex flex-col gap-1 p-2 w-full">
            <label htmlFor="type" className="text-sm font-semibold">
              {type.charAt(0).toUpperCase() + type.slice(1)} Type
            </label>
            <select
              id="type"
              name={type === 'abnormal' ? 'eventType' : 'type'}
              value={type === 'abnormal' ? formik.values.eventType : formik.values.type}
              onChange={formik.handleChange}
              className="shadow-sm dark:bg-darkbox dark:border-darkbox border-border border-2 rounded-main p-2"
            >
              <option value="">Select Type</option>
              {type === 'abnormal' && ['Near miss', 'Property Damage', 'Environmental Harm', 
                'First Aid', 'Medical Treatment', 'LTI', 'Fatality'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
              {type === 'audit' && auditTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
              {type === 'drill' && drillTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
              {type === 'hse' && hseTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
              {type === 'observation' && observationTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}

        {/* Training and TBT specific fields */}
        {['training', 'tbt'].includes(type) && (
          <>
            <Addinput 
              label="Topic" 
              name="topic" 
              type="text" 
              value={formik.values.topic} 
              onChange={formik.handleChange} 
            />
            <Addinput 
              label="Number of Attendees" 
              name="numberOfAttendees" 
              type="number" 
              value={formik.values.numberOfAttendees} 
              onChange={formik.handleChange} 
            />
          </>
        )}

        {/* Description field for specific types */}
        {['abnormal', 'observation'].includes(type) && (
          <>
          <div className="w-full">
            <Addinput 
              label="Description" 
              name="description" 
              type="text" 
              value={formik.values.description} 
              onChange={formik.handleChange} 
            />
            {formik.touched.description && formik.errors.description && (
              <span className="error-message ml-2 text-xs font-bold text-redcolor">
                *{formik.errors.description}
              </span>
            )}
          </div>
          {/* Status display */}
<div className=" absolute right-8 top-8  flex items-center justify-center mb-2">
  <span className={`px-4 py-1 rounded-full text-white ${
    initialData.status === 'Open' ? 'bg-greencolor' : 'bg-redcolor'
  }`}>
    {initialData.status}
  </span>
</div>
          <div className="mt-4 w-full flex justify-center">
          {initialData.status === 'Open' && (
            <button
              type="button"
              onClick={async () => {
                if (window.confirm('Are you sure you want to close this report?')) {
                  const token = localStorage.getItem('token');
                  try {
                    await axios.patch(
                      `${process.env.NEXT_PUBLIC_API}/api/${type === 'abnormal' ? 'abnormal-events' : 'observations'}/close/${id}`,
                      {},
                      { headers: { 'Authorization': `Bearer ${token}` } }
                    );
                    router.back();
                  } catch (error) {
                    setApiError("Failed to close report: " + (error.response?.data?.message || "Unknown error"));
                  }
                }
              }}
              className="flex items-center gap-2 rounded-full w-full md:w-96 hover:opacity-80 duration-200 bg-red-500 text-white text-lg font-bold py-3 px-8"
            >
              <Icon icon="mdi:lock-check" width="24" height="24" />
              Close This Report
            </button>
          )}
        </div></>
        )}

        {/* File upload sections */}
        <div className="w-full p-4 border-2  rounded-main border-darkbox">
          <h3 className="text-lg font-semibold mb-4">
            {type === 'abnormal' ? 'Document Attachments' : 
             ['audit', 'drill', 'hse', 'training'].includes(type) ? 'Report File' : 'Images'}
          </h3>
          
          {type === 'abnormal' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['initialReport', 'investigationReport', 'actionPlan', 'lessonLearned', 'closeoutReport']
                .map((field) => (
                  <div key={field} className="relative">
                    <label className="block mb-2 text-sm font-medium">
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                        {fileUploaders[field] &&
                          <span className="text-xs ml-2 text-gray-500">Uploaded by {fileUploaders[field].name} </span>
                        }
                      </label>
                    <div className="flex items-center gap-2">
                      {existingFiles[field] ? (
                        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                          <span className="text-sm truncate max-w-[200px]">
                            {existingFiles[field].split('/').pop()}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingFile(field)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Icon icon="material-symbols:delete-rounded" width="24" height="24" />
                          </button>
                        </div>
                      ) : (
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, field)}
                          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                      )}
                    </div>
                    {fileErrors[field] && (
                      <p className="text-red-500 text-xs mt-1">{fileErrors[field]}</p>
                    )}
                  </div>
                ))}
            </div>
          ) : ['audit', 'drill', 'hse', 'training'].includes(type) ? (
            <div className="w-full">
              {existingFile ? (
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                  <span className="text-sm truncate max-w-[200px]">
                    {existingFile.split('/').pop()}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExistingFile(null)}
                    className="text-red-500  hover:text-red-700"
                  >
                    <Icon icon="material-symbols:delete-rounded" width="24" height="24" />
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'file')}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
              )}
              {fileErrors.file && (
                <p className="text-red-500 text-xs mt-1">{fileErrors.file}</p>
              )}
            </div>
          ) : (
            // Observation image handling
            <div>
              {/* Existing images */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {existingImages.map((imagePath, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imagePath}
                      alt={`Existing image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-main"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(imagePath)}
                      className="absolute top-2 right-2 bg-redcolor bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon icon="material-symbols:delete-rounded" width="24" height="24" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-main"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute top-2 right-2 bg-redcolor text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon icon="material-symbols:delete-rounded" width="24" height="24" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Image upload input */}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>
          )}
        </div>

        {/* Error display */}
        {apiError && 
          <div className={`text-${type === 'abnormal' ? 'red' : 
            type === 'audit' ? 'main' :
            type === 'drill' ? 'main' :
            type === 'hse' ? 'main' :
            type === 'training' ? 'main' :
            type === 'tbt' ? 'green' : 'orange'}color text-sm font-bold`}
          >
            Error: {apiError}
          </div>
        }

        {/* Submit button */}
        <button
          type="submit"
          className={`rounded-full w-full md:w-96 hover:bg-${
            type === 'abnormal' ? 'red' : 
            type === 'audit' ? 'main' :
            type === 'drill' ? 'main' :
            type === 'hse' ? 'main' :
            type === 'training' ? 'main' :
            type === 'tbt' ? 'green' : 'orange'
          }color duration-200 bg-dark${
            type === 'abnormal' ? 'red' : 
            type === 'audit' ? 'bluec' :
            type === 'drill' ? 'bluec' :
            type === 'hse' ? 'bluec' :
            type === 'training' ? 'bluec' :
            type === 'tbt' ? 'green' : 'orange'
          } text-subtextcolor text-xl font-black py-3 px-8`}
        >
          Update {type.charAt(0).toUpperCase() + type.slice(1)} Report
          </button>
          <button
  type="button"
  onClick={handleDelete}
  className="rounded-full w-full md:w-96 bg-backgroundcolor hover:bg-redcolor dark:text-textcolor duration-200 text-white text-xl font-black py-3 px-8"
>
  Delete {type.charAt(0).toUpperCase() + type.slice(1)} Report
</button>
      </form>}
    </div>
  );
};

export default EditPage;