import React from "react";
import Logo from "../../assets/Logo.jpg";
import Home from "../Home";
import Follows from "../follows/Follows";
import Titles from "../titles/Titles";
import Community from "../community/Community";
import MangaDex from "../comicread/ComicRead";
import SidebarIcon from "../icon/SidebarIcon";
import { MdOutlineClose } from "react-icons/md";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";

const   Sidebar = () => {
  const navigate = useNavigate();
  const {setSelected, setOpenIsSidebar, isOpenSidebar} = useStateContext();
  return (
    <>
    <div
    className={`flex fixed flex-col h-screen w-auto bg-white-rgb 
    top-0 left-0 m-0 border border-solid box-border overflow-auto overflow-y-scroll overscroll-contain ${
      isOpenSidebar ? 'translate-x-0' : '-translate-x-full'
    } z-50`}>
      <div className="mx-3 my-3 gap-3">
        <div className="flex gap-8 items-center">
          <div 
          onClick={(e) => {
            e.stopPropagation();
            setSelected("home");
            navigate("/");
          }
          }
          className="flex items-center cursor-pointer">
            <img
              src={Logo}
              alt="ComicRead"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-2xl font-sans font-bold tracking-tight">
              ComicRead
            </div>
          </div>

          <div 
          onClick={() => setOpenIsSidebar(false)}
          className="cursor-pointer rounded-full hover:bg-gray-200 p-2">
            <SidebarIcon icon={<MdOutlineClose size="26" />} />
          </div>
        </div>

        <div className="mx-2 space-y-4">
          <Home />
          <Follows />
          <Titles />
          <Community />
          <MangaDex />
          <Footer />
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
