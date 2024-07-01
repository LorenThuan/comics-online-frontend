import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import UserService from '../constants/UserService';
import { User } from '../constants/types';
import { useStateContext } from '../../context/StateContext';

const PopularComicDetails = () => {
  let location = useLocation();
  const { comicItem } = location.state || {};

  const {setComicList, comicList} = useStateContext();
  const navigate = useNavigate();

  const handleAddToLibrary = async (comic_id: number) => {
    console.log(comic_id);
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
     
        const result = await UserService.addToLibrary(comic_id, token);
        console.log(result);
        // console.log(result.comicList);  
       
        if (result) {
          alert("Add to library success")
          setComicList(result.comicList);
          navigate("/titles/follows");
        } else {
          console.error('Comic already in library'); 
        }


    } else {
      console.error('No token found in localStorage'); // Handle the case where the token is not found
    }
  }

  const handleSetState = () => {
    alert("Value really exist in library");
  }

  const [stateValue, setStateValue] = React.useState<string>('');

  useEffect(() => {
    const handleFound = async () => {
      const foundComic = await comicList?.find(comic => comic.comicId === comicItem.comic_id);
      if (foundComic) {
          console.log(foundComic);
          setStateValue("Reading")
      } else {
        setStateValue("Add to Library")
      }
    }
    handleFound();
  }, [comicItem])
  

  return (
    <div className='h-screen w-auto'>

      <div className='flex flex-col items- sm:flex-row space-x-7 pb-8 mt-10'>
        <div className='flex item-center'>
          <img src={comicItem.image_src} alt="img demo" className='rounded-md shadow-lg object-cover w-[193px] h-[250px]'/>
        </div>
        <div className='grid grid-cols-1 gap-2'>
          <h2 className='text-xl font-semibold'>{comicItem.name_comic}</h2>
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

          <ul className='flex space-x-2'>
          {comicItem.genreList.map((genre:any, index:any) => (
                    <li key={index} className="p-1 text-sm rounded-lg bg-white-rgb2">{genre}</li>
                ))}
          </ul>

          <div className='flex space-x-2'>
            <button onClick={() => {stateValue === "Add to Library" ?  handleAddToLibrary(comicItem.comic_id) : handleSetState()}} 
 
            className='px-6 py-2 bg-blue-400 text-center rounded-md hover:opacity-50 text-white duration-200'>
              {stateValue}
              </button>
            <Link to="" className='px-6 py-2 bg-green-400 text-center rounded-md hover:opacity-50 text-white duration-200'>First Read</Link>
            <Link to="" className='px-6 py-2 bg-red-400 text-center rounded-md hover:opacity-50 text-white duration-200'>Followed</Link>
            <Link to="" className='px-6 py-2 bg-violet-400 text-center rounded-md hover:opacity-50 text-white duration-200'>Liked</Link>
          </div>

        </div>



      </div>
      
      <div className='ml-3'>
          <h2 className='text-lg text-orange-500'>Describe</h2>
          <p className='text-base font-sans'></p>
        </div>
      <div className='mt-10 pb-8'>
        <h2 className='text-lg text-orange-500 ml-3'>Chapter List</h2>
        <ul className='p-6 rounded-lg shadow-md w-auto m-4 h-auto border border-slate-200 divide-y  divide-slate-200'>
        {comicItem.chapterList.map((chapter:any, index:any) => (
          <div className='flex justify-between'>
           <li key={index} className="text-blue-500 cursor-pointer">{chapter}</li>
           <li>{moment(comicItem.create_date_chapter).fromNow()}</li>
          </div>
                   
                ))}
          <div className='grid grid-cols-1 divide-y'></div>
        </ul>
      </div>
    </div>
  )
}

export default PopularComicDetails