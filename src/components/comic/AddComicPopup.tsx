import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import GenreList from '../constants/genre_list'
import chapterList from '../constants/chapter_list';
import { ComicFull } from '../constants/types';
import { ToastContainer } from 'react-toastify';

interface AddComicPopupProps {
  isOpenForm?: boolean;
  closeFormAddPopup(): void
  setIsOpenForm: (isOpen: boolean) => void;
  comicData?: ComicFull
  handleChange(e: any): void; 
  handleCheckboxChange(genre: string): void; 
  handleChapterChange(e: any): void; 
  handleSubmit(e: any): void;
  setComicData: React.Dispatch<React.SetStateAction<ComicFull>>;
}

const AddComicPopup = (props: AddComicPopupProps) => {
  const genreList = GenreList[0].gerne.split(", ");
  // console.log(genreList);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const clickOutSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clickOutSideRef.current && !clickOutSideRef.current.contains(event.target as Node)) {
        props.setIsOpenForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <ToastContainer autoClose={1000}/>
    {props.isOpenForm &&
    <div className='h-screen w-screen fixed left-0 top-0 backdrop:brightness-90 overflow-auto overflow-y-scroll overscroll-contain'>
      <div className='fixed left-1/4 top-14 sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 rounded-md shadow-md bg-white' ref={clickOutSideRef}>
      <form
              onSubmit={props.handleSubmit}
              className="flex justify-center items-center bg-blue-300 p-4 rounded shadow-sm"
            >
              <div className="rounded-lg">
                <h2 className="text-base font-semibold text-center text-white">
                  Add Comic Form
                </h2>
                <div className="grid grid-col-1  sm:grid-col-3">
                  <div className="sm:col-span-1">
                    <label htmlFor="nameComic" className="text-base font-semibold">
                      Name Comic
                    </label>
                    <div className="">
                      <input
                        type="text"
                        required
                        value={props.comicData?.nameComic}
                        onChange={props.handleChange}
                        placeholder="name"
                        name="nameComic"
                        className="block w-full py-1.5 pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="author" className="text-base font-semibold">
                      Author
                    </label>
                    <div className="">
                      <input
                        type="text"
                        required
                        value={props.comicData?.author}
                        onChange={props.handleChange}
                        placeholder="author"
                        name="author"
                        className="block w-full py-1.5 pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="image_src" className="text-base font-semibold">
                    Image Url
                    </label>
                    <div className="">
                      <input
                        type="url"
                        required
                        value={props.comicData?.image_src}
                        onChange={props.handleChange}
                        name="image_src"
                        id='image_src'
                        size={26}
                        placeholder="https://example.com" 
                        pattern="https://.*"
                        className="block py-1.5 pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="state" className="text-base font-semibold">
                      State
                    </label>
                    <div className="">
                      <select
                        value={props.comicData?.state}
                        onChange={props.handleChange}
                        name="state"
                        id="state"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-4 py-2"
                      >
                        <option value="Đang Cập Nhật">Đang Cập Nhật</option>
                        <option value="Hoàn Thành">Hoàn Thành</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="genre" className="text-base font-semibold">
                      Genre List
                    </label>
                    <div className="relative inline-block w-full" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-gray-50 border border-gray-300 
          text-gray-900 text-sm rounded-lg w-full px-4 py-2 text-left
          whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[230px]
          "
        >
          {props.comicData?.genreList?.length ?? 0 > 0 ? props.comicData?.genreList?.map((g:any) => g.genre).join(', ') : 'Select Genres'}
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-28 sm:max-h-36 overflow-y-auto">
            {genreList.map((genre: any) => (
              <label key={genre} className="flex items-center px-4 py-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={props.comicData?.genreList?.some((g:any) => g.genre === genre) || false}
                  onChange={() => props.handleCheckboxChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        )}
      </div>
                  </div>
                 
                  <div className="sm:col-span-1">
                    <label htmlFor="chapterNumber" className="text-base font-semibold">
                      Chapter
                    </label>
                    <div className=" ">
                    <select
            name="chapterNumber"
            id="chapterNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-4 py-2"
            onChange={props.handleChapterChange}
          >
            {chapterList.map((chapter) => (
              <option key={chapter.chapterId} value={chapter.chapterNumber}>
                {chapter.chapterNumber}
              </option>
               ))}
          </select>
                    </div>
                  </div>
               

                  <div className="mt-4 flex items-center justify-center gap-x-6">
                    <button className="py-2 px-6 text-center bg-red-400 hover:bg-red-500 focus-visible:outline text-white font-semibold shadow-sm rounded-md">
                      Add Comic
                    </button>
                    <button
                      type="button"
                      onClick={props.closeFormAddPopup}
                      className="py-2 px-6 text-center bg-gray-400 hover:bg-gray-500 focus-visible:outline text-white font-semibold shadow-sm rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
      </div>
    </div>}
    </>
  )
}

export default AddComicPopup