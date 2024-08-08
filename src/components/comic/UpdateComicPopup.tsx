import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Chapter, ComicFull } from '../constants/types';
import GenreList from '../constants/genre_list';
import UploadImages from './UploadImages';
import { toast } from 'react-toastify';

interface UpdateComicProps {
  isOpenUpdate: boolean;
  closeUpdateForm(): void;
  handleFormUpdate(e: FormEvent): void;
  setIsOpenUpdate: (isOpen: boolean) => void;
  comicValue: ComicFull;
  handleChangeUpdate(e: any): void;
  handleUpdateCheckbox(genre: string): void
  setComicValue: React.Dispatch<React.SetStateAction<ComicFull>>;
}

const extractChapterNumber = (chapterNumber:string): number => {
  const parts = chapterNumber.split(' ');
  const num = parts[1];
  return parseInt(num, 10);
}

const UpdateComicPopup = (props: UpdateComicProps) => {
  const clickOutSideRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const genreList = GenreList[0].gerne.split(", ");

  const [number, setNumber] = React.useState<number>(0);

  const chapterListPresent:any = [...props.comicValue?.chapterList || []]; // Create a shallow copy

  const getMaxChapterNumber = (chapters: Chapter[]): number => {
    return chapters.reduce((max, chapter:any) => {
      const chapterNum = parseInt(chapter.chapterNumber.replace('Chương ', ''), 10);
      return chapterNum > max ? chapterNum : max;
    }, 0);
  };

  let chapterNumMax = getMaxChapterNumber((chapterListPresent));

  const handleAddNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    for (let i = chapterNumMax + 1; i <= chapterNumMax + number; i++) {
      chapterListPresent.push({ chapterNumber: "Chương "  + i});
    }

    props.setComicValue((prevData:any) => ({
        ...prevData,
        chapterList: chapterListPresent
      }));
        toast.success("Add number of chapter successfully!");
    }

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
        props.setIsOpenUpdate(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (props.comicValue?.chapterList && props.comicValue.chapterList.length > 0) {
      const sortedChapters:any = props.comicValue?.chapterList.sort((a: any, b: any) => {
        const numA = extractChapterNumber(a.chapterNumber);
        const numB = extractChapterNumber(b.chapterNumber);
        return numB - numA;
      });
      setChapters([...sortedChapters]);
    }
    
  }, [props.comicValue])

  const [chapterSelected, setChapterSelected] = useState<string>("");
  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);
  const [chapterFound, setChapterFound] = useState<any>();
  const handleOpenUploadImages = (e:Event) => {
    e.preventDefault();
    const chapterFind = props?.comicValue?.chapterList?.find((c:any) => c.chapterNumber === chapterSelected);
    setChapterFound(chapterFind);
    if (chapterFind) {
      setIsOpenUpload(true);
      props.setIsOpenUpdate(false);
    } else {
      toast.error("Please select chapter you want upload image!");
    }
  }

  const handleFormUpdate = (e: FormEvent) => {
    e.preventDefault();
    const imageSrcInput = document.getElementById('image_src') as HTMLInputElement;
    if (!imageSrcInput.checkValidity()) {
      imageSrcInput.reportValidity();
      return;
    }
    props.handleFormUpdate(e);
  };

  return (
    <>
    {props.isOpenUpdate &&    
    <div className='fixed h-screen w-screen left-0 top-0 backdrop-brightness-75'>
      <div className='fixed left-1/4 top-0 -translate-x-10 sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 rounded-md shadow-md bg-white' ref={clickOutSideRef}>
      <form
              onSubmit={handleFormUpdate}
              className="flex justify-center items-center bg-blue-300 p-4 rounded shadow-sm"
            >
              <div className="rounded-lg">
                <h2 className="text-base font-semibold text-center text-white">
                  Update Comic Form
                </h2>
                <div className="grid grid-col-1 sm:grid-col-3">
                  <div className="sm:col-span-1">
                    <label htmlFor="nameComic" className="text-base font-semibold">
                      Name Comic
                    </label>
                    <div className="">
                      <input
                        type="text"
                        required
                        value={props.comicValue?.nameComic}
                        onChange={props.handleChangeUpdate}
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
                        value={props.comicValue?.author}
                        onChange={props.handleChangeUpdate}
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
                        value={props.comicValue?.image_src}
                        onChange={props.handleChangeUpdate}
                        name="image_src"
                        id='image_src'
                        placeholder="https://example.com" 
                        pattern="https://.*"
                        className="block py-1.5 w-full pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="state" className="text-base font-semibold">
                      State
                    </label>
                    <div className="">
                      <select
                        value={props.comicValue?.state}
                        onChange={props.handleChangeUpdate}
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[230px] px-4 py-2 text-left"
        >
          {props.comicValue?.genreList?.length ?? 0 > 0 ? props.comicValue?.genreList?.map((g:any) => g.genre).join(', ') : 'Select Genres'}
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 w-full  bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-28 sm:max-h-36 overflow-y-auto">
            {genreList.map((genre: any, index: number) => (
              <label key={index} className="flex items-center px-4 py-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={props.comicValue?.genreList?.some((g:any) => g.genre === genre)}
                  onChange={() => props.handleUpdateCheckbox(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        )}
      </div>
                  </div>
                  
                  <div className='sm:col-span-1'>
                    <label htmlFor="numChapter" className='font-semibold text-base'>
                      Quantity Of Chapter Want Add (min 1)
                    </label>
                    <div className='block relative'>
                    <input 
                    type="number" 
                    name='numChapter'
                    min="1"
                    placeholder='entered number'
                    onChange={(e) => setNumber(+e.target.value)}
                    className="w-full py-1.5 pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md"
                    />
                    <button onClick={handleAddNumber} className='block absolute top-1/2 right-0 bg-red-500 rounded-md text-white -translate-x-1/4 -translate-y-1/2 py-1 px-2 mr-5 hover:opacity-60'>Add</button>
                    </div>
                  </div>
                 
                  <div className="sm:col-span-1">
                    <label htmlFor="chapterNumber" className="text-base font-semibold">
                      Select chapter you want upload images
                    </label>
                    <div className=" ">
                    <select
            name="chapterNumber"
            id="chapterNumber"
            value={chapterSelected}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-4 py-2"
            onChange={(e) => {
              setChapterSelected(e.target.value);
            }}
          >
            <option value="" disabled>Select chapter</option>
            {chapters.length > 0 ? (
              chapters.map((chapter: Chapter, index: number) => (
              <option key={index} value={chapter.chapterNumber}>
                {chapter.chapterNumber}
              </option>
               ))) : (<option disabled>No chapters available</option>)
            }
          </select>
          <button
          onClick={(e:any) => handleOpenUploadImages(e)}
          className='px-4 py-2 w-fit rounded text-white bg-violet-500 hover:bg-violet-600'>
            Open upload popup
          </button>
                    </div>
                  </div>
               

                  <div className="mt-4 flex items-center justify-center gap-x-6">
                    <button className="py-2 px-6 text-center bg-red-400 hover:bg-red-500 focus-visible:outline text-white font-semibold shadow-sm rounded-md">
                      Update Comic
                    </button>
                    <button
                      type="button"
                      onClick={props.closeUpdateForm}
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
    {isOpenUpload && <UploadImages comicValue={props.comicValue} chapterFound={chapterFound} setIsOpenUpload={setIsOpenUpload}/>}
    </>
  )
}

export default UpdateComicPopup