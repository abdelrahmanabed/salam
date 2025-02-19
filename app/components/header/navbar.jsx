'use client'
import React from 'react'
import Navbutton from './navbuttons'
import ThemeBtn from '../ThemeBtn';

const Navbar = () => {
   const handleSignOut = () => {
      localStorage.removeItem('token')
      // إعادة التوجيه إلى صفحة تسجيل الدخول
      window.location.href = '/login';
    };
    return (
   
    <div className=' flex gap-2'>
     <ThemeBtn/>
     <Navbutton  href='/users' className="" icon='mdi:worker' text="Users"/>
      <Navbutton    href='/projects' icon='fa6-solid:helmet-safety' className="  " text="Projects"/>

      <Navbutton  href='/requests' className="" icon='mingcute:user-add-fill' text="Requests"/>
      <Navbutton onclick={()=>handleSignOut} href='/login' className="" icon='ion:log-out' />
      
    </div>
    
  )
}

export default Navbar