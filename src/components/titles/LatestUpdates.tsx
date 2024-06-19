import React from "react";
import { useNavigate } from "react-router-dom";

const LatestUpdates = () => {
  const navigate = useNavigate();
  return <div className="cursor-pointer hover:bg-gray-200" onClick={() =>navigate("/titles/latest")}>Latest Updates</div>;
};

export default LatestUpdates;
