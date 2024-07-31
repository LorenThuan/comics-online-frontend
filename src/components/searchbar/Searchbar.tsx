import React, { useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import SidebarIcon from "../icon/SidebarIcon";
import useSearchPopup from "../../hooks/SearchPopup";
import SearchbarPopup from "./SearchbarPopup";
import { MdOutlineClose } from "react-icons/md";
import { useStateContext } from "../../context/StateContext";
import useComicList from "../../hooks/CrudComicList";
import { ComicFull } from "../constants/types";
import axios from "axios";

const Searchbar = () => {
  const { searchPopup, setSearchPopup } = useSearchPopup();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isFound, setIsFound] = React.useState<boolean>(false);

  const [searchComic, setSearchComic] = React.useState<ComicFull[]>([]);
  const cache: any = {};

  useEffect(() => {
    const handle = async () => {
      try {
        if (!searchQuery) {
          return [];
        }

          if (cache[searchQuery]) {
          return cache[searchQuery];
        }
  
        // console.log("Fetching data from server");
        const response = await axios.get(
          "http://localhost:8083/comics/search-list",
          {
            params: {
              searchQuery: searchQuery, // use the appropriate parameter name expected by your API
            },
          }
        );
        // console.log("API response status:", response.status);
        // console.log("API response data:", response.data);
        if (response.data.length > 0) {
          setIsFound(true);
          setSearchComic(response.data)
          cache[searchQuery] = response.data;
        } else {
          setIsFound(false);
        }
      } catch (error) {
        console.error("Error fetching comic:", error);
        return [];
      }
    };

    const debounceTimeout = setTimeout(() => {
      handle();
    }, 300); // Adjust the debounce delay as needed

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const searchRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      // @ts-ignore: Object is possibly 'null'.
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchPopup(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [setSearchPopup]);

  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="fixed top-0 right-0 m-0 my-3 mx-20">
      <div className="flex items-center" ref={searchRef}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={searchQuery}
          onClick={() => {
            setIsOpen(true);
            setSearchPopup(true);
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`input-search relative bg-white-rgb 
            w-[25px] sm:w-[234px] ${isOpen ? 'w-[350px] sm:w-[500px]' : ''}`}
          style={{
            // width: isOpen ? "350px sm:[500px]" : "",
            borderStyle: isOpen ? "solid" : "none",
            borderWidth: isOpen ? "2px" : "0px",
            borderColor: isOpen ? "orange" : "white",
            transitionProperty: "width",
            transitionDuration: isOpen ? "300ms" : "150ms",
          }}
        />
        <div className="flex items-center absolute right-0">
          <div>
            <span
              className="text-sm text-gray-500 mr-6 invisible sm:visible"
              style={{ visibility: isOpen ? "hidden" : undefined }}
            >
              Ctrl K
            </span>
          </div>
          {searchQuery ? (
            <SidebarIcon
              onClick={() => {
                setSearchQuery("");
                inputRef?.current?.focus(); // Focus on the input field
              }}
              className="absolute cursor-pointer right-0 bg-red-500 p-0.5 rounded-lg"
              icon={<MdOutlineClose size="20" color="white" />}
            />
          ) : (
            <SidebarIcon
            onClick={() => {
              setIsOpen(true);
              setSearchPopup(true);
            }}
              className="absolute right-0 mr-2 cursor-text"
              icon={<FiSearch size="16" />}
            />
          )}
        </div>
        {searchPopup && 
         <SearchbarPopup
         setSearchPopup={setSearchPopup}
         searchComic={searchComic}
         isFound={isFound}
         searchQuery={searchQuery}
       />
        }
      </div>
    </div>
  );
};

export default Searchbar;
