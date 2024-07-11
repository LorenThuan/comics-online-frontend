import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import { Comic, User } from '../components/constants/types';
import chapterList from '../components/constants/chapter_list';
import UserService from '../components/constants/UserService';
import axios from 'axios';
import useComicList from './CrudComicList';

const ComicListManager = () => {
  const [usersList, setUsersList] = React.useState<User[]>([]);
  const {setComicListFull, setComicListAll} = useComicList();

  useEffect(() => {
    const handle = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const result = await UserService.getAllUsers(token);
        console.log(result);
        setUsersList(result.userList);
      }
    };
    if (usersList === null) {
      handle();
    }
  }, [usersList]);

  const [comicData, setComicData] = React.useState<Comic>({
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
    const selectedChapter = chapterList.find(chapter => chapter.chapterNumber === value);
    if (selectedChapter) {
      setComicData((prevData:any) => {
        const chapterExists = prevData.chapterList?.some((ch:any) => ch.chapterNumber === value);
        if (!chapterExists) {
          return {
            ...prevData,
            chapterList: [...(prevData.chapterList || []), selectedChapter],
          };
        }
        return prevData;
      });
    }
  };

  const [isOpenForm, setIsOpenForm] = React.useState(false);

  const closeFormAddPopup = () => {
    setIsOpenForm(false);
  };

  const updateLocalStorage = (comicList:any) => {
    const comicListString = JSON.stringify(comicList);
  
  // Check if the new data exceeds the localStorage limit (typically around 5MB)
  if (comicListString.length > 5000000) { // approximate size check
    console.error("Error: Data exceeds localStorage size limit.");
    return;
  }
  
  try {
    localStorage.setItem('comicListFull', comicListString);
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const confirmAdd = window.confirm(
        "Are you sure want to add this comic?"
      );
      if (confirmAdd) {
        console.log('Form Data:', comicData);
        const response = await axios.post("http://localhost:8083/comic", comicData);
        setComicListFull((prevList) => {
          const updatedList = [...prevList, response.data];
          updateLocalStorage(updatedList);
          return updatedList;
        });
        const responseComicAll = await axios.get(
          "http://localhost:8083/comic/last-comics"
        );
        // Store in localStorage for future use
        localStorage.setItem("comicList", JSON.stringify(responseComicAll.data));
        closeFormAddPopup();
        alert("Add Comic successfully");
        setComicData({
          nameComic: '',
          author: '',
          image_src: '',
          state: 'Đang Cập Nhật',
          genreList: [],
          chapterList: [],
        })
      }

    } catch (error: any) {
      console.log("Error add comic", error);
      throw error;
    }
  };

  const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
  const [comicValue, setComicValue] = React.useState<Comic>({
    nameComic: '',
    author: '',
    image_src: '',
    state: 'Đang Cập Nhật',
    genreList: [],
    chapterList: [],
  });

    const handleOpenUpdate = async (comicId: number) => {
    setIsOpenUpdate((prevState) => !prevState);
    console.log(comicId);
    try {
      const response = await axios.get(`http://localhost:8083/comics/${comicId}`);       
      console.log(response);
      setComicValue(response.data);
    } catch (error) {
      console.log("Error while fetch comic by id ", error);
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
        console.log('Form Data:', comicValue);
        const response = await axios.put(`http://localhost:8083/comics/${comicValue.comicId}`, comicValue)
        setComicListFull((prevList) => 
          {
          const updatedList = prevList.map((comic) => 
            comic.comicId === comicValue.comicId ? response.data : comic
          );
          updateLocalStorage(updatedList);
          return updatedList;
          }
        );
        const responseComicAll = await axios.get(
          "http://localhost:8083/comic/last-comics"
        );
        // Store in localStorage for future use
        localStorage.setItem("comicList", JSON.stringify(responseComicAll.data));
        closeUpdateForm();
        alert("Update Comic successfully");
      }

    } catch (error: any) {
      console.log("Error while update comic", error);
      throw error;
    }
    
  }
  
  return {usersList, comicData, handleChange, handleCheckboxChange, 
    handleChapterChange, handleSubmit, isOpenUpdate, handleOpenUpdate, 
    handleFormUpdate, closeUpdateForm, setIsOpenUpdate, comicValue, 
    handleChangeUpdate, handleUpdateCheckbox, setComicValue, setComicData,
  isOpenForm, setIsOpenForm, closeFormAddPopup, updateLocalStorage}
}

export default ComicListManager;