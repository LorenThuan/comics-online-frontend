import React, { useEffect } from 'react'
import useComicList from '../../hooks/CrudComicList';
import AddComicPopup from './AddComicPopup';
import ComicListManager from '../../hooks/ComicListManager';
import UpdateComicPopup from './UpdateComicPopup';
import axios from 'axios';
import { Comic } from '../constants/types';

interface TableComicListProps {
  data: Comic[];
}

const TableComicList = ({data}: TableComicListProps) => {
  const {setComicListFull} = useComicList();
  const {comicData, handleChange, handleCheckboxChange, handleSubmit, 
    handleChapterChange, isOpenUpdate, handleOpenUpdate, 
    handleFormUpdate, closeUpdateForm, setIsOpenUpdate, 
    comicValue, handleChangeUpdate, handleUpdateCheckbox, 
    setComicValue, setComicData, isOpenForm, setIsOpenForm, closeFormAddPopup,
    updateLocalStorage} = ComicListManager();

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
          updateLocalStorage(updatedList);
          return updatedList;
        });
        const responseComicAll = await axios.get(
          "http://localhost:8083/comic/last-comics"
        );
        // Store in localStorage for future use
        localStorage.setItem("comicList", JSON.stringify(responseComicAll.data));
        alert("Delete comic successfully");
      }
    } catch (error) {
      console.log("Error deleted comic", error);
      throw error;
    }
  };

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
          {data?.map((comicItem: any, index: number) => (
            <tr key={index} className="text-center">
              <td>{index}</td>
              <td className='whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[620px]'>
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