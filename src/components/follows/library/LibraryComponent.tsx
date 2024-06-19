import React from "react";
import { GrLinkPrevious } from "react-icons/gr";
import SidebarIcon from "../../icon/SidebarIcon";
import LibraryList from "./LibraryList";
import UserService from "../../constants/UserService";
import LoginRequired from "../../user/login/LoginRequired";

const LibraryComponent = () => {
  const isAuthenticated = UserService.isAuthenticated();

  return (
    <div className="">
      <div className="flex space-x-2 items-center">
        <SidebarIcon
          icon={<GrLinkPrevious size="18" />}
          className="p-3 hover:bg-gray-200 rounded-full cursor-pointer"
        />
        <h2 className="font-semibold text-2xl">Library</h2>
      </div>
      {isAuthenticated ? <LibraryList /> : <LoginRequired/>}
      
    </div>
  );
};

export default LibraryComponent;
