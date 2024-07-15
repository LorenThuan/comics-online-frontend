
import VnLogo from "../../../assets/vn.svg";
import { useStateContext } from "../../../context/StateContext";
import useComicList from "../../../hooks/CrudComicList";
import { useNavigate } from "react-router-dom";

const LibraryList = () => {
  const {comicList, setSelected} = useStateContext();
  console.log(comicList);
  const { comicListAll } = useComicList();
  const navigate = useNavigate();

  const handleLibrary = (comicId: number) => {
    const comicItem =  comicListAll.find(comic => comic.comicId === comicId);
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
    <div className='mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6'>
    {comicList?.map((comicItem: any, index: number) => (
      <div key={index} className="m-2 hover:cursor-pointer" onClick={() => handleLibrary(comicItem.comicId)}>
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
