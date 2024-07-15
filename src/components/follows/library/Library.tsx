import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/StateContext";

const Library = () => {
  const navigate = useNavigate();
  const {selected, setSelected} = useStateContext();

  return <div className={`cursor-pointer hover:bg-gray-200 rounded-md ${selected === 'library' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`} 
  onClick={() => {
    setSelected("library")
    navigate("/titles/follows")
  }}>
      Library
      </div>;
};

export default Library;
