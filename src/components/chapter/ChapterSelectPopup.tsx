import React from 'react'
import { ComicFull } from '../constants/types'
import SidebarIcon from '../icon/SidebarIcon'
import { IoMdClose } from 'react-icons/io'

interface ChapterSelectProps {
  data: ComicFull;
  setIsDropdownOpen: (isOpen : boolean) => void;
}

const ChapterSelectPopup = (props: ChapterSelectProps) => {
  return (
    <div className='fixed top-0 left-0 h-auto w-screen'>
      <div className='fixed p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-blue-300'>
        <div className='flex items-center'>
          <input type="text" className='input-search py-2 w-[321px] mr-8'
          placeholder='Enter number of chapters, example: 100'
          />
          <SidebarIcon
          onClick={() => props.setIsDropdownOpen(false)} 
          className="cursor-pointer" 
          icon={<IoMdClose size={30} color='gray'/>}/>
        </div>
        <hr className='border border-solid border-x-white-rgb2 w-full my-4'/>
        <div className='mt-2 grid grid-cols-3 gap-2 text-center'>
        {props.data?.chapterList?.map((chapter: any, index: number) => (
          <div key={index} className='py-1 bg-white cursor-pointer disabled:opacity-50 rounded border-2 border-solid border-gray-300 hover:border-gray-700'>
            {chapter.chapterNumber}
          </div>
        ))}
        </div>
        
      </div>
    </div>
  )
}

export default ChapterSelectPopup