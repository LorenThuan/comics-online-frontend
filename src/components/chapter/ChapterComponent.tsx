import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Chapter, ImageProps } from '../constants/types';
import ImageComponent from './ImageComponent';
import useComicList from '../../hooks/CrudComicList';
import ChapterSelectPopup from './ChapterSelectPopup';
import SidebarIcon from '../icon/SidebarIcon';
import { FaAngleDown } from 'react-icons/fa';

const ChapterComponent = () => {
  let location = useLocation();
  const { comicItem, chapterFind } = location.state || {};
  const {images, fetchImages} = useComicList();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchImages(chapterFind.chapterId);
  }, [])

  return (
    <div className=''>
      <div className='my-2 text-center'>
      <div className='text-xl'>{chapterFind.chapterNumber}</div>
      <div className='text-orange-400'>{comicItem.nameComic}</div>
      </div>
      {images.map((image: ImageProps, index: number) => (
      <ImageComponent
      key={index}
      contentType={image.contentType}
      data={image.data}
      filename={image.filename}
      />
      ))}
      <div 
      className="fixed bottom-0 left-0 bg-black p-2 w-screen border rounded flex justify-center">
        <div 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className='bg-gray-50 h-[34px] 
        text-gray-900 text-sm w-[337px] flex justify-between items-center cursor-pointer'>
        <div
       
          className=""
        >
          {comicItem.chapterList?.length ?? 0 > 0 ? chapterFind?.chapterNumber : ''}
        </div>
        <SidebarIcon className="" icon={<FaAngleDown size={14} />}/>
        </div>
        {isDropdownOpen && (
          <ChapterSelectPopup data={comicItem} setIsDropdownOpen={setIsDropdownOpen}/>
        )}
      </div>
    </div>
  )
}

export default ChapterComponent