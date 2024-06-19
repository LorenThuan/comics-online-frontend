import React from "react";
import { useNavigate } from "react-router-dom";

const AdvancedSearch = () => {
  const navigate = useNavigate();
  return <div className="cursor-pointer hover:bg-gray-200" onClick={() =>navigate("/titles")}>Advanced Search</div>;
};

export default AdvancedSearch;
