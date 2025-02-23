import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import AddinputC from '../../../addproject/components/AddinputC';

const NoteForm = () => {
  const { _id: projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [apiError, setApiError] = useState("");
  const [files, setFiles] = useState({ images: [], files: [] });
  const [fileErrors, setFileErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: null });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const noteTypes = ['Warning', 'Notice', 'Alert', 'Reminder', 'News', 'Thank', 'Promote'];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const params = new URLSearchParams({
          currentProject: projectId,
          search: searchTerm
        });
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/users?${params}`);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    if (projectId) fetchUsers();
  }, [projectId, searchTerm]);
if(!projectId){
  return <span>loading</span>
}
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
      content: '',
      type: 'Notice',
      targetDate: '',
      projectId: projectId
    },
    onSubmit: async (values) => {
      setLoading(true);
      setIsUploading(true);
      setUploadProgress(0);
            const formData = new FormData();

      Object.keys(values).forEach(key => formData.append(key, values[key]));
      selectedUsers.forEach(user => formData.append('usersId[]', user._id));
      files.images.forEach(file => formData.append('images', file));
      files.files.forEach(file => formData.append('files', file));

      try {
        const token = localStorage.getItem('token');
        await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/notes`,
          formData,
          { 
            headers: { 
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            } 
          }
        );
        setSubmitStatus({ success: true, error: null });
        formik.resetForm();
        setSelectedUsers([]);
        setFiles({ images: [], files: [] });
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        setSubmitStatus({ success: false, error: errorMessage });
      } finally {
        setLoading(false);
        setIsUploading(false);
            }
    }
  });

  const handleFileChange = (event, type) => {
    const newFiles = Array.from(event.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    const validTypes = type === 'images' ? validImageTypes : validFileTypes;
    const maxSize = 5 * 1024 * 1024; // 5MB

    const invalidFiles = newFiles.filter(file => 
      !validTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      setFileErrors(prev => ({
        ...prev,
        [type]: `Invalid ${type}: Please check file type and size (max 5MB)`
      }));
      return;
    }

    setFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...newFiles]
    }));
    setFileErrors(prev => ({ ...prev, [type]: null }));
  };
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
  const removeFile = (index, type) => {
    setFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="w-full rounded-main">
      {loading && !isUploading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <div className="loader"></div>
        </div>
      )  : (
        <form onSubmit={formik.handleSubmit} className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center bg-boxcolor dark:bg-blackgrey">
          <div className="w-full flex items-center gap-2">
            <Icon className="text-xl text-maincolor duration-300" icon="material-symbols:note-add" />
            <span className="self-start font-bold">New Note</span>
          </div>
          {isUploading && (
                     <EnhancedProgressBar progress={uploadProgress} isUploading={isUploading} />

          )}
          {submitStatus.success && (
            <div className="w-full p-4 mb-4 text-green-700 bg-green-100 rounded-main">
              Note created successfully!
            </div>
          )}

          {submitStatus.error && (
            <div className="w-full p-4 mb-4 text-red-700 bg-red-100 rounded-main">
              {submitStatus.error}
            </div>
          )}

          <div className="w-full">
            <div className="relative">
              
              <select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                className="w-full py-3  p-2 border-2 dark:bg-blackgrey dark:border-subtextcolor rounded-main border-border"
              >
                {noteTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className='mt-2'>
              <AddinputC
                label="Content"
                name="content"
                type="textarea"
                value={formik.values.content}
                onChange={formik.handleChange}
              />
            </div>

            <div className="relative mt-2">
              <Icon 
                icon="iconamoon:search-fill" 
                className="text-bluecolor bg-backgroundcolor dark:bg-darkbox p-1 rounded-circle absolute pointer-events-none top-1/2 -translate-y-1/2 left-1.5" 
                width="28" 
                height="28" 
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-[10px] pl-10 border-2 dark:bg-darkbox dark:border-blackgrey rounded-main border-border"
              />
              {users.length > 0 && searchTerm && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-blackgrey rounded-main shadow-lg max-h-48 overflow-y-auto border-2 border-border dark:border-blackgrey">
                  {users.map(user => (
                    <div
                      key={user._id}
                      onClick={() => {
                        if (!selectedUsers.find(u => u._id === user._id)) {
                          setSelectedUsers(prev => [...prev, user]);
                        }
                        setSearchTerm('');
                      }}
                      className="p-2 flex items-center gap-2 hover:bg-hovercolor dark:hover:bg-darkbox cursor-pointer"
                    >
                     <img className=' rounded-full h-8 w-8' src={`${process.env.NEXT_PUBLIC_API}${user.image}`} alt=''></img> {user.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-2 mt-2">
              {selectedUsers.map(user => (
                <div key={user._id} className="bg-maincolor text-subtextcolor px-2 py-1 rounded-full flex items-center gap-2">
                  <span>{user.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedUsers(prev => prev.filter(u => u._id !== user._id))}
                    className="hover:text-redcolor"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="">
              <AddinputC
                label="Target Date"
                name="targetDate"
                type="date"
                value={formik.values.targetDate}
                onChange={formik.handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="relative  p-1 rounded-main flex flex-col">
               <div className=' flex gap-2 '> 
                <label> Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, 'images')}
                  className="rounded-full text-xs w-24 cursor-pointer file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr file:bg-darkrose file:text-subtextcolor hover:file:bg-pinkcolor"
                />
                {fileErrors.images && (
                  <span className="text-xs text-redcolor mt-1">
                    {fileErrors.images}
                  </span>
                )}</div>
                <div className="mt-2">
                  {files.images.map((file, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-xs overflow-clip text-greencolor">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index, 'images')}
                        className="bg-redcolor flex items-center justify-center h-4 w-4 rounded-circle text-xs font-bold hover:text-darkpink"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative p-1 rounded-main flex flex-col">
               <div className=' flex gap-2'> 
                Files<input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={(e) => handleFileChange(e, 'files')}
                  className="rounded-full text-xs w-24 cursor-pointer file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr file:bg-darkrose file:text-subtextcolor hover:file:bg-pinkcolor"
                />
                {fileErrors.files && (
                  <span className="text-xs text-redcolor mt-1">
                    {fileErrors.files}
                  </span>
                )}</div> 
                <div className="mt-2">
                  {files.files.map((file, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-xs overflow-clip text-greencolor">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index, 'files')}
                        className="bg-redcolor flex items-center justify-center h-4 w-4 rounded-circle text-xs font-bold hover:text-darkpink"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    {/* عرض معلومات إجمالي الملفات إذا كان هناك ملفات */}

          {apiError && (
            <div className="text-redcolor text-sm font-bold">
              Error: {apiError}
            </div>
          )}

          <button
            type="submit"
            className="rounded-full text-nowrap w-full md:w-96 hover:bg-darkbluec duration-200 bg-maincolor text-subtextcolor text-xl font-black py-3 px-8"
          >
            Submit Note
          </button>
        </form>
      )}
    </div>
  );
};

export default NoteForm;