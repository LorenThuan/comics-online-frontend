import React,{ useEffect } from 'react'
import SidebarIcon from '../icon/SidebarIcon'
import { GrLinkNext } from "react-icons/gr";
import useSliderScroll from '../hooks/SlideScroll';
import Slider from "react-slick";
import ListComics from "../constants/list_comic_featured";

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

const Featured = () => {
  const {settings, sliderRef, handleWheel} = useSliderScroll();

  const handleSliderWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Stop event propagation to prevent scrolling in parent components
    e.stopPropagation();
  };

  return (
    <div className='h-auto' onWheel={handleSliderWheel}>
      <div className='container pb-8'>

        <div className='flex justify-between items-center mb-6'>
          <div className='flex gap-4 items-center'>
          <h1 className='font-sans font-semibold text-lg cursor-pointer'>Featured</h1>
              <SidebarIcon icon={<GrLinkNext size="18" className='cursor-pointer'/>}/>
              <h1 className='font-sans font-semibold text-lg cursor-pointer'>Seasonal: Spring 2024</h1>
          </div>
          <div className='cursor-pointer'><SidebarIcon icon={<GrLinkNext size="18" />} /></div>
        </div>

  <div className='w-[1000px] pb-4' onWheel={handleWheel}>
    <p id='demo'></p>
<style jsx global>{`
        .slick-dots li button:before {
          color:  #bfbfbf;
          margin-top: 1rem;
        }
        .slick-dots li.slick-active button:before {
          font-size: 10px;
          color: rgb(255, 103, 64); // Change this to your desired dot color
        }
      `}</style>
      <Slider ref={sliderRef} {...settings}>

{ListComics.map((comics:any, index:any) => (
  <div key={index} className=''>
<div className='grid grid-cols-1 h-auto w-fit gap-2 mx-2' id={index}>
            <img src={comics.img} alt="Name Img" className='object-cover h-fit w-full shadow-md rounded cursor-pointer'/>
            <p className='font-sans text-describes-rgb cursor-pointer'>{comics.name}</p>
        </div> 
        </div>
        ))}

        
        </Slider>
</div>
      </div>
    </div>
  )
}

export default Featured