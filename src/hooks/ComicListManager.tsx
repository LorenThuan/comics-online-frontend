import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ComicFull, User } from '../components/constants/types';
import chapterList from '../components/constants/chapter_list';
import UserService from '../components/constants/UserService';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useStateContext } from '../context/StateContext';

const ComicListManager = () => {
  const [usersList, setUsersList] = React.useState<User[]>([]);
  const {fetchDataRealTime} = useStateContext();

  useEffect(() => {
    handle();
    fetchDataRealTime("/topic/userUpdates", handle);
  }, []);

  const handle = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const result = await UserService.getAllUsers(token);
      // console.log(result);
      setUsersList(result.userList);
    }
  };

  const [comicData, setComicData] = React.useState<ComicFull>({
  nameComic: '',
  author: '',
  image_src: '',
  state: 'Đang Cập Nhật',
  genreList: [],
  chapterList: [{chapterNumber: 'Chương 1'}],
  });

  // const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // if (name === "image_src" && !/^https:\/\/.*/.test(value)) {
    //   e.target.setCustomValidity("The URL must start with 'https://'");
    // } else {
    //   e.target.setCustomValidity("");
    // }
    setComicData({ ...comicData, [name]: value });
  };

  const handleCheckboxChange = (genre: string) => {
    setComicData((prevData:any) => {
      const genreExists = prevData.genreList?.some((g:any) => g.genre === genre);
      if (genreExists) {
        return {
          ...prevData,
          genreList: prevData.genreList?.filter((g:any) => g.genre !== genre),
        };
      } else {
        return {
          ...prevData,
          genreList: [...(prevData.genreList || []), { genre }],
        };
      }
    });
  };

  const handleChapterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    // const selectedChapter = chapterList.find(chapter => chapter.chapterNumber === value);

      setComicData((prevData:any) => {
        // const chapterExists = prevData.chapterList?.some((ch:any) => ch.chapterNumber === value);
        // if (!chapterExists) {
          return {
            ...prevData,
            chapterList: value,
          };
        
        // return prevData;
      });
    
  };

  const [isOpenForm, setIsOpenForm] = React.useState(false);

  const closeFormAddPopup = () => {
    setIsOpenForm(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const confirmAdd = window.confirm(
        "Are you sure want to add this comic?"
      );
      if (confirmAdd) {
        if (comicData.genreList?.length !== 0) {
          // console.log('Form Data:', comicData);
          await axios.post("http://localhost:8083/comic", comicData);
          // await fetchComicListAll();
          
          closeFormAddPopup();
          toast.success("Add Comic successfully");
          setComicData({
            nameComic: '',
            author: '',
            image_src: '',
            state: 'Đang Cập Nhật',
            genreList: [],
            chapterList: comicData.chapterList,
          })
        } else {
          toast.error("Please Select Genres valid!");
        }
      }

    } catch (error: any) {
      // console.log("Error add comic", error);
      throw error;
    }
  };

  const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
  const [comicValue, setComicValue] = React.useState<ComicFull>({
    nameComic: '',
    author: '',
    image_src: '',
    state: 'Đang Cập Nhật',
    genreList: [],
    chapterList: [],
  });

    const handleOpenUpdate = async (comicId: number) => {
    setIsOpenUpdate((prevState) => !prevState);
    try {
      const response = await axios.get(`http://localhost:8083/comics/${comicId}`);       
      // console.log(response);
      setComicValue(response.data);
    } catch (error) {
      // console.log("Error while fetch comic by id ", error);
      throw error;
    }
  };

  const handleChangeUpdate = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComicValue({ ...comicValue, [name]: value });
  };

  const closeUpdateForm = () => {
    setIsOpenUpdate(false);
  };

  const handleUpdateCheckbox = (genre: string) => {
    setComicValue((prevData) => {
      const genreExists = prevData.genreList?.some((g:any) => g.genre === genre);
      if (genreExists) {
        return {
          ...prevData,
          genreList: prevData.genreList?.map((g:any) =>
            g.genre === genre ? { ...g, genre: '' } : g
          ),
        };
      }
      else {
        // If genre doesn't exist, find an empty slot or add a new genre
        const emptySlotIndex = prevData.genreList?.findIndex((g:any) => g.genre === '');
        if (emptySlotIndex !== -1) {
          return {
            ...prevData,
            genreList: prevData.genreList?.map((g:any, index) =>
              index === emptySlotIndex ? { ...g, genre } : g
            ),
          };
        }
        else {
        return {
          ...prevData,
          genreList: [...(prevData.genreList || []), { genre }],
        };
      }
      }
    });
  };

  const handleFormUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure want to update this comic?"
      );
      if (confirmUpdate) {
        // console.log('Form Data:', comicValue);
        await axios.put(`http://localhost:8083/comics/${comicValue.comicId}`, comicValue);
        closeUpdateForm();
        toast.success("Update Comic successfully");
      }

    } catch (error: any) {
      // console.log("Error while update comic", error);
      throw error;
    }
    
  }
  
  return {usersList, comicData, handleChange, handleCheckboxChange, 
    handleChapterChange, handleSubmit, isOpenUpdate, handleOpenUpdate, 
    handleFormUpdate, closeUpdateForm, setIsOpenUpdate, comicValue, 
    handleChangeUpdate, handleUpdateCheckbox, setComicValue, setComicData,
  isOpenForm, setIsOpenForm, closeFormAddPopup}
}

export default ComicListManager;