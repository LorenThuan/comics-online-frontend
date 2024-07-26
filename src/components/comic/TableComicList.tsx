import React, { useEffect, useState } from 'react'
import useComicList from '../../hooks/CrudComicList';
import AddComicPopup from './AddComicPopup';
import ComicListManager from '../../hooks/ComicListManager';
import UpdateComicPopup from './UpdateComicPopup';
import axios from 'axios';
import { ComicFull } from '../constants/types';
import { FaPager } from 'react-icons/fa6';

interface TableComicListProps {
  data?: ComicFull[];
  loadingAllComics: boolean;
}

const TableComicList = (props: TableComicListProps) => {
  const {setComicListFull} = useComicList();
  const {comicData, handleChange, handleCheckboxChange, handleSubmit, 
    handleChapterChange, isOpenUpdate, handleOpenUpdate, 
    handleFormUpdate, closeUpdateForm, setIsOpenUpdate, 
    comicValue, handleChangeUpdate, handleUpdateCheckbox, 
    setComicValue, setComicData, isOpenForm, setIsOpenForm, 
    closeFormAddPopup} = ComicListManager();

  const handleOpenForm = () => {
    setIsOpenForm(!isOpenForm);
  };


  const handleDelete = async (comicId: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this comic?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:8083/comics/${comicId}`)
        setComicListFull((prevList) => {
          const updatedList = prevList.filter((comic) => comic.comicId !== comicId);
          return updatedList;
        });
        alert("Delete comic successfully");
      }
    } catch (error) {
      console.log("Error deleted comic", error);
      throw error;
    }
  };
  const itemsPerPage = 15;
  // @ts-ignore
  const totalPages = Math.ceil(props?.data?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentData = props.data?.slice
  ((currentPage - 1)*itemsPerPage, currentPage*itemsPerPage);

  const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (props.loadingAllComics) return (
    <div className='text-blue-500'>Loading...</div>
  )

  return (
      <>
      <button
      onClick={handleOpenForm} 
      className='p-1 rounded-lg bg-violet-400 hover:bg-violet-600 text-white mt-5'>
        Add Comic
      </button>

      <table className="table-fixed sm:table-auto border-collapse border border-slate-400 mt-10 mb-8 mr-4">
        <thead className="">
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Author</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentData?.map((comicItem: any, index: number) => (
            <tr key={index} className="text-center">
              <td>{index}</td>
              <td className=''>
                {comicItem.nameComic}
              </td>
              <td>{comicItem.author}</td>
              <td>{comicItem.state}</td>
              <td className="flex justify-evenly space-x-2 p-1">
                <button
                  onClick={() => handleOpenUpdate(comicItem.comicId)}
                  className="p-1 rounded-lg bg-blue-400 text-white hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(comicItem.comicId)}
                  className="p-1 rounded-lg bg-red-400 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='gap-2 sm:flex sm:justify-center my-4'>
        <button
        onClick={() => handlePageChange(1)}
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
        {pageNumbers.map((page: number) => (
          <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3.5 py-1 mx-1 border rounded hover:text-white hover:bg-orange-500
            disabled:opacity-50 ${currentPage === page ? 'bg-orange-500 text-white font-semibold' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
        onClick={() => handlePageChange(currentPage + 1)}
        hidden={currentPage === totalPages}
        className='px-3.5 py-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white'
        >
        ›
        </button>
        <button
        onClick={() => handlePageChange(totalPages)}
        hidden={currentPage === totalPages}
        className='px-3.5 py-1 border rounded disabled:opacity-50 hover:bg-orange-500 hover:text-white'
        >
        »
        </button>
      </div>

    <UpdateComicPopup
      isOpenUpdate={isOpenUpdate}
      closeUpdateForm={closeUpdateForm}
      setIsOpenUpdate={setIsOpenUpdate}
      handleChangeUpdate={handleChangeUpdate}
      comicValue={comicValue}
      handleFormUpdate={handleFormUpdate}
      handleUpdateCheckbox={handleUpdateCheckbox}
      setComicValue={setComicValue}/>
    <AddComicPopup isOpenForm={isOpenForm}
    closeFormAddPopup={closeFormAddPopup}
    setIsOpenForm={setIsOpenForm}
    comicData={comicData}
    handleChange={handleChange}
    handleCheckboxChange={handleCheckboxChange}
    handleChapterChange={handleChapterChange}
    handleSubmit={handleSubmit}
    setComicData={setComicData}/>
  </>
  )
}

export default TableComicList