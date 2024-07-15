import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Searchbar from "../searchbar/Searchbar";
import User from "../user/user_component/User";
import LoginPopup from "../user/login/LoginPopup";
import useLoginPopup from "../../hooks/LoginPopup";
import SidebarIcon from "../icon/SidebarIcon";
import { BiMenuAltLeft } from "react-icons/bi";
import Logo from "../../assets/MangaDex.png";
import { useStateContext } from "../../context/StateContext";
import classNames from "classnames";

const Common = ({ className, components }: any) => {
  const { setLoginPopup, loginPopup, handleLoginPopup } = useLoginPopup();
  const {isOpenSidebar, setOpenIsSidebar} = useStateContext();

  const combinedClasses = classNames(className, 'ml-[16px]', {
    'sm:ml-[290px]': isOpenSidebar
  });

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div
      style={{visibility: isOpenSidebar ? 'hidden' : 'visible'}} 
      className="flex fixed top-0 left-0 m-3 gap-3 place-items-center">
      <SidebarIcon
      onClick={() => setOpenIsSidebar(true)}
      className="cursor-pointer hover:bg-gray-200 rounded-full p-1 mt-1" 
      icon={<BiMenuAltLeft size={28}/>}/>
      <div className="flex items-center cursor-pointer">
          <img
            src={Logo}
            alt="MangaDex"
            className="w-10 h-8 rounded-xl cursor-pointer"
          />
          <div className="text-2xl font-sans font-bold cursor-pointer tracking-tight">
            MangaDex
          </div>
        </div>
      </div>
      <div className={combinedClasses}>{components}</div>
      <Searchbar />
      <User handleLoginPopup={handleLoginPopup} />
      <LoginPopup
        loginPopup={loginPopup}
        handleLoginPopup={handleLoginPopup}
        setLoginPopup={setLoginPopup}
      />
    </div>
  );
};

export default Common;
