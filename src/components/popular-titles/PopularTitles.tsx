import React, { useRef } from "react";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import SidebarIcon from "../icon/SidebarIcon";
import useSlideScrollPopular from "../../hooks/SlideScrollPopular";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ComicFull } from "../constants/types";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import useComicList from "../../hooks/CrudComicList";
import ALT_IMAGE from "../../assets/from-the-hero-in-his-past.jpg";
import "./index.css";

// [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]
// bg-img-bg

interface PopularComicProps {
  data: ComicFull[];
  loadingPopularComics: boolean
}

const PopularTitles = (props: PopularComicProps) => {
  const navigate = useNavigate();
  const { settings } = useSlideScrollPopular();
  const sliderRef = useRef<Slider>(null);
  const {setSelected} = useStateContext();
  // const {comicListFull} = useComicList();
  const {comicListFull} = useStateContext();

  const next = (e: MouseEvent) => {
    e.stopPropagation(); // Stop the click event from bubbling up to the parent
    sliderRef.current?.slickNext();
  };

  const previous = (e: MouseEvent) => {
    e.stopPropagation(); // Stop the click event from bubbling up to the parent
    sliderRef.current?.slickPrev();
  };

  const handleLibrary = (comicId: number) => {
    const comicItem = comicListFull.find(comic => comic.comicId === comicId);
    try {
      if (comicItem) {
          navigate(`/title/${comicItem.image_src}`, {
            state: {comicItem}
          })
          setSelected("");
      }
    } catch (error) {
      // console.log("Comic not found");
      throw error;
    }
  };

  if (props.loadingPopularComics) 
    return (
      <div className="pb-8 sm:pb-0 mt-16">
        {/*This is img section*/}
        <div className="flex flex-col gap-8">
          <div className="">
            <h1 className="text-2xl font-semibold">Popular New Titles</h1>
            <div className="text-blue-500 mt-4 text-center text-xl">
              Loading...
            </div>
          </div>
          </div>
          </div>
  );

  return (
    <>
      <div className="h-[410px] w-full bg-cover bg-center bg-no-repeat overflow-hidden">
        <div className="pb-8 sm:pb-0 mt-16">
          {/*This is img section*/}
          <div className="flex flex-col gap-8">
            <div className="">
              <h1 className="text-2xl font-semibold">Popular New Titles</h1>
            </div>

            <Slider ref={sliderRef} {...settings}>
              {/*This is titles section*/}
              {props.data?.map((comicItem: any, index: number) => (
                <div
                  key={comicItem.comicId}
                  className="custom-slide gap-4 cursor-pointer"
                  onClick={() => handleLibrary(comicItem.comicId)}
                >
                  <img
                    src={comicItem.image_src}
                    className="w-[200px] h-[284.375px] object-cover"
                    alt="popular titles"
                    onError={({currentTarget}) => {
                      currentTarget.onerror = null; //prevent looping
                      currentTarget.src = `${ALT_IMAGE}`
                    }}
                  />

                  <div className="grid grid-cols-1 w-full">
                    <h1 className="text-2xl font-bold font-sans whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[500px]">
                      {comicItem.nameComic}
                    </h1>

                    <ul className="grid grid-cols-2 sm:flex sm:gap-2 font-bold place-items-center">
                      {comicItem.genreList.map((genre: any, index: any) => (
                        <li
                          key={index}
                          className="p-2 sm:p-1 text-nowrap text-sm rounded-lg bg-white-rgb2"
                        >
                          {genre}
                        </li>
                      ))}
                    </ul>

                    <p className="text-[describes-rgb]"></p>

                    {/**/}
                    <div className="flex items-center justify-between self-end">
                      <p className="italic font-bold text-sm sm:text-base">
                        {comicItem.author}
                      </p>
                      <div className="flex gap-4 sm:gap-6 items-center">
                        <div className="font-bold text-sm sm:text-base">NO.{index + 1}</div>
                        {/* Arrows */}
                        <SidebarIcon
                          icon={<MdNavigateBefore size="28" />}
                          onClick={(e: MouseEvent) => previous(e)}
                          className="cursor-pointer p-0.5 rounded-full hover:bg-gray-200"
                        />
                        <SidebarIcon
                          icon={<MdNavigateNext size="28" />}
                          onClick={(e: MouseEvent) => next(e)}
                          className="cursor-pointer p-0.5 rounded-full hover:bg-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularTitles;
