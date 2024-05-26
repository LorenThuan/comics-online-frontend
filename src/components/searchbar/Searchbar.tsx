import React from "react";
import { FiSearch } from "react-icons/fi";
import SidebarIcon from "../icon/SidebarIcon";
import User from "../user/User";

const Searchbar = () => {
  return (
    <div className="fixed top-0 right-0 m-0 my-3 mx-20">
        <div className="input-search flex"><input type="text" placeholder="Search" className="input-search"/>
        <div className="flex items-center space-x-3 mr-3 flex-shrink-0">
        <span className="text-sm text-gray-500">Ctrl K</span>
        <SidebarIcon icon={<FiSearch size="16"/>}/>
        </div>
        </div>
    </div>
  );
};

export default Searchbar;
