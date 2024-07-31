import React, { Dispatch, useState } from 'react'
import { Chapter, ComicFull } from '../constants/types'
import SidebarIcon from '../icon/SidebarIcon'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/StateContext';

interface ChapterSelectProps {
  data: ComicFull;
  setIsDropdownOpen: (isOpen : boolean) => void;
  chapterFind: Chapter;
}

const exactChapterNumber = (chapter:string):number => {
  const parts = chapter.split(' ');
  const numberChapter = parts[1];
  return parseInt(numberChapter, 10);
}

const ChapterSelectPopup = (props: ChapterSelectProps) => {
  const navigate = useNavigate();
  const comicItem = props.data;

  const handleNavigateReading = (chapter: any) => {
    const chapterFind = chapter;
    const chapterNumber = exactChapterNumber(chapterFind.chapterNumber);
    navigate(`/chapter/${comicItem.nameComic}/Chương-${chapterNumber}`, {
      state: {comicItem, chapterFind}
    });
    window.location.reload();
  }

  return (
    <div className='fixed top-0 left-0 h-auto w-screen'>
      <div className='fixed mt-4 w-full sm:w-[430px] sm:mt-0 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-blue-300'>
        <div className='flex justify-end'>
          {/* <input type="text" className='input-search py-2 w-[321px] mr-8'
          placeholder='Enter number of chapters, example: 100'
          /> */}
          <SidebarIcon
          onClick={() => props.setIsDropdownOpen(false)} 
          className="cursor-pointer hover:bg-white rounded-full" 
          icon={<IoMdClose size={30} color='black'/>}/>
        </div>
        <hr className='border border-solid border-x-white-rgb2 w-full my-4'/>
        <div className='mt-2 grid grid-cols-3 gap-2 text-center overflow-y-auto h-[430px]'>
        {props.data?.chapterList?.map((chapter: Chapter, index: number) => (
          <div key={index} 
          onClick={() => handleNavigateReading(chapter)}
          className={`py-1 h-fit w-fit bg-white cursor-pointer disabled:opacity-50 
          rounded border-2 border-solid ${chapter === props.chapterFind ? 
            'border-orange-500' : ''}  hover:border-gray-700`}
          >
            {chapter.chapterNumber}
          </div>
        ))}
        </div>
        
      </div>
    </div>
  )
}

export default ChapterSelectPopup