import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

const Users = () => {
  const navigate = useNavigate();
  const {selected, setSelected} = useStateContext();

  return <div className={`cursor-pointer hover:bg-gray-200 rounded-md ${selected === 'users' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`}
  onClick={() => {
    setSelected("users")
    navigate("/users")
  }}>
    Users
    </div>;
};

export default Users;
