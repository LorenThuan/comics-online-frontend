import React from "react";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const navigate = useNavigate();

  return <div className="cursor-pointer hover:bg-gray-200" onClick={() => navigate("/titles/follows")}>Library</div>;
};

export default Library;
