import React, { useRef } from "react";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import SidebarIcon from "../icon/SidebarIcon";
import ImgDemo from "../../assets/demo.jpg";
import useSlideScrollPopular from "../../hooks/SlideScrollPopular";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListNewComics from "../constants/list_comic_demo";
import { Comic } from "../constants/types";
import { useNavigate } from "react-router-dom";
import useComicList from "../../hooks/CrudComicList";
import { useStateContext } from "../../context/StateContext";

// [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]
// bg-img-bg

interface PopularComicProps {
  data: Comic[];
}

const PopularTitles = ({ data }: PopularComicProps) => {
  const navigate = useNavigate();
  const { settings } = useSlideScrollPopular();
  const sliderRef = useRef<Slider>(null);
  const {setSelected} = useStateContext();

  const next = (e: MouseEvent) => {
    e.stopPropagation(); // Stop the click event from bubbling up to the parent
    sliderRef.current?.slickNext();
  };

  const previous = (e: MouseEvent) => {
    e.stopPropagation(); // Stop the click event from bubbling up to the parent
    sliderRef.current?.slickPrev();
  };

  return (
    <>
      <div className="h-[410px] w-full bg-cover bg-center bg-no-repeat overflow-hidden">
        <div className="pb-8 sm:pb-0 mt-16">
          {/*This is img section*/}
          <div className="flex flex-col gap-8">
            <div className="">
              <h1 className="text-2xl font-semibold">Popular New Titles</h1>
            </div>

            <style jsx global>
              {`
                .custom-slide {
                  width: 100% !important;
                  display: flex !important;
                  flex-direction: row !important;
                }
              `}
            </style>
            <Slider ref={sliderRef} {...settings}>
              {/*This is titles section*/}
              {data?.map((comicItem: any, index: number) => (
                <div
                  key={comicItem.comicId}
                  className="custom-slide gap-4 cursor-pointer"
                  onClick={() => {
                    navigate(`/title/${comicItem.image_src}`, {
                      state: { comicItem },
                    })
                    setSelected("");
                  }}
                >
                  <img
                    src={comicItem.image_src}
                    className="w-[200px] h-[284.375px] object-cover"
                    alt="popular titles"
                  />

                  <div className="grid grid-cols-1 w-full">
                    <h1 className="text-2xl font-bold font-sans  whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[500px]">
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
