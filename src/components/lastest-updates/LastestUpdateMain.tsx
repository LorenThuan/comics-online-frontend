import React from 'react'
import LastestUpdateContent from './LastestUpdateContent'
import SidebarIcon from '../icon/SidebarIcon'
import { GrLinkNext } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../context/StateContext'

const LastestUpdateMain = () => {
  const navigate = useNavigate();
  const {setSelected} = useStateContext();

  return (
    <div className='h-auto'>
      <div className='pb-8'>
        <div className='flex justify-between items-center mb-4 mt-8'>
          <h1 className='text-2xl font-semibold cursor-pointer'>Lastest Updates</h1>
          <div 
          onClick={() => {
            setSelected("latest_updates")
            navigate("/titles/latest")
          }} className='cursor-pointer p-3 hover:bg-gray-200 rounded-full'>
            <SidebarIcon icon={<GrLinkNext size="18" />} />
          </div>
        </div>
        
       <LastestUpdateContent/>
      </div>
    </div>
  )
}

export default LastestUpdateMain