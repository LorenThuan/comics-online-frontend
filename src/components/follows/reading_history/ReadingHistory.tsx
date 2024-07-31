import React from "react";
import { useStateContext } from "../../../context/StateContext";
import { useNavigate } from "react-router-dom";

const ReadingHistory = () => {
  const {selected, setSelected} = useStateContext();
  const navigate = useNavigate();

  return <div className={`cursor-pointer hover:bg-gray-200 rounded-md
    ${selected === 'reading_history' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`}
  onClick={() =>{
    setSelected("reading_history");
    navigate("/my/history");
  }
  }>Reading History</div>;
};

export default ReadingHistory;
