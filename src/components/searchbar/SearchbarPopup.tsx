import React from "react";
import SidebarIcon from "../icon/SidebarIcon";
import { GrLinkNext } from "react-icons/gr";
import ListComicSearch from "./ListComicSearch";
import { ComicFull } from "../constants/types";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

interface PopupProps {
  setSearchPopup: (isSearch: boolean) => void;
  searchComic: ComicFull[];
  isFound: boolean;
  searchQuery: string;
}

const SearchbarPopup = (props: PopupProps) => {
  const navigate = useNavigate();
  const {setSelected} = useStateContext();
  const handleNavigateAdvanced = () => {
    navigate("/titles");
    setSelected("advanced_search");
  }

  return (
    <>
        <div className="h-auto w-screen fixed top-0 right-0 backdrop-brightness-95">
          {props.searchQuery === "" ? (
            <div className="left-1/3 sm:left-1/2 mt-20 h-14 fixed ml-[135px] sm:ml-[104px] -translate-y-1/2 -translate-x-2/3 sm:-translate-x-1 p-4 w-[350px] sm:w-[500px] rounded-lg bg-white shadow-md">
              <div className="text-base font-sans">Enter a search query...</div>
            </div>
          ) : ( props.isFound ? (
            <div className="left-1/3 sm:left-2/4 mt-14 top-1/2 h-screen fixed ml-[135px] sm:ml-[104px] -translate-x-2/3 sm:-translate-x-0 p-4 w-[350px] sm:w-[500px] rounded-lg bg-white shadow-md">
            <div className="grid grid-cols-1">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">Manga</h2>
                <SidebarIcon
                  onClick={handleNavigateAdvanced}
                  icon={<GrLinkNext size="22" />}
                  className="cursor-pointer rounded-full p-1 hover:bg-gray-200"
                />
              </div>

              <ListComicSearch data={props.searchComic.slice(0, 5)} />
            </div>
          </div>
          ) : (
            <div className="left-1/3 sm:left-1/2 mt-20 h-14 fixed ml-[135px] sm:ml-[104px] -translate-y-1/2 -translate-x-2/3 sm:-translate-x-1 p-4 w-[350px] sm:w-[500px] rounded-lg bg-white shadow-md">
              <div className="text-base font-sans">No results found.</div>
            </div>
          )
          )}
        </div>
    </>
  );
};

export default SearchbarPopup;
