import React from "react";
import SidebarIcon from "../../icon/SidebarIcon";
import { GrLinkPrevious } from "react-icons/gr";
import LastestComicsContentAll from "./LastestComicsContentAll";
import Sidebar from "../../sidebar/Sidebar";
import Searchbar from "../../searchbar/Searchbar";
import User from "../../user/User";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../../user/LoginPopup";
import useLoginPopup from "../../hooks/LoginPopup";

const LastestComicsAll = () => {
  const navigate = useNavigate();
  const { setLoginPopup, loginPopup, handleLoginPopup } = useLoginPopup();
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />

        <div className="grid grid-cols-1 w-full ml-[280px] mt-20">
          <div className="pb-8 grid grid-cols-1 justify-center">
            <div className="flex space-x-2 items-center">
              <div
                className="p-3 rounded-full hover:bg-white-rgb cursor-pointer"
                onClick={() => navigate("/")}
              >
                <SidebarIcon icon={<GrLinkPrevious size="18" />} />
              </div>

              <h1 className="text-2xl font-semibold">Latest Updates</h1>
            </div>
            <LastestComicsContentAll />
          </div>
        </div>
        <Searchbar/>
        <User handleLoginPopup={handleLoginPopup} />
        <LoginPopup
          loginPopup={loginPopup}
          handleLoginPopup={handleLoginPopup}
          setLoginPopup={setLoginPopup}
        />
      </div>
    </>
  );
};

export default LastestComicsAll;
