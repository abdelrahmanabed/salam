// 'use client'
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import { Icon } from '@iconify/react';
// import { useParams } from 'next/navigation';
// import Addinput from '../../components/reportsforms/Addinput';
// import { useUser } from '../../context/UserContext';

// const EditPage = () => {
//   const { id, type } = useParams();
//   const { user } = useUser();
//   const [apiError, setApiError] = useState("");
//   const [files, setFiles] = useState({});
//   const [fileErrors, setFileErrors] = useState({});
//   const [imageFiles, setImageFiles] = useState([]);
//   const [initialData, setInitialData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const endpoint = type === 'abnormalُ' ? 
//           `http://localhost:5000/api/abnormal-events/${id}` : 
//           `http://localhost:5000/api/observations/${id}`;
        
//         const response = await axios.get(endpoint, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         setInitialData(response.data);
//       } catch (error) {
//         setApiError("Failed to fetch report data");
//       }
//     };
//     fetchData();
//   }, [id, type]);

//   const abnormalValidationSchema = Yup.object({
//     location: Yup.string().required('Location is required'),
//     eventType: Yup.string()
//       .required('Event Type is required')
//       .oneOf(['Near miss', 'Property Damage', 'Environmental Harm', 
//               'First Aid', 'Medical Treatment', 'LTI', 'Fatality']),
//     description: Yup.string().required('Description is required'),
//   });

//   const observationValidationSchema = Yup.object({
//     location: Yup.string().required('Location is required'),
//     type: Yup.string().required('Observation Type is required'),
//     description: Yup.string().required('Description is required'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       location: initialData?.location || '',
//       description: initialData?.description || '',
//       ...(type === 'abnormal' ? {
//         eventType: initialData?.eventType || ''
//       } : {
//         type: initialData?.type || ''
//       }),
//       status: initialData?.status || 'Open',
//       project: user.currentProject
//     },
//     validationSchema: type === 'abnormal' ? abnormalValidationSchema : observationValidationSchema,
//     enableReinitialize: true,
//     onSubmit: async (values) => {
//       const formData = new FormData();
//       Object.keys(values).forEach(key => formData.append(key, values[key]));
      
//       if (type === 'abnormal') {
//         Object.keys(files).forEach(key => {
//           if (files[key]) formData.append(key, files[key]);
//         });
//       } else {
//         imageFiles.forEach((file, index) => {
//           formData.append('images', file);
//         });
//       }

//       const token = localStorage.getItem('token');
//       if (!token) {
//         setApiError("Authentication token is missing.");
//         return;
//       }

//       try {
//         const endpoint = type === 'abnormal' ?
//           `http://localhost:5000/api/abnormal-events/${id}` :
//           `http://localhost:5000/api/observations/${id}`;

//         await axios.put(
//           endpoint,
//           formData,
//           { 
//             headers: { 
//               'Content-Type': 'multipart/form-data', 
//               'Authorization': `Bearer ${token}` 
//             } 
//           }
//         );

//         setApiError("");
//         // Handle successful update (e.g., redirect or show success message)
//       } catch (error) {
//         const errorMessage = error.response?.data?.message || "An error occurred";
//         setApiError(errorMessage);
//       }
//     },
//   });

//   const handleFileChange = (event, fieldName) => {
//     if (type === 'abnormal') {
//       const file = event.target.files[0];
//       const validTypes = ['application/pdf', 'application/msword', 
//                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

//       if (file && (!validTypes.includes(file.type) || file.size > 5 * 1024 * 1024)) {
//         setFileErrors(prev => ({
//           ...prev,
//           [fieldName]: validTypes.includes(file.type)
//             ? 'Maximum file size is 5MB'
//             : 'Please upload PDF or Word documents only',
//         }));
//         return;
//       }

//       setFiles(prev => ({ ...prev, [fieldName]: file }));
//       setFileErrors(prev => ({ ...prev, [fieldName]: null }));
//     } else {
//       const files = Array.from(event.target.files);
//       const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      
//       const validFiles = files.filter(file => 
//         validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024
//       );

//       setImageFiles(prev => [...prev, ...validFiles]);
//     }
//   };

//   if (!initialData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="w-full h-full md:h-full overflow-y-auto flex gap-3 justify-center rounded-main">
//       <form onSubmit={formik.handleSubmit} className="shadow-sm flex flex-col w-full gap-2 rounded-main p-4 items-center bg-boxcolor">
//         {/* Form header */}
//         <div className="w-full flex items-center gap-2">
//           <Icon
//             className={`text-xl ${type === 'abnormal' ? 'text-redcolor' : 'text-orangecolor'} duration-300`}
//             icon={type === 'abnormal' ? "icon-park-solid:abnormal" : "weui:eyes-on-filled"}
//           />
//           <span className="self-start font-bold">
//             Edit {type === 'abnormal' ? 'Abnormal Event' : 'Observation'}
//           </span>
//         </div>

//         {/* Form fields */}
//         <div className="w-full">
//           <Addinput 
//             label="Location" 
//             name="location" 
//             type="text" 
//             value={formik.values.location} 
//             onChange={formik.handleChange} 
//           />
//           {formik.touched.location && formik.errors.location && 
//             <span className="error-message ml-2 text-xs font-bold text-redcolor">
//               *{formik.errors.location}
//             </span>
//           }

//           {/* Type selection */}
//           <div className="flex flex-col gap-1 p-2">
//             <label htmlFor={type === 'abnormal' ? 'eventType' : 'type'} className="text-sm font-semibold">
//               {type === 'abnormal' ? 'Event Type' : 'Observation Type'}
//             </label>
//             <select
//               id={type === 'abnormal' ? 'eventType' : 'type'}
//               name={type === 'abnormal' ? 'eventType' : 'type'}
//               value={type === 'abnormal' ? formik.values.eventType : formik.values.type}
//               onChange={formik.handleChange}
//               className="shadow-sm border-border border-2 rounded-main p-2"
//             >
//               <option value="">Select Type</option>
//               {type === 'abnormal' ? 
//                 ['Near miss', 'Property Damage', 'Environmental Harm', 
//                  'First Aid', 'Medical Treatment', 'LTI', 'Fatality'].map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 )) :
//                 [/* Your observation types array */].map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))
//               }
//             </select>
//           </div>

//           {/* Description */}
//           <Addinput 
//             label="Description" 
//             name="description" 
//             type="text" 
//             value={formik.values.description} 
//             onChange={formik.handleChange} 
//           />
//         </div>

//         {/* File uploads */}
//         <div className="grid grid-cols-2 gap-3 w-full">
//           {type === 'abnormal' ? (
//             // Abnormal event file uploads
//             ['initialReport', 'investigationReport', 'actionPlan', 'lessonLearned', 'closeoutReport']
//               .map((field) => (
//                 <div key={field} className="relative p-1 rounded-main flex">
//                   {/* File upload UI */}
//                 </div>
//               ))
//           ) : (
//             // Observation image uploads
//             <div className="relative p-1 rounded-main flex">
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleFileChange}
//                 className="rounded-full cursor-pointer file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr file:bg-lightorange file:text-white hover:file:bg-orangecolor"
//               />
//             </div>
//           )}
//         </div>

//         {/* Error messages */}
//         {apiError && 
//           <div className={`text-${type === 'abnormal' ? 'red' : 'orange'}color text-sm font-bold`}>
//             Error: {apiError}
//           </div>
//         }

//         {/* Submit button */}
//         <button
//           type="submit"
//           className={`rounded-full w-full md:w-96 hover:bg-${type === 'abnormal' ? 'red' : 'orange'}color duration-200 bg-dark${type === 'abnormal' ? 'red' : 'orange'} text-subtextcolor text-xl font-black py-3 px-8`}
//         >
//           Update {type === 'abnormal' ? 'Abnormal Event' : 'Observation'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditPage;