import React, { useEffect } from "react";
import SidebarIcon from "../../icon/SidebarIcon";
import { GrLinkNext } from "react-icons/gr";
import useSliderScroll from "../../../hooks/SlideScroll";
import Slider from "react-slick";
import useComicList from "../../../hooks/CrudComicList";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/StateContext";
import ALT_IMAGE from "../../../assets/from-the-hero-in-his-past.jpg";
import "./index.css";

const RecentlyAdd = () => {
  const { settings, sliderRef, handleWheel } = useSliderScroll();
  const {recentlyComic, loadingRecentlyComics } = useComicList();
  
  const navigate = useNavigate();
  const {setSelected, comicListFull} = useStateContext();

  const handleSliderWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Stop event propagation to prevent scrolling in parent components
    e.stopPropagation();
  };

  const handleLibrary = (comicId: number) => {
    const comicItem = comicListFull.find(comic => comic.comicId === comicId);
    try {
      if (comicItem) {
          navigate(`/title/${comicItem.image_src}`, {
            state: {comicItem},
          })
          setSelected("");
      }
    } catch (error) {
      // console.log("Comic not found");
      throw error;
    }
  };

  if (loadingRecentlyComics)
    return (
      <div className=" pb-8">
      <div className="flex justify-between items-center mb-6">
          <h1 className="font-sans font-semibold text-2xl cursor-pointer">
            Recently Added
          </h1>
          <div className="cursor-pointer p-3 rounded-full hover:bg-gray-200">
            <SidebarIcon 
            onClick={() => {
              setSelected("recently_add")
              navigate("/titles/recent")
            }}
            icon={<GrLinkNext size="18" />} />
          </div>
        </div>
        <div className="text-blue-500 text-xl mt-4 text-center">Loading...</div>
        </div>
        ) 

  return (
    <div className="h-auto" onWheel={handleSliderWheel}>
      <div className=" pb-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="font-sans font-semibold text-2xl cursor-pointer">
              Recently Added
            </h1>
          <div className="cursor-pointer p-3 rounded-full hover:bg-gray-200">
            <SidebarIcon 
            onClick={() => {
              setSelected("recently_add")
              navigate("/titles/recent")
            }}
            icon={<GrLinkNext size="18" />} />
          </div>
        </div>

        <div className="w-full pb-4" onWheel={handleWheel}>
          <p id="demo"></p>
          <Slider ref={sliderRef} {...settings}>
            {recentlyComic.slice(0, 15).map((comic: any, index: any) => (
              <div key={index} className="cursor-pointer" 
              onClick={() => handleLibrary(comic.comicId)}>
                <div
                  className="grid grid-cols-1 h-auto w-fit gap-2 mx-2"
                >
                  <img
                    src={comic.image_src}
                    alt="Cover image"
                    className="object-cover w-[200px] h-[284.375px] shadow-md rounded cursor-pointer"
                    onError={({currentTarget}) => {
                      currentTarget.onerror = null; //prevent looping
                      currentTarget.src = `${ALT_IMAGE}`
                    }}
                  />
                  <p 
                  className="font-sans text-describes-rgb cursor-pointer
                  whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px]">
                    {comic.nameComic}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdd;
