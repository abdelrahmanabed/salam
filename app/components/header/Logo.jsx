import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
 
  return (
<Link href={"/"} className=' text-maincolor text-[8px] font-extralight h-full flex   items-end '>
      <Image className=' h-full ' width={50} height={50} src='/Asset3.svg'/>
      <span className=' -ml-2 text-blackgrey border px-1 rounded-full'>ADMIN</span>
      </Link>  )
}

export default Logo