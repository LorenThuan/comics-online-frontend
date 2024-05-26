import React from 'react'
import SidebarIcon from '../icon/SidebarIcon'
import { FiUser } from "react-icons/fi";

const User = () => {
  return (
    <div className='fixed top-0 right-0 m-0 mt-2 mx-5 h-10 w-10 rounded-full bg-white-rgb flex justify-center items-center' >
      <SidebarIcon icon={<FiUser size="32"/>}/>
    </div>
  )
}

export default User