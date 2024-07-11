import React from "react";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import Vnsvg from "../../assets/vn.svg";
import SidebarIcon from "../icon/SidebarIcon";
import { Comic } from "../constants/types";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useComicList from "../../hooks/CrudComicList";

interface LastestUpdateListProps {
  data: Comic[];
}

{
  /*fetch 6 comics new*/
}
const LastestUpdateList = ({ data }: LastestUpdateListProps) => {
  const navigate = useNavigate();
  const {getClosestDate} = useComicList();

  return (
    <div className="grid grid-cols-1 gap-x-6 w-full bg-gray-100">
      <div className="grid gap-4 p-4">
        {data?.slice(0, 6).map((comicItem: any) => (
          <div className="flex gap-2" id={comicItem.comicId}>
            <div
              onClick={() =>
                navigate(`/title/${comicItem.image_src}`, {
                  state: { comicItem },
                })
              }
              className="flex items-center"
            >
              <img
                src={comicItem.image_src}
                alt="demo"
                className="cursor-pointer min-w-[60px] max-w-[60px] h-[80px] object-contain"
              />
            </div>

            <div className="flex flex-col w-full justify-center">
              <h2
                onClick={() =>
                  navigate(`/title/${comicItem.image_src}`, {
                    state: { comicItem },
                  })
                }
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
                    <li>{comicItem.chapterList[0]}</li>
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
                <p className="text-[describes-rgb]">
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
