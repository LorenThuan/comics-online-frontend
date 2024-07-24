import React from "react";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import Vnsvg from "../../assets/vn.svg";
import SidebarIcon from "../icon/SidebarIcon";
import { ComicFull } from "../constants/types";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useComicList from "../../hooks/CrudComicList";
import { useStateContext } from "../../context/StateContext";

interface LastestUpdateListProps {
  data: ComicFull[];
  loadingLastComics: boolean;
}

/*fetch 6 comics new*/
const LastestUpdateList = (props: LastestUpdateListProps) => {
  const navigate = useNavigate();
  const {getClosestDate, comicListFull} = useComicList();
  const {setSelected} = useStateContext();

  if (props.loadingLastComics) 
    return (
    <div className="text-blue-500 text-center text-xl">
      Loading...
    </div>
  );

  const handleLibrary = (comicId: number) => {
    const comicItem = comicListFull.find(comic => comic.comicId === comicId);
    try {
      if (comicItem) {
          console.log(comicItem);
          navigate(`/title/${comicItem.image_src}`, {
            state: {comicItem},
          })
          setSelected("");
      }
    } catch (error) {
      console.log("Comic not found");
      throw error;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 w-full bg-gray-100">
      <div className="grid gap-4 p-4">
        {props.data?.slice(0, 6).map((comicItem: any, index: number) => (
          <div               
          onClick={() => handleLibrary(comicItem.comicId)}
          className="flex gap-2" key={index}>
            <div className="flex items-center">
              <img
                src={comicItem.image_src}
                alt="demo"
                className="cursor-pointer min-w-[60px] max-w-[60px] h-[80px] object-contain"
              />
            </div>

            <div className="flex flex-col w-full justify-center">
              <h2
                className="cursor-pointer font-sans text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[400px]"
              >
                {comicItem.nameComic}
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={Vnsvg}
                    alt="Vietnamese icon"
                    className="w-[20px] h-[20px] select-none"
                  />
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
                   <li>{comicItem.chapterList?.[0]?.toString()}</li>
                  </ul>
                </div>

                <SidebarIcon icon={<FiMessageSquare size="16" />} />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <SidebarIcon icon={<FiUsers size="16" />} />
                  <p className="text-[describes-rgb]">{comicItem.author}</p>
                </div>

                {/* <p className="text-[describes-rgb]">
                  {moment(comicItem.createDate).fromNow()}
                </p> */}
                <p onClick={(e) => e.preventDefault()} className="text-[describes-rgb] cursor-none">
                {getClosestDate(comicItem) ? moment(getClosestDate(comicItem)).fromNow() : 'No valid dates'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastestUpdateList;
