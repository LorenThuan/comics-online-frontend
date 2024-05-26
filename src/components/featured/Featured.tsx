import React from 'react'
import SidebarIcon from '../icon/SidebarIcon'
import { GrLinkNext } from "react-icons/gr";
import SaladBowl from "../../assets/SaladBowl.jpg"

const Featured = () => {
  return (
    <div className='h-auto'>
      <div className='container pb-8'>

        <div className='flex justify-between items-center mb-6'>
          <div className='flex gap-4 items-center'>
          <h1 className='font-sans font-semibold text-lg cursor-pointer'>Featured</h1>
              <SidebarIcon icon={<GrLinkNext size="18" className='cursor-pointer'/>}/>
              <h1 className='font-sans font-semibold text-lg cursor-pointer'>Seasonal: Spring 2024</h1>
          </div>
          <div className='cursor-pointer'><SidebarIcon icon={<GrLinkNext size="18" />} /></div>
          
        </div>

        <div className='grid grid-cols-1 h-auto w-fit gap-2'>
            <img src={SaladBowl} alt="Name Img" className='object-cover h-[269px] w-full shadow-md rounded cursor-pointer'/>
            <p className='font-sans text-describes-rgb cursor-pointer'>Henjin no Salad Bowl</p>
        </div>
      </div>
    </div>
  )
}

export default Featured