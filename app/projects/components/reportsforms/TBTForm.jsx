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
  const [imageFiles, setImageFiles] = useState([]); // تعديل هنا
  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(false)
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
       setLoading(true)
      const formData = new FormData();
      Object.keys(values).forEach(key => formData.append(key, values[key]));
      imageFiles.forEach(file => formData.append('images', file)); // تعديل هنا


      const token = localStorage.getItem('token');
      if (!token) {
        setApiError("Authentication token is missing.");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/tbts/admin`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } }
        );

        setSubmitStatus({
          success: true,
          error: null
        });
        console.log('observations created:', response.data);

        formik.resetForm();
        setLoading(false)

        setImageFiles([]); // إعادة تعيين الصور
        setFormKey(prev => prev + 1);
        setApiError("");
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        setSubmitStatus({
          success: false,
          error: errorMessage
        });
        setApiError(errorMessage);
      }
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // تأكد من تعريف المتغير هنا
    setImageFiles(prev => [...prev, ...files]); // استخدام imageFiles
};

const handleRemoveImage = (index) => {
  setImageFiles(prev => prev.filter((_, i) => i !== index)); // إزالة الصورة من المصفوفة
};
  return (
    <div className="w-full h-full md:h-full overflow-y-auto flex gap-3 justify-center rounded-main">
      
      {loading?<div className='w-full h-full flex justify-center items-center'><div className="loader"></div></div>:

      <form onSubmit={formik.handleSubmit} className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center dark:text-subtextcolor dark:bg-blackgrey  bg-boxcolor">
        <div className="w-full flex items-center gap-2">
          <Icon
            className="text-xl text-greencolor duration-300"
            icon="mdi:talk"
          />
          <span className="self-start font-bold">New TBT</span>
        </div>
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
        
            <div className=" ml-2 items-center relative  p-1 gap-2 rounded-main flex  ">
              <label className=" flex gap-3 flex-col">Image
              <input
                className=" rounded-full   w-28 cursor-pointer file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr file:bg-lightgreen file:text-white hover:file:bg-greencolor"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
              /></label>


{imageFiles.length > 0 && (
             <div className="flex flex-col mt-2">
             {imageFiles.map((file, index) => (
               <div key={index} className="flex justify-between items-center">
                 <span className="text-xs overflow-hidden self-end text-greencolor mt-1">
                   {file.name}
                 </span>
                 <button
                   type="button"
                   onClick={() => handleRemoveImage(index)} // زر المسح
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
          className="rounded-full w-full md:w-96 hover:bg-greencolor duration-200 bg-darkgreen text-subtextcolor text-xl font-black py-3 px-8"
        >
          Submit TBT
        </button>
      </form>}
    </div>
  );
};

export default TBTForm;