import React from 'react'
import DemoUpdate from "../../assets/demo_last_update.jpg";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import Vnsvg from "../../assets/vn.svg"
import SidebarIcon from '../icon/SidebarIcon';
import ListNewComics from "../constants/list_comic_demo";

// interface ListNewComics {
//   id: number;
//   name: string;
//   img?: any;
//   chapter: string;
//   author?: string;
//   timeUpdate: string
// }

// type ListNewComic = { data: ListNewComics[] };

{/*fetch 6 comics new*/}
const LastestUpdateList = (comic_news: any) =>  {
  comic_news = ListNewComics;
  return (
     <div className='grid grid-cols-1 gap-x-6 w-full bg-gray-100'>
   <div className='grid gap-4 p-4 '>
      {comic_news.map((comicItem: any, index: any) => (
      <div className='flex gap-2' id={index}>
      <div><img src={comicItem.img} alt="demo" className=' min-w-[60px] max-w-[60px] h-[80px] object-contain'/></div>

     <div className='flex flex-col w-full justify-center'>
     <h2 className='font-sans text-lg font-bold'>{comicItem.name}</h2>
     <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2'>
            <img src={Vnsvg} alt="Vietnamese icon" className='w-[20px] h-[20px] select-none'/>
            <p className='text-[describes-rgb]'>{comicItem.chapter}</p>
      </div>

      <SidebarIcon icon={<FiMessageSquare size="16"/>}/>
     </div>
     <div className='flex justify-between items-center'>
     <div className='flex items-center gap-2'>
            <SidebarIcon icon={<FiUsers size="16" />} />
            <p className='text-[describes-rgb]'>{comicItem.author}</p>
      </div>

      <p className='text-[describes-rgb]'>{comicItem.timeUpdate}</p>
     </div>
      </div> 
     
    </div>
      ))}
    </div>
    </div>
  )
}

export default LastestUpdateList