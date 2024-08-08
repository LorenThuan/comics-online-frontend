import React, { useState } from "react";
import Vnsvg from "../../../assets/vn.svg";
import SidebarIcon from "../../icon/SidebarIcon";
import { LuEye } from "react-icons/lu";
import { LuClock4 } from "react-icons/lu";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import moment from "moment";
import useComicList from "../../../hooks/CrudComicList";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/StateContext";
import { ComicFull } from "../../constants/types";
import ALT_IMAGE from "../../../assets/from-the-hero-in-his-past.jpg";

interface LastestUpdateListProps {
  data: ComicFull[];
}

const ComicAllList = ({ data }: LastestUpdateListProps) => {
  // const {getClosestDate, loadingLastComics, comicListFull} = useComicList();
  const {getClosestDate, loadingLastComics} = useComicList();
  const {comicListFull} = useStateContext();
  const navigate = useNavigate();
  const {setSelected} = useStateContext();

  const itemsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage 
  );

  const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if ( page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  if (loadingLastComics) return (
    <div className="text-blue-500 text-xl text-center">Loading...</div>
  )

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

  return (
    <>
        {currentData?.map((comicItem: any, index:number) => (
          <div
          key={index} 
          onClick={() => handleLibrary(comicItem.comicId)}
          className=" bg-gray-100 cursor-pointer hover:bg-gray-200 mr-4 rounded-md">
            <div className="gap-2">
              <div className="flex gap-2">
                <div className="flex justify-center ">
                  <img
                    src={comicItem.image_src}
                    alt="img"
                    className="w-[140px] h-[200px] rounded-md object-cover cursor-pointer p-2 hidden sm:block"
                    onError={({currentTarget}) => {
                      currentTarget.onerror = null; //prevent looping
                      currentTarget.src = `${ALT_IMAGE}`
                    }}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <h2 className="font-bold text-base whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[920px]">
                    {comicItem.nameComic}
                  </h2>
                  <hr className="border-1 border-solid border-gray-400 my-2 h-fit mr-4" />
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
                      {/* {comicItem.chapterList && comicItem.chapterList.length > 0 ? (
                      <li>
                        {comicItem.chapterList[0].chapterNumber
                          ? comicItem.chapterList[0].chapterNumber
                          : 'No chapter number available'}
                      </li>
                      ) : (
                      <li>No chapters available</li>
                      )} */}
                      <li className="font-bold sm:text-base text-sm">
                        {comicItem.chapterList[0]}
                      </li>
                      </ul>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mr-3">
                      <div className="flex items-center gap-2">
                        <SidebarIcon icon={<LuClock4 size="16" />} />
                        {/* <p className="text-[describes-rgb]">
                          {moment(comicItem.createDate).fromNow()}
                        </p> */}
                         <p className="text-[describes-rgb]">
                        {getClosestDate(comicItem) ? moment(getClosestDate(comicItem)).fromNow() : 'No valid dates'}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <SidebarIcon icon={<LuEye size="16" />} />
                        <p className="text-[describes-rgb]">N/A</p>
                        <div />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mr-3">
                    <div className="flex items-center gap-2">
                      <SidebarIcon icon={<FiUsers size="16" />} />
                      <p className="text-[describes-rgb] text-sm sm:text-base text-nowrap">{comicItem.author}</p>
                    </div>

                    <div className="flex items-center gap-x-8">
                      <ul className="text-[describes-rgb] flex gap-2 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[220px] sm:max-w-full">
                        {comicItem.genreList?.map((genre: any, index: any) => (
                          <li key={index}>{genre.genre}</li>
                        ))}
                      </ul>
                      <div className="flex justify-center items-center">
                        <SidebarIcon icon={<FiMessageSquare size="14" />} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {/* Pagination Controls */}
      <div className="grid grid-cols-4 place-items-center gap-1 sm:flex sm:justify-center">
        <button 
        onClick={() => handlePageChange(1)}
        hidden={currentPage === 1}
        className="px-3.5 py-1 mx-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white">
          «
        </button>
        <button 
        onClick={() => handlePageChange(currentPage - 1)}
        hidden={currentPage === 1}
        className="px-3.5 py-1 mx-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white">
          ‹
        </button>
        {pageNumbers.map((page) => (
          <button key={page}
          onClick={() => handlePageChange(page)} 
          className={`px-3.5 py-1 mx-1 border hover:bg-orange-500 hover:text-white
            rounded ${currentPage === page ? 'bg-orange-500 text-white font-semibold' : ''}`}>
            {page}
          </button>
        ))}
        <button 
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3.5 py-1 mx-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white">
          ›
        </button>
        <button 
        onClick={() => handlePageChange(totalPages)}
        hidden={currentPage === totalPages}
        className="px-3.5 py-1 mx-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white">
          »
        </button>
      </div>
    </>
  );
};

export default ComicAllList;
