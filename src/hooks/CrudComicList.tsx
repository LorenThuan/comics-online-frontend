import React, { useEffect } from "react";
import axios from "axios";
import { Comic } from "../components/constants/types";
import useOptions from "../components/constants/option_advanced_search";

const useComicList = () => {
  const [comicListAll, setComicListAll] = React.useState<Comic[]>([]);
  const [popularComic, setPopularComic] = React.useState<Comic[]>([]);
  // const [searchComic, setSearchComic] = React.useState<Comic[]>([]);
  // const [searchQuery, setSearchQuery] = React.useState("");

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
          console.log(response);
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
          console.log(response);

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

  /* Get List Search comic */
  // Function to fetch search comic by name or author
  const cache: any = {};

  const fetchSearchComic = async (searchQuery: string) => {
    try {
      if (!searchQuery) {
        console.error("Search query is empty");
        return [];
      }

      if (cache[searchQuery]) {
        return cache[searchQuery];
      }

      console.log("Fetching data from server");
      const response = await axios.get(
        "http://localhost:8083/comics/search-list/",
        {
          params: {
            searchQuery: searchQuery, // use the appropriate parameter name expected by your API
          },
        }
      );
      console.log("API response status:", response.status);
      console.log("API response data:", response.data);

      cache[searchQuery] = response.data;
      return response.data;
    } catch (error) {
      console.error("Error fetching popular comic:", error);
      return [];
    }
  };

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
  const [isFindComic, setIsFindComic] = React.useState(false);

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
      console.error("Error fetching popular comic:", error);
      return [];
    }
  };

  return {
    comicListAll,
    setComicListAll,
    popularComic,
    setPopularComic,
    fetchSearchComic,
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
  };
};

export default useComicList;
