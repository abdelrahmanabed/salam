'use client'
import React, { useState } from 'react'
import Addinputdiv from './components/Addinputdiv'
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ThemeBtn from '../components/ThemeBtn';
import Image from 'next/image';

const page = () => {
 const [apiError, setApiError] = useState("");
 const [loading, setLoading] = useState(false);
 const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
    },
    validationSchema: Yup.object({
      user: Yup.string().required('Email or phone are required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true)

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/admins/loginAdmin`, values);
        const { token } = response.data;
        setLoading(false)

        // تخزين التوكن في localStorage
        localStorage.setItem('token', token);

        // توجيه المستخدم
        window.location.href = '/';
      } catch (error) {
        setLoading(false)

        const errorMessage = error.response?.data?.message || 'An error occurred';
        setApiError(errorMessage);
        console.error('Login error:', errorMessage);
      }
    },
  });

  return (
    <div className=' p-4 w-full dark:text-subtextcolor gap-3 flex flex-col justify-center h-[500px] items-center'>
      <div  className=' text-maincolor    text-[15px] font-extralight h-full flex  flex-col justify-center  items-center '>
      <Image className=' h-full ' width={50} height={50} src='/Asset3.svg'/>
      <span className='  text-blackgrey border px-1  rounded-full'>ADMIN</span>
      </div>
    <div className=' bg-hovercolor dark:bg-blackgrey p-4 flex gap-3 items-center flex-col  w-full sm:w-96 justify-center   rounded-main'>
      <div className=' flex justify-between items-center w-full'> 
        <span className=' text-2xl font-black text-center dark:text-bluecolor   text-maincolor'>LOGIN</span>
        <ThemeBtn/>
      </div>
      {loading? <div className=' w-full h-96 flex justify-center items-center'><div className='loader'></div></div>:

        <form  onSubmit={formik.handleSubmit} className='w-full max-w-96   flex flex-col gap-2 rounded-main p-4 items-center '>
            
          
          <div className=' w-full'>
          <Addinputdiv label='ID' name='user' for='user' type='text' value={formik.values.phone} onChange={formik.handleChange} />
          {formik.touched.phone && formik.errors.phone ? <span className=" w-full error-message  text-xs font-bold text-redcolor">*{formik.errors.phone}</span> : null}
           {apiError.phone && <span className="error-message  text-xs font-bold text-redcolor">*{apiError.phone}</span>}
         </div>
         <div className=' w-full'>
          <Addinputdiv label='Password' name='password' for='password' type='password' value={formik.values.password} onChange={formik.handleChange} />
          {formik.touched.password && formik.errors.password ? <span className="error-message  text-xs font-bold text-redcolor">*{formik.errors.password}</span> : null}
        </div> 
       
      
        <span className=' text-redcolor'>{apiError}</span>

        <input type='submit' value='Login' className=' rounded-main w-full  bg-maincolor text-subtextcolor text-xl font-black py-2 '/>
        </form>}
    </div> </div>
  )
}

export default page