import React from "react";
import Logo from "../../assets/MangaDex.png";
import Home from "../Home";
import Follows from "../follows/Follows";
import Titles from "../titles/Titles";
import Community from "../community/Community";
import MangaDex from "../mangadex/MangaDex";
import SidebarIcon from "../icon/SidebarIcon";
import { MdOutlineClose } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen fixed bg-white-rgb top-0 m-0 border-1 border-solid box-border overflow-y-auto overflow-x-auto overscroll-contain">
      <div className="mx-5 my-3 space-y-3 ">
        <div className="flex space-x-10 items-center">
          <div className="flex items-center">
            <img
              src={Logo}
              alt="MangaDex"
              className="w-10 h-8 rounded-xl cursor-pointer"
            />
            <div className="text-2xl font-sans font-bold cursor-pointer tracking-tight">
              MangaDex
            </div>
          </div>

          <div className="cursor-pointer">
            {" "}
            <SidebarIcon icon={<MdOutlineClose size="26" />} />
          </div>
        </div>

        <div className="mx-2 space-y-4">
          <Home />
          <Follows />
          <Titles />
          <Community />
          <MangaDex />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
