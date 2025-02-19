import { Icon } from '@iconify/react'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
const AdminBut = ({ adminrole ,_id,id, name, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`هل أنت متأكد من حذف ${name}؟`)
    if (!confirmDelete) return

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/admins/${_id}`)
      onDelete(_id) // تحديث القائمة بعد الحذف
    } catch (error) {
      console.error('Error deleting admin:', error)
      alert('فشل في حذف الأدمن')
    }
  }

  return (<div  className='  dark:text-subtextcolor relative'>
<Link href='' className='dark:hover:border-subtextcolor group flex  items-center hover:border-subcolor duration-200 gap-2 p-2 relative  border w-full rounded-main border-darkgrey h-fit'>
{adminrole==='Admin'? 
                  <Icon icon='eos-icons:admin'  width="30" height="30" /> :
                <Icon icon="dashicons:superhero"  width="30" height="30" />}
            
            <div className=' flex flex-col gap-1'>
                <span className=' '>
                {name}</span>
                <span className=' text-xs text-darkgrey'>ID {id}</span>
            </div>
         
           <Icon className=' group-hover:bg-maincolor duration-300 dark:bg-blackgrey  bg-hovercolor h-10 w-10 p-2 rounded-full absolute right-2 bottom-2 -rotate-90' icon="ep:arrow-down-bold" width="15" height="15" />
           
    </Link>
    <button 
        onClick={handleDelete} 
        className="absolute top-1/2 -translate-y-1/2 right-14 dark:bg-darkred dark:hover:bg-redcolor hover:bg-redcolor dark:text-textsubcolor bg-lightred   p-2 rounded-full transition duration-200"
      >
        <Icon icon="mdi:trash-can-outline" width="20" height="20" />
      </button>
    </div>
    )
}

export default AdminBut