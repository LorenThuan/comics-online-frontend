import React from "react";
import { FiSearch } from "react-icons/fi";
import SidebarIcon from "../icon/SidebarIcon";

const Searchbar = () => {
  return (
    <div>
      <div>
        <input type="text" placeholder="Search" />
        <span>Ctrl K</span>
        <SidebarIcon icon={<FiSearch size="18"/>}/>
      </div>
    </div>
  );
};

export default Searchbar;
