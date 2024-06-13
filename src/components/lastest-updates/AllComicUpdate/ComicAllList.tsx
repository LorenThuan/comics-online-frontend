import React from "react";
import Vnsvg from "../../../assets/vn.svg";
import SidebarIcon from "../../icon/SidebarIcon";
import { LuEye } from "react-icons/lu";
import { LuClock4 } from "react-icons/lu";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import { Comic } from "../../constants/types";
import moment from "moment";
import useSliderScrollUpdates from "../../hooks/SlideScrollUpdates";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

interface LastestUpdateListProps{
  data: any[];
};

const ComicAllList = ({data}:LastestUpdateListProps) => {
  const {settings, sliderRef } = useSliderScrollUpdates();

  const next  = (e: MouseEvent) => {
    e.stopPropagation(); // Stop the click event from bubbling up to the parent
    sliderRef.current?.slickNext();
  };
 
   const previous = (e: MouseEvent) => {
  e.stopPropagation() // Stop the click event from bubbling up to the parent
  sliderRef.current?.slickPrev();
  }; 

  return (
    <>
     <style jsx global>{`
        .slick-slide {
          width: 1030px !important;
          display: flex !important;
          // grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
          flex-direction: column;
          margin-left: 16px !important;
        }
      `}
        </style>    
    <Slider ref={ sliderRef } {...settings}>
    {data?.map((comicItem:any) => (
<div className=" bg-gray-100">
      <div className="gap-2">
        <div className="flex gap-2">
          <div className="flex justify-center">
            <img
              src={comicItem.image_src}
              alt="img"
              className="w-[140px] h-[200px] rounded-md object-cover cursor-pointer p-2"
            />
          </div>
          

          <div className="flex flex-col w-full">
            <h2 className="font-bold text-base  whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[920px]">{comicItem.name_comic}</h2>
            <hr className="border-1 border-solid border-gray-400 my-4 w-full px-2" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <SidebarIcon icon={<LuEye size="16" />} />
                
                
                  <img
                    src={Vnsvg}
                    alt="Vietnamese icon"
                    className="w-[20px] h-[20px] select-none"
                  />
               

                 <div>
                 <ul>
                    <li className="font-bold text-base">
                      {comicItem.chapterList[0]}
                    </li>
                  </ul>
                 </div>
           
                </div>

                <div className="flex items-center gap-4 mr-3">
                <div className="flex items-center gap-2">
                  <SidebarIcon icon={<LuClock4 size="16" />} />
                  <p className="text-[describes-rgb]">{moment(comicItem.create_date).fromNow()}</p>
                </div>

                <div className="flex items-center">
                  <SidebarIcon icon={<LuEye size="16" />} />
                  <p className="text-[describes-rgb]">N/A</p>
                  <div/>
                </div>

                
              </div>
              
            </div>

            <div className="flex justify-between items-center mr-3">
                <div className="flex items-center gap-2">
                  <SidebarIcon icon={<FiUsers size="16" />} />
                  <p className="text-[describes-rgb]">{comicItem.author}</p>
                </div>
           
                <div className="flex items-center gap-x-8">
                 
                  <ul className="text-[describes-rgb] flex gap-2">
                {comicItem.genreList.map((genre:any, index:any) => (
                    <li key={index}>{genre}</li>
                ))}
                 
                  </ul>
                 <div className="flex justify-center items-center"> <SidebarIcon icon={<FiMessageSquare size="14" />} /></div>
                   
                </div>
              
              </div>

          </div>
          
        </div>
        
      </div>
      
    </div>
    

  ))}
  </Slider>
  <div className="flex justify-between items-center mx-20">
  <SidebarIcon icon={<MdNavigateBefore size="28"/>} onClick={(e:MouseEvent) =>previous(e)} className="cursor-pointer p-0.5 rounded-full hover:bg-gray-200"/>
  <SidebarIcon icon={<MdNavigateNext size="28" />} onClick={(e:MouseEvent) =>next(e)} className="cursor-pointer p-0.5 rounded-full hover:bg-gray-200" />
  </div>
    </>
  );
};

export default ComicAllList;
