import React from "react";
import ComicAllList from "./ComicAllList";
import useComicList from "../../hooks/CrudComicList";
import SidebarIcon from "../../icon/SidebarIcon";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const LastestComicsContentAll = () => {
  const {comicList} = useComicList();
  const navigate = useNavigate();
  return (
    <>
    <div className="pb-8 grid grid-cols-1 justify-center">
            <div className="flex space-x-2 items-center">
              <div
                className="p-3 rounded-full hover:bg-white-rgb cursor-pointer"
                onClick={() => navigate("/")}
              >
                <SidebarIcon icon={<GrLinkPrevious size="18" />} />
              </div>

              <h1 className="text-2xl font-semibold">Latest Updates</h1>
            </div>
            </div>
    <div className="grid grid-cols-1 gap-6 pt-10 pb-10">
      <ComicAllList data={comicList}/>
    </div>
    </>
  );
};

export default LastestComicsContentAll;
