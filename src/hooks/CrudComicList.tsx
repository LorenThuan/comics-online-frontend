import React, { useEffect } from "react";
import axios from "axios";
import { Comic, ComicFull } from "../components/constants/types";
import useOptions from "../components/constants/option_advanced_search";
import moment from "moment";

const useComicList = () => {
  const [comicListAll, setComicListAll] = React.useState<Comic[]>([]);
  const [comicListFull, setComicListFull] = React.useState<ComicFull[]>([]);
  const [popularComic, setPopularComic] = React.useState<Comic[]>([]);

  /* Get Comic List */
  useEffect(() => {
    // Function to fetch comic list
    const fetchComicList = async () => {
      try {
        // Check if comic list exists in localStorage
        const cachedComicList = localStorage.getItem("comicList");
        if (cachedComicList) {
          // If exists, parse and set the comic list
          setComicListAll(JSON.parse(cachedComicList));
        } else {
          // Otherwise, fetch from server
          const response = await axios.get(
            "http://localhost:8083/comic/last-comics"
          );

          setComicListAll(response.data);
          // Store in localStorage for future use
          localStorage.setItem("comicList", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching comic list:", error);
      }
    };

    // Call the function to fetch comic list
    fetchComicList();
  }, []); // Empty dependency array to only run once on component mount

  // /* Get Comic List Full*/
  // useEffect(() => {
  //   // Function to fetch comic list
  //   const fetchComicList = async () => {
  //     try {
  //       // Check if comic list exists in localStorage
  //       const cachedComicList = localStorage.getItem("comicListFull");
  //       if (cachedComicList) {
  //         // If exists, parse and set the comic list
  //         setComicListFull(JSON.parse(cachedComicList));
  //       } else {
  //         // Otherwise, fetch from server
  //         const response = await axios.get(
  //           "http://localhost:8083/comics"
  //         );
          
  //         setComicListFull(response.data);
  //         // Store in localStorage for future use
  //         // localStorage.setItem("comicListFull", JSON.stringify(response.data));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching comic list:", error);
  //     }
  //   };

  //   // Call the function to fetch comic list
  //   fetchComicList();
  // }, []); // Empty dependency array to only run once on component mount

  useEffect(() => {
    const fetchComicList = async () => {
      try {
        // Open cache storage
        const cache = await caches.open('comic-cache');
        
        // Check if the request exists in cache
        const cachedResponse = await cache.match('http://localhost:8083/comics');
        if (cachedResponse) {
          // If exists, parse and set the comic list
          const data = await cachedResponse.json();
          setComicListFull(data as ComicFull[]);
        } else {
          // Otherwise, fetch from server
          const response = await axios.get<ComicFull[]>('http://localhost:8083/comics');
          
          setComicListFull(response.data);

          // Store the response in cache
          const responseToCache = new Response(JSON.stringify(response.data), {
            headers: { 'Content-Type': 'application/json' }
          });
          cache.put('http://localhost:8083/comics', responseToCache);
        }
      } catch (error) {
        console.error('Error fetching comic list:', error);
      }
    };

    fetchComicList();
  }, []); // Empty dependency array to only run once on component mount

  /* Get Popular comic */
  useEffect(() => {
    // Function to fetch popular comic
    const fetchPopularComic = async () => {
      try {
        // Check if popular comic exists in localStorage
        const cachedPopularComic = localStorage.getItem("popularComic");
        if (cachedPopularComic) {
          // If exists, parse and set the popular comic
          setPopularComic(JSON.parse(cachedPopularComic));
        } else {
          // Otherwise, fetch from server
          const response = await axios.get(
            "http://localhost:8083/comic/popular-comics"
          );
          
          setPopularComic(response.data);
          // Store in localStorage for future use
          localStorage.setItem("popularComic", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching popular comic:", error);
      }
    };

    // Call the function to fetch popular comic
    fetchPopularComic();
  }, []); // Empty dependency array to only run once on component mount

  const [comicsQuery, setComicQuerys] = React.useState<Comic[]>([]);
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);

  // Handler for checkbox change
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    // Update selectedGenres based on checkbox state
    if (checked && !selectedGenres.includes(value)) {
      setSelectedGenres([...selectedGenres, value]);
      console.log(selectedGenres);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
      console.log(selectedGenres);
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
    try {
      console.log("Fetching data from server");
      const response = await axios.get("http://localhost:8083/titles/find", {
        params: {
          stateCheckBox: stateCheckBox,
          numOption: numOption,
          sortByOption: sortByOption,
          genres: genres,
        },
      });
      console.log("API response status:", response.status);
      console.log("API response data:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching search comic:", error);
      return [];
    }
  };

  function getClosestDate({ createDate, createDateChapter, lastModifiedDateChapter, lastModifiedDate}: Comic ): Date | null {
    const dates = [createDate, createDateChapter, lastModifiedDateChapter, lastModifiedDate].filter(date => date) as Date[];
  
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
    comicListFull,
    setComicListFull,
    getClosestDate
  };
};

export default useComicList;
