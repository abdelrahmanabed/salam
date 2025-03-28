'use client'
import AdminBut from './AdminBut'
import { Icon } from '@iconify/react'
import axios from 'axios'
import Link from 'next/link'
import React, {  useEffect, useState } from 'react'
const AdminCon = () => {
    const [showed, setShowed] = useState(false)
    const [admins, setAdmins] = useState([])
    useEffect(() => {
        const fetchAdmins  = async () => {
            
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/admins`); // Endpoint to fetch a specific user
                setAdmins(data);
                console.log(admins)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

            fetchAdmins();
    }, []);
    const handleDeleteAdmin = (id) => {
        setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.id !== id))
    }
  return (
    <div className='p-2 flex flex-col w-full'>
        <div className='p-2 mb-2 dark:bg-darkbluec  bg-border rounded-main items-center flex justify-between'>

        <span  onClick={()=> setShowed(!showed)} className=' text-darkbluec dark:text-subtextcolor cursor-pointer w-full flex items-center gap-3'>
        <Icon className={`${showed?"":' -rotate-90'} font- duration-200`} icon="mingcute:down-fill" width="24" height="24" />
            Admins</span>
                 <div>
                <Link href='/add-admin' className=' bg-hovercolor hover:bg-lightgreen duration-200 rounded-full'>
                 <Icon icon="typcn:plus" className=' hover:text-subtextcolor text-maincolor hover:bg-maincolor bg-boxcolor rounded-circle' width="24" height="24" />
                </Link>
                </div>
       
       
    </div>

    <div className={`${showed? "":"h-0 px-2 py-0"} duration-200 ease-in-out  gap-2 grid md:grid-cols-2 overflow-hidden  lg:grid-cols-3`}>
    { admins.length > 0 && admins.map((a) => (
    <AdminBut adminrole={a.role} _id={a._id} key={a.id} name={a.name} id={a.id} onDelete={handleDeleteAdmin} // تمرير الدالة
        href={`/admins/${a.id}`}
    />
))}
    </div>
    
</div>  
)
}

export default AdminCon