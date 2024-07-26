import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import UserService from '../constants/UserService';
import { useStateContext } from '../../context/StateContext';
import useComicList from '../../hooks/CrudComicList';
import { Chapter, ComicFull } from '../constants/types';

const exactChapterNumber = (chapterNumber: string): number => {
  const parts = chapterNumber.split(' ');
  const num = parts[1];
  return parseInt(num, 10);
}

const PopularComicDetails = () => {
  let location = useLocation();
  const { comicItem } = location.state || {};

  const {setComicList, comicList, setSelected} = useStateContext();
  const navigate = useNavigate();
  const {getClosestDate} = useComicList();

  const handleAddToLibrary = async () => {

    const token = localStorage.getItem("token");
    if (token) {
        const result = await UserService.addToLibrary(comicItem.comicId, token);
        console.log(result);
        // console.log(result.comicList);  
        if (result) {
          setComicList(result.comicList);
            alert("Add to library success")
            navigate("/titles/follows");
            setSelected("library");
        } else {
          console.error('Comic already in library'); 
        }
    } else {
      console.error('No token found in localStorage'); // Handle the case where the token is not found
    }
  }

  const [stateValue, setStateValue] = React.useState<string>('');

  useEffect(() => {
    handleFound();
  }, [comicItem])

  const handleFound = async () => {
    const foundComic = await comicList?.find(comic => comic.comicId === comicItem.comicId);
    if (foundComic) {
        console.log(foundComic);
        setStateValue("Reading")
    } else {
      setStateValue("Add to Library")
    }
  }

  const handleFirstRead = () => {
    const chapterFind: any = 
    comicItem.chapterList?.find((chapter: any) => chapter.chapterNumber === "Chương 1");
    navigate(`/chapter/${comicItem.nameComic}/${chapterFind.chapterNumber}`, {
      state: {comicItem, chapterFind}
    });
    setStateValue("");
  }

  const handleNavigateReading = (chapter: Chapter) => {
    const chapterFind = chapter;
    navigate(`/chapter/${comicItem.nameComic}/${chapterFind.chapterNumber}`, {
      state: {comicItem, chapterFind}
    });
    setStateValue("");
  }

  const getMaxChapterNumber = (chapters: Chapter[]): number => {
    return chapters.reduce((max, chapter:any) => {
      const chapterNum = parseInt(chapter.chapterNumber.replace('Chương ', ''), 10);
      return chapterNum > max ? chapterNum : max;
    }, 0);
  };

  const handleLastRead = () => {
    let chapterNumMax = getMaxChapterNumber(comicItem?.chapterList);
    const chapterFind: any = 
    comicItem.chapterList?.find((chapter: any) => chapter.chapterNumber === `Chương ${chapterNumMax}`);
    navigate(`/chapter/${comicItem.nameComic}/${chapterFind.chapterNumber}`, {
      state: {comicItem, chapterFind}
    });
    setStateValue("");
  }

  const [chapters, setChapters] = useState<Chapter[]>([]);
  useEffect(() => {
    if (comicItem?.chapterList && comicItem?.chapterList?.length > 1) {
      const sortedChapters: any =  comicItem?.chapterList?.sort((a: any, b:any) => {
        const numA = exactChapterNumber(a.chapterNumber);
        const numB = exactChapterNumber(b.chapterNumber);
        return numB - numA;
      });
      setChapters([...sortedChapters]);
    } else {
      setChapters(comicItem?.chapterList);
    }
  }, [chapters])

  return (
    <div className='h-screen w-auto'>

      <div className='flex flex-col items-center sm:items-start sm:flex-row space-x-7 pb-8 mt-10'>
        <div className='flex item-center'>
          <img src={comicItem.image_src} alt="img demo" className='rounded-md shadow-lg object-cover w-[193px] h-[250px]'/>
        </div>
        <div className='grid grid-cols-1 gap-2 place-items-center sm:place-items-start mt-5 sm:mt-0'>
          <h2 className='text-xl font-semibold'>{comicItem.nameComic}</h2>
          {/*  */}
          <div className='flex space-x-16'>
          <div className='grid grid-cols-1'>
            <p>Author</p>
            <p>State</p>
            <p>Liked</p>
            <p>Followed</p>
            <p>Views</p>
          </div>

          <div className='grid grid-cols-1'>
            <p>{comicItem.author}</p>
            <p>{comicItem.state}</p>
            <p>{comicItem.liked}</p>
            <p>{comicItem.followed}</p>
            <p>{comicItem.views}</p>
          </div>
          </div>

          <ul className='grid grid-cols-4 gap-5 place-items-center sm:flex sm:space-x-2'>
          {comicItem.genreList.map((genres:any, index:any) => (
                    <li key={index} className="px-2 py-1.5 sm:p-1 text-sm rounded-lg bg-white-rgb2 text-center text-nowrap">{genres.genre}</li>
                ))}
          </ul>

          <div className='grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2 sm:mt-0'>
            <button onClick={() => {stateValue === "Add to Library" ?  handleAddToLibrary() : handleFirstRead()}} 
 
            className='px-4 py-2 sm:px-6 bg-blue-400 text-center rounded-md hover:opacity-50 text-white duration-200'>
              {stateValue}
              </button>
            <button onClick={handleFirstRead} 
            className='px-4 py-2 sm:px-6 bg-green-400 text-center rounded-md hover:opacity-50 
            text-white duration-200'>
              First Read
              </button>
              <button onClick={handleLastRead} 
            className='px-4 py-2 sm:px-6 bg-yellow-400 text-center rounded-md hover:opacity-50 
            text-white duration-200'>
              Last Read
              </button>
            <button className='px-4 py-2 sm:px-6 bg-red-400 text-center rounded-md hover:opacity-50 text-white duration-200'>Followed</button>
            <button className='px-4 py-2 sm:px-6 bg-violet-400 text-center rounded-md hover:opacity-50 text-white duration-200'>Liked</button>
          </div>

        </div>



      </div>
      
      <div className='ml-3'>
          <h2 className='text-lg text-orange-500'>Describe</h2>
          <p className='text-base font-sans'></p>
        </div>
      <div className='mt-10 pb-8'>
        <h2 className='text-lg text-orange-500 ml-3'>Chapter List</h2>
        <ul className='p-6 rounded-lg shadow-md w-auto mr-4 mt-5 h-auto border border-slate-200 divide-y divide-slate-200'>
      {chapters.length > 0 ? (
        chapters.map((chapter: any, index: number) => (
          <div key={index} className='flex justify-between'>
            <li onClick={() => handleNavigateReading(chapter)} className='hover:text-blue-500 cursor-pointer'>
              {'chapterNumber' in chapter && chapter.chapterNumber
                ? chapter.chapterNumber
                : 'No chapter number available'}
            </li>
            <li onClick={(e) => e.preventDefault()} className="text-[describes-rgb] cursor-none">
                {getClosestDate(comicItem) ? moment(getClosestDate(comicItem)).fromNow() : 'No valid dates'}
                </li>
            {/* <li>{moment(comicItem.createDateChapter).fromNow()}</li> */}
          </div>
        ))
      ) : (
        <li>No chapters available</li>
      )}
      <div className='grid grid-cols-1 divide-y'></div>
    </ul>
      </div>
    </div>
  )
}

export default PopularComicDetails