import React, {useEffect} from 'react'
import axios from "axios";
import { Comic } from '../constants/types';

const useComicList = () => {
  const [comicList, setComicList] = React.useState<Comic[]>([]);

  /* Get Comic List */
  useEffect(() => {
    
    const loadComicList = async () => {
      const result = await axios.get("http://localhost:8083/last-comics");
      setComicList(result.data);
    } 

    loadComicList();
  }, [])

  
  
  return {comicList, setComicList};
}

export default useComicList;