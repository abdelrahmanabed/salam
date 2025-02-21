import React from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const InfoBox = ({ href, linkcolor, textcolor, valuecolor, iconcolor, text, value, icon }) => {
  return (
    <Link 
      href={href || '#'} 
      className={`${linkcolor} group flex flex-col justify-between bg-hovercolor rounded-main shadow-sm hover:shadow-md transition-all duration-200 h-20 md:h-20 p-3`}
    >
      <div className='flex items-center gap-2'>
        <div className={`${iconcolor} rounded-full p-1.5 group-hover:scale-110 transition-transform duration-200`}>
          <Icon icon={icon} className="w-5 h-5" />
        </div>
        <span className={`${textcolor} text-sm font-medium`}>{text}</span>
      </div>
      <span className={`${valuecolor} text-xl font-bold self-end`}>{value}</span>
    </Link>
  )
}

export default InfoBox