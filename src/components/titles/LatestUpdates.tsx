import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

const LatestUpdates = () => {
  const navigate = useNavigate();
  const {selected, setSelected} = useStateContext();

  return <div className={`cursor-pointer hover:bg-gray-200 rounded-md ${selected === 'latest_updates' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`}
  onClick={() =>{
    setSelected("latest_updates")
    navigate("/titles/latest")
  }}>
    Latest Updates
    </div>;
};

export default LatestUpdates;
