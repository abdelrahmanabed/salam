'use client'
import React from 'react'
import Logo from './Logo'
import Navbar from './navbar'
import { usePathname } from 'next/navigation'

const Header = () => {
  const path = usePathname()
  
  return (
    <>
    <div
    className={`${path.includes('login')  ?"hidden":"flex"} h-14 p-3  justify-between `}
    >
        <Logo/>
        <Navbar/>
    </div></>
  )
}

export default Header