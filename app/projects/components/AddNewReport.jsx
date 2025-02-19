import { Icon } from '@iconify/react'
import React from 'react'

export const AddNewReport = (props) => {
  return (
    <button onClick={props.onClick} className=' items-center gap-0.5 flex fixed z-20 bottom-4 right-4 bg-darkbluec p-4 rounded-circle md:rounded-full shadow-sm shadow-subcolor'>
    <Icon icon='mage:file-upload-fill' className=' text-3xl text-lightblue sm:text-3xl md:text-3xl '  />
    <span className='md:block hidden text-subtextcolor'> Add Data</span>
    </button>
  )
}
