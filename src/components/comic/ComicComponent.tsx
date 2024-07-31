import React, { useEffect } from 'react'
import UserService from '../constants/UserService'
import LoginRequired from '../user/login/LoginRequired';
import axios from 'axios';
import { ComicFull } from '../constants/types';
import TableComicList from './TableComicList';
import useComicList from '../../hooks/CrudComicList';
import UploadImages from './UploadImages';
const ComicComponent = () => {
  const adminOnly = UserService.adminOnly();
  const [searchQuery, setSearchQuery] = React.useState<string>("");  
  const {comicListFull, loadingAllComics} = useComicList();

  const [comicSearch, setComicSearch] = React.useState<ComicFull[]>([]);
  const [isFound, setIsFound] = React.useState(false);

  useEffect(() => {
    const handle = async () => {
      try {
        if (!searchQuery) {
          return [];
        }
  
        // console.log("Fetching data from server");
        const response = await axios.get(
          "http://localhost:8083/comics/search-comics",
          {
            params: {
              searchQuery: searchQuery, // use the appropriate parameter name expected by your API
            },
          }
        );
        // console.log("API response status:", response.status);
        // console.log("API response data:", response.data);
        if (response.status === 200) {
          setIsFound(true);
          setComicSearch(response.data)
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

  return (
    <>
    {adminOnly ? (
      <div>
      <div className='flex justify-center'>
        <input type="text" placeholder='Search'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='input-search relative bg-white-rgb w-full mr-4 mt-10'
        />
      </div>
      <div className=''>
        {/* <UploadImages/> */}
      </div>
      {searchQuery === "" ? (
        <TableComicList data={comicListFull} loadingAllComics={loadingAllComics}/>
      ) : (
        isFound ? (
          <TableComicList data={comicSearch} loadingAllComics={loadingAllComics}/>
        ) : (
          <div className='bg-slate-200 flex justify-center items-center rounded p-2 mt-10 mr-4'>
            <div className='text-xl'>No results found.</div>
          </div>
        )
      )}
     </div>
    ) : (
      <LoginRequired />
    )}
  </>
  )
}

export default ComicComponent