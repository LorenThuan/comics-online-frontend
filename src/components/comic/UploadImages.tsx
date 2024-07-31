import axios from 'axios';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Chapter, ComicFull } from '../constants/types';
import SidebarIcon from '../icon/SidebarIcon';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

interface UploadImageProps {
  chapterFound: any;
  setIsOpenUpload: (isUpload: boolean) => void;
  comicValue: ComicFull;
}

const UploadImages = (props: UploadImageProps) => {
  const [folderPath, setFolderPath] = useState<string>("C:\\Users\\thuan\\Desktop\\MyFiles");
  const [listStringFile, setListStringFile] = useState<FileList | null>(null);
  const clickOutSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clickOutSideRef.current && !clickOutSideRef.current.contains(event.target as Node)) {
        props.setIsOpenUpload(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleListImage = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      setListStringFile(event.target.files);
    }
  }

  const handleUploadImages = async () => {
   
    if (!listStringFile) {
      alert("Please select files to upload.");
      return;
    }

    try {
      const confirmUpload = window.confirm("Do you want to upload images to file system!");
      if (confirmUpload) {
        const formData = new FormData();
        formData.append('folderPath', folderPath);
        for (let i = 0; i < listStringFile.length; i++) {
          formData.append('images', listStringFile[i]);
        }

        const response = await axios.post(
          `http://localhost:8083/image/fileSystem/${props.chapterFound.chapterId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // console.log("API response status:", response.status);
        // console.log("API response data:", response.data);
        if (response.status === 200) {
          if (response.data.some((message: string) => message === "File data already in file")) {
            alert("File data already in file!");
            return;
          }
          alert("Upload successfully!");
          props.setIsOpenUpload(false);
        } else {
          alert("Can't find chapterId!");
          return;
        }
      }
    } catch (error) {
      console.error("Error when uploading images", error);
      toast.error("Image upload failed, please select correct image type!");
    }
  }
  
  return (
    <div className='w-screen h-auto fixed top-0 left-0'>
       <div
       ref={clickOutSideRef}
       className='fixed mb-10 top-2/3 left-1/2 bg-gray-100  
       -translate-x-1/2 -translate-y-2/3 rounded-lg'>
        <div className='flex justify-end'>
        <SidebarIcon
          onClick={() => props.setIsOpenUpload(false)} 
          className="cursor-pointer hover:bg-white rounded-full" 
          icon={<IoMdClose size={30} color='black'/>}/>
        </div>
        {props.chapterFound && 
        <div>
          <div className='select-none text-center'>ChapterId upload: {props.chapterFound.chapterId}</div>
          <div className='select-none text-center'>Chapter Number: {props.chapterFound.chapterNumber}</div>
          <div className='select-none text-center'>Name Comic: {props.comicValue.nameComic}</div>
        </div>
        } 
        
        <div className='flex flex-col m-4'>
          <label htmlFor="location" className='text-center'>Location you want save:</label>
          <input 
            type="text"
            name='location'
            className='rounded w-full' 
            placeholder='Enter paths location save image'
            required
            value={folderPath}
            onChange={(e) => {
                setFolderPath(e.target.value);
            }}
          />
        </div>
        
        <div className='flex flex-col m-4'>
          <label htmlFor="images" className='text-center'>Selected List images chapers:</label>
          <input 
            type="file"
            name='images'
            accept="image/*"
            multiple
            formEncType='multipart/form-data'
            onChange={handleListImage}
            className='rounded w-full' 
            required
          />
        </div>
        
        <div className='flex flex-col m-4 items-center'>
          <button
            onClick={handleUploadImages} 
            className='px-4 text-white w-fit py-2 rounded bg-blue-500 hover:bg-blue-600'>
            Upload Images
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default UploadImages;
