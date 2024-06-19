import React from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  return <div className="cursor-pointer hover:bg-gray-200" onClick={() => navigate("/users")}>Users</div>;
};

export default Users;
