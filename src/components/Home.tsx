import React from "react";
import { LuHome } from "react-icons/lu";
import SidebarIcon from "./icon/SidebarIcon";
import {Link, useNavigate} from "react-router-dom";
import { useStateContext } from "../context/StateContext";

const Home = () => {
  const navigate = useNavigate();
  const {selected, setSelected} = useStateContext();

  return (
    <div
    onClick={(e) => {
      e.stopPropagation();
      setSelected("home");
      navigate("/");
    }}
    className={`flex space-x-2 mt-6 p-0.5 cursor-pointer
    hover:bg-gray-200 rounded-md ${selected === 'home' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}`}>
      <div className="">
        <SidebarIcon icon={<LuHome size="24" />} />
      </div>

      <div className="font-sans font-bold">
       Home
      </div>
    </div>

  );
};

export default Home;