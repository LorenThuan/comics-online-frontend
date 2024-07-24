import React, { useState } from 'react';
import DemoImg from "../../../assets/SaladBowl.jpg";
import VnLogo from "../../../assets/vn.svg";
import {ComicFull } from '../../constants/types';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../context/StateContext';
import useComicList from '../../../hooks/CrudComicList';

interface SearchListValueProps {
  data: ComicFull[];
  isFindComic: boolean;
}

const SearchListValue = ( props : SearchListValueProps) => {
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(props.data.length / itemsPerPage);

  // Get the data for the current page
  const currentData = props.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  };
  
  const navigate = useNavigate();
  const {setSelected} = useStateContext();
  const {comicListFull, loadingAdvancedSearch} = useComicList();

  const handleFindComicAdvanced = async (comicId: number) => {
    const comicItem = await comicListFull?.find(comic => comic.comicId === comicId);
    navigate(`/title/${comicItem?.image_src}`, {
      state: { comicItem },
    })
    setSelected("")
  }

  if (loadingAdvancedSearch) return (
  <div className='text-center mt-4 text-blue-500 text-xl'>Loading...</div>
  )

  return (
    <div className='mt-2'>
      <div className='grid grid-cols-3 sm:grid-cols-6'>

        {currentData.map((comicItem: any, index: number) => (
          <div key={index} 
          onClick={() => handleFindComicAdvanced(comicItem.comicId)}
          className="m-2 cursor-pointer">
            <div className='flex justify-center'>
              <img src={comicItem.image_src} alt="Demo" className='w-[145px] sm:w-[180px] h-[187px] sm:h-[233px] object-cover rounded-lg shadow-sm' />
            </div>
            <div className='mt-2'>
              <div className='flex items-center flex-col'>
                <div className='flex space-x-1'>
                  <img src={VnLogo} alt="vn" className='w-[24px] h-[24px] object-cover' />
                  <div className='text-base text-blue-800 font-bold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[120px]'>{comicItem.nameComic}</div>
                </div>
                <ul>
                  {props.isFindComic ? 
                  (<li className='text-blue-800'>
                    {comicItem.chapterList?.[0]?.toString()}
                    </li>
                  )
                  : (
                  <li className='text-blue-800'>
                    {comicItem.chapterList[0].chapterNumber}
                  </li>)} 
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className='grid grid-cols-6 place-items-center gap-2 sm:flex sm:justify-center mt-4 mb-10'>
        <button
          onClick={() => handlePageChange(1)}
          // disabled={currentPage === 1}
          hidden={currentPage === 1}
          className='px-3.5 py-1 mx-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white'
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          hidden={currentPage === 1}
          className='px-3.5 py-1 mx-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white'
        >
          ‹
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3.5 py-1 mx-1 border rounded hover:bg-orange-500 hover:text-white
              ${currentPage === page ? 'bg-orange-500 text-white font-semibold' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          hidden={currentPage === totalPages} 
          className='px-3.5 py-1 mx-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white'>
          ›
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          hidden={currentPage === totalPages}
          className='px-3.5 py-1 mx-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white'
        >
          »
        </button>
      </div>
    </div>
  );
}

export default SearchListValue;
