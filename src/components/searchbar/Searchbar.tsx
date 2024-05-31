import React from "react";
import { FiSearch } from "react-icons/fi";
import SidebarIcon from "../icon/SidebarIcon";
import User from "../user/User";

const Searchbar = () => {
  return (
    <div className="fixed top-0 right-0 m-0 my-3 mx-20">
        <div className="flex items-center">
        <input type="text" placeholder="Search" className="input-search relative"/>
        <div className="flex items-center absolute right-0">
        <div><span className="text-sm text-gray-500 mr-6">Ctrl K</span></div>
        <div className="absolute right-0 "><SidebarIcon icon={<FiSearch size="16"/>}/></div>
        </div>
        </div>
    </div>
  );
};

export default Searchbar;
