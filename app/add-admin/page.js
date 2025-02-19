'use client'
import React, { useState } from 'react'
import Addinputdiv from './components/Addinputdiv'
import Select from './components/SelectRole'
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const page = () => {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

 
  const formik = useFormik({
    initialValues: {
      name: '',
      id: '',
      password: '',
      role: 'Admin',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      id: Yup.string().min(6,'id must be at least 6 characters').required('id is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      const formData = new FormData();

      // Append all form values
      formData.append('name', values.name);
      formData.append('id', values.id);
      formData.append('password', values.password);
      formData.append('role', values.role);
      // Append the image file
    

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/admins`, formData, {
            headers: { 'Content-Type': 'application/json' },
        });
        setLoading(false)
        console.log('User created:', response.data);
      } catch (error) {
        setLoading(false)
        const errorMessage = error.response?.data?.message || "An error occurred";
        
        // Check if the error contains 'phone' or 'email'
        
          setApiError(errorMessage );
        
        
        console.error('Error creating user:', errorMessage);
      }
    },
  });

  return (
    <div className=' p-4 flex gap-3 justify-center dark:text-subtextcolor lg:bg-maincolor bg-darkbluec m-2 rounded-main'>
      <div className='hidden justify-center items-center  lg:flex w-full'> 
        <span className=' text-7xl font-black text-center lg:text-darkbluec   text-maincolor'>ADD A NEW ADMIN</span>
      </div>
        {loading? <div className=' w-full h-96 flex justify-center items-center'><div className='loader'></div></div>:
        
        <form  onSubmit={formik.handleSubmit} className='w-full md:min-w-[700px] shadow-sm shadow-darkbluec flex flex-col gap-4 rounded-main p-4 items-center dark:bg-darkbox bg-boxcolor'>
            <div className=' w-full lg:hidden'>
                <span className=' self-start font-bold'>Add New Admin</span>
            </div>
            <div className=' grid w-full sm:grid-cols-2'>
              <div>
            <Addinputdiv label='Name' name='name' for='name' type='text' value={formik.values.name} onChange={formik.handleChange} />
            {formik.touched.name && formik.errors.name ? <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.name}</span> : null}
          </div>
          <div>
          <Addinputdiv label='ID' name='id' for='id' type='text' value={formik.values.id} onChange={formik.handleChange} />
          {formik.touched.id && formik.errors.id ? <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.id}</span> : null}
           {apiError.id && <span className="error-message ml-2 text-xs font-bold text-redcolor">*{apiError.id}</span>}
         </div>
         <div>
          <Addinputdiv label='Password' name='password' for='password' type='password' value={formik.values.password} onChange={formik.handleChange} />
          {formik.touched.password && formik.errors.password ? <span className="error-message ml-2 text-xs font-bold text-redcolor">*{formik.errors.password}</span> : null}
        </div> 
 
          <Select label='Role' name='role' for='role' value={formik.values.role} onChange={formik.handleChange} />
            </div>
<span className='text-redcolor'>{apiError}</span>
        <input type='submit' value='Add Admin' className=' rounded-full w-full md:w-96  bg-maincolor text-subtextcolor text-xl font-black py-3 px-8'/>
        </form>}
    </div> 
  )
}

export default page