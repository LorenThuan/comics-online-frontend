import React, { useEffect, useState } from "react";
import axios from "axios";
import { ComicFull, ImageProps } from "../components/constants/types";
import useOptions from "../components/constants/option_advanced_search";
import moment from "moment";
import { useStateContext } from "../context/StateContext";

const useComicList = () => {
  const [comicListAll, setComicListAll] = React.useState<ComicFull[]>([]);
  // const [comicListFull, setComicListFull] = React.useState<ComicFull[]>([]);
  const [popularComic, setPopularComic] = React.useState<ComicFull[]>([]);
  const [loadingLastComics, setLoadingLastComics] = React.useState<boolean>(false);
  const [loadingPopularComics, setLoadingPopularComics] = React.useState<boolean>(false);
  // const [loadingAllComics, setLoadingAllComics] = React.useState<boolean>(false);
  const [loadingAdvancedSearch, setLoadingAdvancedSearch] = React.useState<boolean>(false);
  const [recentlyComic, setRecentlyComic] = React.useState<ComicFull[]>([]);
  const [loadingRecentlyComics, setLoadingRecentlyComics] = React.useState<boolean>(false);
  const {fetchDataRealTime} = useStateContext();

  /* Get Comic List */
  const fetchComicList = async () => {
    setLoadingLastComics(true);
    try {
        const response = await axios.get(
        "http://localhost:8083/comic/last-comics");
        setComicListAll(response.data);
      } catch (error) {
        // console.error("Error fetching comic list:", error);
        throw error;
      } finally {
        setLoadingLastComics(false);
      }
    };

    const fetchPopularComic = async () => {
      setLoadingPopularComics(true);
      try {
          const response = await axios.get(
            "http://localhost:8083/comic/popular-comics"
          );
          setPopularComic(response.data);
      } catch (error) {
        // console.error("Error fetching popular comic:", error);
        throw error;
      } finally {
        setLoadingPopularComics(false);
      }
    };

    // const fetchComicListAll = async () => {
    //   setLoadingAllComics(true);
    //   try {
    //       // Otherwise, fetch from server
    //       const response = await axios.get("http://localhost:8083/comics");
          
    //       setComicListFull(response.data);
    //   } catch (error) {
    //     // console.error("Error fetching comic list:", error);
    //     throw error;
    //   } finally {
    //     setLoadingAllComics(false);
    //   }
    // };

    /* Get Comic List Recently Add*/
  const fetchComicRecentlyAdd = async () => {
    setLoadingRecentlyComics(true);
    try {
        const response = await axios.get(
        "http://localhost:8083/comic/titles/recent");
        setRecentlyComic(response.data);
      } catch (error) {
        // console.error("Error fetching comic list:", error);
        throw error;
      } finally {
        setLoadingRecentlyComics(false);
      }
    };

    useEffect(() => {
      fetchComicRecentlyAdd();
    }, []);

    useEffect(() => {
      fetchComicList();
      fetchDataRealTime("/topic/comicUpdates", fetchComicList);
    }, []);

    useEffect(() => {
      fetchPopularComic();
    }, []);

  const [comicsQuery, setComicQuerys] = React.useState<ComicFull[]>([]);
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);

  // Handler for checkbox change
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    // Update selectedGenres based on checkbox state
    if (checked && !selectedGenres.includes(value)) {
      setSelectedGenres([...selectedGenres, value]);
      // console.log(selectedGenres);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
      // console.log(selectedGenres);
    }
  };

  const { optionState, optionNumChapter, optionSortBy } = useOptions();
  const [selectedOptionState, setSelectedOptionState] = React.useState(
    optionState[0].value
  );
  const [selectedOptionNum, setSelectedOptionNum] = React.useState(
    optionNumChapter[0].value
  );
  const [selectedOptionSort, setSelectedOptionSort] = React.useState(
    optionSortBy[0].value
  );

  /* Advanced comic*/
  const [isFindComic, setIsFindComic] = React.useState<boolean>(false);

  const fetchSearchAdvanced: any = async (
    stateCheckBox: string,
    numOption: string,
    sortByOption: string,
    genres: string
  ) => {
    setLoadingAdvancedSearch(true);
    try {
      // console.log("Fetching data from server");
      const response = await axios.get("http://localhost:8083/titles/find", {
        params: {
          stateCheckBox: stateCheckBox,
          numOption: numOption,
          sortByOption: sortByOption,
          genres: genres,
        },
      });
      // console.log("API response status:", response.status);
      // console.log("API response data:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching search comic:", error);
      return [];
    } finally {
      setLoadingAdvancedSearch(false);
    }
  };
/* lastModifiedDate: chapter and comic new been add */
  function getClosestDate({ createDate, createDateChapter, lastModifiedDateChapter }: ComicFull ): Date | null {
    const dates = [createDate, createDateChapter, lastModifiedDateChapter].filter(date => date) as Date[];
  
    if (dates.length === 0) return null;
  
    const now = moment();
    let closestDate = dates[0];
    let smallestDiff = Math.abs(now.diff(moment(dates[0])));
  
    for (let i = 1; i < dates.length; i++) {
      const diff = Math.abs(now.diff(moment(dates[i])));
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestDate = dates[i];
      }
    }
  
    return closestDate;
  }

  const [images, setImages] = useState<ImageProps[]>([]);

  const fetchImages = async (chapterId: number) => {
    try {
      const response = await axios.get(`http://localhost:8083/api/images/${chapterId}`);
      // console.log("Response data:", response);
      
      setImages(response.data);
    } catch (error) {
      // console.log("Error fetching Images:", error);
      throw error;
    }
  }

  return {
    comicListAll,
    setComicListAll,
    popularComic,
    setPopularComic,
    selectedGenres,
    setSelectedGenres,
    handleChecked,
    selectedOptionState,
    setSelectedOptionState,
    selectedOptionNum,
    setSelectedOptionNum,
    selectedOptionSort,
    setSelectedOptionSort,
    comicsQuery,
    isFindComic,
    setIsFindComic,
    fetchSearchAdvanced,
    setComicQuerys,
    // comicListFull,
    // setComicListFull,
    // loadingAllComics,
    getClosestDate, loadingLastComics, loadingPopularComics,
    fetchImages, images, loadingAdvancedSearch, recentlyComic, loadingRecentlyComics,
    setLoadingLastComics, fetchComicList
  };
};

export default useComicList;
