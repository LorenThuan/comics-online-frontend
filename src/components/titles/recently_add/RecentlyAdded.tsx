import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../context/StateContext';

const RecentlyAdded = () => {
  const navigate = useNavigate();
  const {selected, setSelected} = useStateContext();

  return <div className={`cursor-pointer hover:bg-gray-200 rounded-md
    ${selected === 'recently_add' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`}
  onClick={() =>{
    setSelected("recently_add");
    navigate("/titles/recent");
  }
  }>
    Recently Added</div>;
    };


export default RecentlyAdded;