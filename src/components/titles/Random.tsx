import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import useComicList from "../../hooks/CrudComicList";

const Random = () => {
  const navigate = useNavigate();
  const {setSelected, selected} = useStateContext();
  const {comicListAll} = useComicList();
  const {comicListFull} = useStateContext();

  const handleRandom = () => {

  const maxComicId = comicListAll.length > 0 ? Math.max(...comicListAll.map(comic => comic.comicId)) : 0;

  const numberRandom =  Math.floor(Math.random() * maxComicId) + 1;
  const comicItem =  comicListFull.find(comic => comic.comicId === numberRandom);
  if (comicItem) {
    setSelected("");
    navigate(`/title/${comicItem.image_src}`, {
      state: { comicItem },
    });
  }
}

  return( 
  <div
  onClick={handleRandom}
  className={`cursor-pointer hover:bg-gray-200 rounded-md ${selected === 'random' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`}>
  Random
  </div>
    
  );
};

export default Random;
