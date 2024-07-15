import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/StateContext";

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const {selected, setSelected} = useStateContext();

  return <div className={`cursor-pointer hover:bg-gray-200 rounded-md
    ${selected === 'advanced_search' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`}
  onClick={() =>{
    setSelected("advanced_search");
    navigate("/titles");
  }
  }>
    Advanced Search</div>;
};

export default AdvancedSearch;
