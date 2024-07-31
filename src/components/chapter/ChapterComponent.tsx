import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Chapter, ComicFull, ImageProps } from '../constants/types';
import ImageComponent from './ImageComponent';
import useComicList from '../../hooks/CrudComicList';
import ChapterSelectPopup from './ChapterSelectPopup';
import SidebarIcon from '../icon/SidebarIcon';
import { FaAngleDown } from 'react-icons/fa';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useStateContext } from '../../context/StateContext';
import { toast, ToastContainer } from 'react-toastify';
import { TfiMenuAlt } from 'react-icons/tfi';

const exactChapterNumber = (chapterNumber:string): number => {
  const parts = chapterNumber.split(' ');
  const numChapter = parts[1];
  return parseInt(numChapter, 10);
}

const ChapterComponent = () => {
  let location = useLocation();
  const { comicItem, chapterFind } = location.state || {};
  const {images, fetchImages} = useComicList();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [comicHistory, setComicHistory] = useState<ComicFull[]>(
    () => {
      const savedHistory = localStorage.getItem("reading-history");
      return savedHistory ? JSON.parse(savedHistory) : [];
    });

  useEffect(() => {
    setComicHistory((prevList) => {
      const comicFilter = prevList.filter((comic:any) => comic.comicId !== comicItem.comicId);
      const updatedList = [...comicFilter, comicItem];
      localStorage.setItem("reading-history", JSON.stringify(updatedList));
      return updatedList;
  });
  }, [])

  useEffect(() => {
    fetchImages(chapterFind.chapterId);
  }, [])
  /* Fix outdated value */
  const next = () => {
    const chapterNext = exactChapterNumber(chapterFind.chapterNumber) + 1;
    if (chapterNext <= comicItem.chapterList.length) {
      const nextChapter = comicItem.chapterList.find(
        (c: Chapter) => c.chapterNumber === `Chương ${chapterNext}`
      );
      if (nextChapter) {
        navigate(`/chapter/${comicItem.nameComic}/Chương-${chapterNext}`, {
          state: { comicItem, chapterFind: nextChapter },
        });
        window.location.reload();
      }
    } else {
      toast.error("Chapter you selected is the last one");
    }
  };
  /* Fix outdated value */  
  const previous = () => {
    const chapterPrev = exactChapterNumber(chapterFind.chapterNumber) - 1;
    if (chapterPrev > 0) {
      const prevChapter = comicItem.chapterList.find(
        (c: Chapter) => c.chapterNumber === `Chương ${chapterPrev}`
      );
      if (prevChapter) {
        navigate(`/chapter/${comicItem.nameComic}/Chương-${chapterPrev}`, {
          state: { comicItem, chapterFind: prevChapter },
        });
        window.location.reload();
      }
    } else {
      toast.error("Chapter you selected is the first one");
    }
  };


  return (
    <div className=''>
      <ToastContainer autoClose={1000}/>
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
      className="fixed bottom-0 left-0 bg-black p-2 space-x-2 w-screen border rounded flex justify-center">
          <SidebarIcon
                          icon={<TfiMenuAlt size="28" color='red'/>}
                          onClick={() => navigate(`/title/${comicItem.image_src}`, {
                            state: {comicItem},
                          })}
                          className="cursor-pointer p-0.5 hover:opacity-80"
                        />     
         {/* Arrows */}
         <SidebarIcon
                          icon={<MdNavigateBefore size="28" color='black'/>}
                          onClick={previous}
                          className="cursor-pointer p-0.5 rounded-full bg-white"
                        />     
        <div 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className='bg-gray-50 h-[34px] 
        text-gray-900 text-sm w-[337px] flex justify-center items-center cursor-pointer'>
        <div
          className=""
        >
          {comicItem.chapterList?.length ?? 0 > 0 ? chapterFind?.chapterNumber : ''}
        </div>
        <SidebarIcon className="" icon={<FaAngleDown size={14} />}/>
        </div>
        <SidebarIcon
                          icon={<MdNavigateNext size="28" color='black'/>}
                          onClick={next}
                          className="cursor-pointer p-0.5 rounded-full bg-white"
                        />
        {isDropdownOpen && (
          <ChapterSelectPopup data={comicItem} chapterFind={chapterFind} setIsDropdownOpen={setIsDropdownOpen}/>
        )}
      </div>
    </div>
  )
}

export default ChapterComponent