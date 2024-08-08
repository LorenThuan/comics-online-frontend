import React from 'react';
import Img from "../../assets/SaladBowl.jpg";
import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import SidebarIcon from '../icon/SidebarIcon';
import { ComicFull } from '../constants/types';
import Vnsvg from "../../assets/vn.svg"
import useComicList from '../../hooks/CrudComicList';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/StateContext';
import ALT_IMAGE from "../../assets/from-the-hero-in-his-past.jpg";

interface SearchComicProps {
  data: ComicFull[];
  setSearchPopup: (isSearch: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const ListComicSearch = (props: SearchComicProps) => {

    const {comicListAll} = useComicList();
    
    const navigate = useNavigate();
    const {setSelected, comicListFull} = useStateContext();

    const handleLibrary = (comicId: number) => {
      const comicItem = comicListFull.find(comic => comic.comicId === comicId);
      try {
        if (comicItem) {
            navigate(`/title/${comicItem.image_src}`, {
              state: {comicItem}
            })
            setSelected("");
            props.setIsOpen(false);
            props.setSearchPopup(false);
        }
      } catch (error) {
        // console.log("Comic not found");
        throw error;
      }
    };

    return (
      <>
      <div className="overflow-y-auto h-[480px]">
        {props.data?.map((comicItem: any, index: number) => (
          <div
            key={index}
            onClick={() => handleLibrary(comicItem.comicId)}
            className='bg-gray-100 w-auto h-auto mr-4 mt-5 rounded-lg cursor-pointer hover:bg-gray-200'
          >
            <div className='flex space-x-4'>
              <div className='flex items-center'>
                <img 
                src={comicItem.image_src} 
                alt="img-search" 
                className='object-cover w-16 h-24 rounded-md'
                onError={({currentTarget}) => {
                  currentTarget.onerror = null; //prevent looping
                  currentTarget.src = `${ALT_IMAGE}`
                }} 
                />
              </div>
              <div className='grid grid-cols-1 gap-3'>
                <div 
                className='font-bold text-xl whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px] sm:max-w-[330px]'>
                  {comicItem.nameComic}
                  </div>
                <div className='flex space-x-2 items-center'>
                  <div className='flex items-center gap-1'>
                    <SidebarIcon icon={<AiFillLike size="18" />} />
                    <p>{comicItem.liked}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <SidebarIcon icon={<FaHeart size="16" />} />
                    <p>{comicItem.followed}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <SidebarIcon icon={<FaRegEye size="18" />} />
                    <p>{comicItem.views?.toString()}</p>
                  </div>
                </div>
                <div className='flex items-center my-1 px-1 w-fit bg-gray-300 rounded-md space-x-2'>
                  {comicItem.state === "Đang Cập Nhật" ? (
                    <div className='w-1 h-1 p-1 bg-red-400 rounded-full'></div>
                  ) : (
                    <div className='w-1 h-1 p-1 bg-blue-400 rounded-full'></div>
                  )}
                  <p className='text-sm'>{comicItem.state}</p>
                </div>
                <div className='flex items-center gap-2'>
            <img src={Vnsvg} alt="Vietnamese icon" className='w-[20px] h-[20px] select-none'/>
            <ul>
            <li className='text-blue-800'>{comicItem.chapterList?.[0]?.toString()}</li>
            </ul>
      </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </>
    );
  }


export default ListComicSearch;
