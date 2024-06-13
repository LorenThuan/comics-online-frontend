import React from "react";
import ComicAllList from "./ComicAllList";
import useComicList from "../../hooks/CrudComicList";
const LastestComicsContentAll = () => {
  const {comicList} = useComicList();
  
  return (
    <div className="grid grid-cols-1 gap-6 pt-10 pb-10">
      <ComicAllList data={comicList}/>
    </div>
  );
};

export default LastestComicsContentAll;
