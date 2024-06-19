import React from 'react'
import Neko from "../../../assets/MangaDex.png"

const UserList = () => {
  return (
    <div className='bg-slate-200 px-3 py-2 flex justify-between items-center cursor-pointer rounded-md hover:bg-slate-300'>
      <div className='flex space-x-2'>
        <img src={Neko} alt="" className='w-6 h-6 object-cover rounded-full'/>
        <h2 className='font-semibold'>UserName</h2>
      </div>
      <div className='bg-gray-100 px-2 py-0.5 text-center rounded'>
        <p className='text-sm'>Member</p>
      </div>
    </div>
  )
}

export default UserList