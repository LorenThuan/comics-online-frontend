
import VnLogo from "../../../assets/vn.svg";
import { useStateContext } from "../../../context/StateContext";
import useComicList from "../../../hooks/CrudComicList";
import { useNavigate } from "react-router-dom";
import { ComicFull, User } from "../../constants/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import UserService from "../../constants/UserService";

const LibraryList = () => {
  const {comicList, setSelected, setUser, user, setComicList} = useStateContext();
  
  const { comicListFull } = useComicList();
  const navigate = useNavigate();

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
      console.log("Comic not found");
      throw error;
    }
  };
  const [comicListRemove, setComicListRemove] = useState<ComicFull[]>([]);

  const handleAddListRemove = (comicItem: any, event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setComicListRemove((prevData) => {
      const comicExists  = prevData.some(c => c.comicId === comicItem.comicId);
      if (comicExists) {
         return prevData.filter(comic => comic.comicId !== comicItem.comicId); 
      } else {
        return [...prevData, comicItem];
      }
    })
  }

  console.log(comicListRemove);

  const handleRemoveComic = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const confirmRemove = window.confirm("Are you sure you want to delete the selected comics?");
      if (confirmRemove) {
        if (comicListRemove.length <= 0) {
          toast.error("Please select comics you want to remove!");
        } else {
          const newComicList = user?.comicList?.filter((comicItem: any) => 
            !comicListRemove.some((removeItem) => removeItem.comicId === comicItem.comicId)
          );
          setUser((prevData: any) => ({
            ...prevData,
            comicList: newComicList,
          }));
          setComicList(newComicList);
          console.log(comicList);
          const response = await UserService.removeComicFromLibrary(user?.userId, comicList, comicListRemove);
          console.log("Comics Remove:", response);
          
          setComicListRemove([]);
          alert("Delete Successfully");
        }
      }
    } catch (error) {
      console.log("Error removing comics, please try again!", error);
    }
  };
  
  return (
    <>
    <ToastContainer/>
    <div className='mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6'>
    {comicList?.map((comicItem: any, index: number) => (
      <div key={index} className="m-2">
      <div className="flex justify-center hover:cursor-pointer" onClick={() => handleLibrary(comicItem.comicId)}>
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
       
        <input type="checkbox" 
        className="text-green-500"
        checked={comicListRemove.some(c => c.comicId === comicItem.comicId)}
        onChange={(e) => handleAddListRemove(comicItem, e)}
        />
      </div>
    </div>
    ))}
    </div>
    {comicList && 
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
    <button
    onClick={handleRemoveComic} 
    className="px-3.5 py-1 text-center bg-red-500 rounded text-white font-semibold
    hover:bg-red-600">Delete</button>
    </div>}
    
    </>
  );
};

export default LibraryList;
