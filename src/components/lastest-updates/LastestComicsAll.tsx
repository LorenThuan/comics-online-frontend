import React from 'react'
import SidebarIcon from '../icon/SidebarIcon'
import { GrLinkPrevious } from "react-icons/gr";

const LastestComicsAll = () => {
  return (
    <div className='h-auto'>
      <div className='container pb-8'>
            <div className='flex gap-4 place-items-center'>
             <SidebarIcon icon={<GrLinkPrevious size="18"/>}/>
            
        <h1 className='text-2xl font-semibold'>Latest Updates</h1>
            </div>
      </div>
    </div>
  )
}

export default LastestComicsAll