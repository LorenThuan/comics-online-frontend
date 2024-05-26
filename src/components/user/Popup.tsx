import React, { useEffect, useRef } from 'react'
import { FiUser } from "react-icons/fi";
import SidebarIcon from '../icon/SidebarIcon';
import { IoSettingsOutline, IoWaterOutline  } from "react-icons/io5";
import VnIcon from "../../assets/vn.svg";

interface PopupProps {
  loginPopup: boolean;
  setLoginPopup:(login: boolean) => void;
  handleLoginPopup(): void;
}

const Popup = (props: PopupProps) => {
  let loginRef = useRef(null);

 useEffect(() => {
   let handle = (e:any) => {
    // @ts-ignore: Object is possibly 'null'.
    if(!loginRef.current.contains(e.target)) {
      props.setLoginPopup(false);
      console.log(loginRef.current);  
    }
    
  };

  document.addEventListener("mousedown", handle)

  return() => {
    document.removeEventListener("mousedown", handle)
  }

 });


  return (
    <>
     {props.loginPopup ?
     <div className='h-screen w-screen fixed top-0 left-0 z-20 backdrop-brightness-75'>
      <div className='fixed left-3/4 top-1/3 -translate-y-1/4 bg-white
      p-[24px] h-auto rounded-md shadow-md min-w-[256px] max-w-[320px] w-[302.906px]
      '  ref={loginRef}>
        {/*User info*/}
        <div className='flex flex-col gap-4 mt-4 items-center hover:bg-gray-200 cursor-pointer'>
        <SidebarIcon icon={<FiUser size="46"/>}/>
        <h1 className='text-2xl font-sans font-bold'>Guest</h1>
        </div>
        <hr className='border-1 border-solid border-hr-white-rgb my-4 w-full'/>
        {/*Setting*/}
        <div className='flex flex-col gap-4'>
          {/*Settings and theme*/}
          <div className='flex w-full justify-evenly'>
            <div className='flex items-center gap-2 hover:bg-gray-200 cursor-pointer '>
              <SidebarIcon icon={<IoSettingsOutline size="24"/>}/>
              <p className='text-lg'>Settings</p>
            </div>
            <div className='flex items-center gap-2 hover:bg-gray-200 cursor-pointer'>
              <SidebarIcon icon={<IoWaterOutline size="24"/>}/>
              <p className='text-lg'>Theme</p>
            </div>
          </div>
          {/*Interface Language*/}
          <div className='flex justify-evenly items-center cursor-pointer hover:bg-gray-200'>
            <p className='text-lg font-sans'>Interface Language</p>
            <p className='font-sans text-[10px] text-white font-bold py-1 px-2 bg-orange-500 rounded-lg'>BETA</p>
          </div>
          {/*Chapter Languages*/}
          <div className='flex justify-around items-center hover:bg-gray-200 cursor-pointer'>
            <p className='text-lg font-sans'>Chapter Language</p>
            <div className=''>
            <img src={VnIcon} alt="Vn icons" className='w-[20px] h-[20px] text-center'/>
            </div>
          </div>
          <div className='ml-6'>
          {/*Content Fillter*/}
          <p className='text-lg font-sans hover:bg-gray-200 cursor-pointer'>Content Fillter</p>
          </div>
          <hr className='border-1 border-solid border-hr-white-rgb my-4 w-full'/>
          {/*Login Register*/}
          <div className='flex flex-col gap-4'>
              <button className='px-10 py-2 text-lg bg-orange-500 rounded-lg text-white font-bold text-center
              hover:bg-orange-700
              '>Sign in</button>
              <button className='text-center text-lg hover:bg-gray-200 cursor-pointer'>Register</button>
          </div>
        </div>
      </div>
    </div> : null}
    </>
  )
}

export default Popup