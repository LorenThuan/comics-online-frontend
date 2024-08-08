import React, { useState } from 'react'
import { ComicFull } from '../../constants/types'
import useComicList from '../../../hooks/CrudComicList';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../context/StateContext';
import ALT_IMAGE from "../../../assets/from-the-hero-in-his-past.jpg";

interface RecentlyAddProps {
  data: ComicFull[];
}

const RecentlyAddAll = ({data}: RecentlyAddProps) => {
  const {loadingRecentlyComics} = useComicList();
  const navigate = useNavigate();
  const {setSelected, comicListFull} = useStateContext();

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

  if (loadingRecentlyComics) return (
    <div className='text-xl text-blue-500 text-center mt-4'>Loading...</div>
  );

  return (
    <>
    <div className='grid grid-cols-2 sm:grid-cols-5 gap-6'>
        {currentData.map((comic: any, index: any) => (
                <div
                  className="grid grid-cols-1 h-auto w-fit gap-2 mx-2"
                  key={index}
                  onClick={() => handleLibrary(comic.comicId)}
                >
                  <img
                    src={comic.image_src}
                    alt="Cover image"
                    className="object-cover h-fit w-full shadow-md rounded cursor-pointer"
                    onError={({currentTarget}) => {
                      currentTarget.onerror = null; //prevent looping
                      currentTarget.src = `${ALT_IMAGE}`
                    }}
                  />
                  <p 
                  className="font-sans text-describes-rgb cursor-pointer
                  whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px]">
                    {comic.nameComic}
                  </p>
                </div>
            ))}
      </div>
             {/* Pagination Controls */}
      <div 
      className="flex justify-center gap-1 my-8
      ">
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
            rounded ${currentPage === page ? 'bg-orange-500 text-white font-semibold' : ''}`}
            >
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
}

export default RecentlyAddAll