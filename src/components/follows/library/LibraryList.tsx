import React from "react";
import DemoImg from "../../../assets/SaladBowl.jpg";
import VnLogo from "../../../assets/vn.svg";
import CrudUser from "../../../hooks/CrudUser";
import { useStateContext } from "../../../context/StateContext";
import { ComicTest } from "../../constants/types";
import useComicList from "../../../hooks/CrudComicList";
import { useNavigate } from "react-router-dom";

const LibraryList = () => {
  const {comicList} = useStateContext();
  console.log(comicList);
  const { comicListAll } = useComicList();
  const navigate = useNavigate();

  const handleLibrary = (comicId: number) => {
    const comicItem =  comicListAll.find(comic => comic.comic_id === comicId);
    try {
      if (comicItem) {
          console.log(comicItem);
          navigate(`/title/${comicItem.image_src}`, {
            state: {comicItem},
          })
      }
    } catch (error) {
      console.log("Comic not found");
      throw error;
    }
  };
  

  return (
    <div className='mt-2 grid grid-cols-6'>
    {comicList?.map((comicItem: ComicTest, index: number) => (
      <div className="m-2 hover:cursor-pointer" onClick={() => handleLibrary(comicItem.comicId)}>
      <div className="flex justify-center">
        <img
          src={comicItem.image_src}
          alt="Demo"
          className="w-[180px] h-[233px] object-cover rounded-lg shadow-sm"
        />
      </div>
      <div className="mt-2">
        <div className="flex items-center flex-col">
          <div className="flex space-x-1">
            <img
              src={VnLogo}
              alt="vn"
              className="w-[24px] h-[24px] object-cover"
            />
            <div className="text-base text-blue-800 font-bold">{comicItem.nameComic}</div>
          </div>

        </div>
      </div>
    </div>
    ))}
    
    </div>
  );
};

export default LibraryList;
