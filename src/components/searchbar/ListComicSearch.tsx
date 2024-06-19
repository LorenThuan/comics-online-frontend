import React from 'react';
import Img from "../../assets/SaladBowl.jpg";
import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import SidebarIcon from '../icon/SidebarIcon';
import { Comic } from '../constants/types';
import Vnsvg from "../../assets/vn.svg"

interface SearchComicProps {
  data: Comic[];
}

class ListComicSearch extends React.PureComponent<SearchComicProps> {
  render() {
    const { data } = this.props;

    return (
      <>
        {data?.map((comicItem: Comic) => (
          <div
            key={comicItem.comic_id}
            className='bg-gray-100 w-auto h-auto px-3 ml-3 mt-5 rounded-lg cursor-pointer hover:bg-gray-200'
          >
            <div className='flex space-x-4'>
              <div className='flex items-center'>
                <img src={comicItem.image_src} alt="img-search" className='object-cover w-16 h-24 rounded-md' />
              </div>
              <div className='grid grid-cols-1 gap-3'>
                <div className='font-bold text-xl'>{comicItem.name_comic}</div>
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
                <li>{comicItem.chapterList?.[0]?.toString()}</li>
            </ul> 
      </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default ListComicSearch;
