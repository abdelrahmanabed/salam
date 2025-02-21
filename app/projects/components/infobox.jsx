import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

const InfoBox = (props) => {
  return (
    <Link href={props.href} className={`${props.linkcolor} flex-col  flex justify-between  bg-hovercolor rounded-main w-full font-semibold  md:h-24 p-3 `}>
        <div className=' flex gap-2 items-center '>
            <Icon className={`${props.iconcolor} h-8 w-8 min-w-8 bg-boxcolor rounded-full p-1`} icon={props.icon} width="24" height="24" />
            <span className={props.textcolor}>{props.text}</span>
        </div>
        
        <span className={`' font-bold text-xl self-end ${props.valuecolor}`} >
            {props.value}
        </span>
    </Link>
  )
}

export default InfoBox