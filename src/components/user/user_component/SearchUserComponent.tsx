import React from "react";
import SidebarIcon from "../../icon/SidebarIcon";
import { GrLinkPrevious } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import UserList from "./UserList";
import UserService from "../../constants/UserService";
import LoginRequired from "../login/LoginRequired";
import CrudUser from "../../../hooks/CrudUser";

const SearchUserComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isAuthenticated = UserService.isAuthenticated();
  const { searchUser, setSearchUser, usersListSearch, userListMembers } =
    CrudUser();

  return (
    <div className="">
      <div className="flex space-x-2 items-center">
        <SidebarIcon
          icon={<GrLinkPrevious size="18" />}
          className="p-3 hover:bg-gray-200 rounded-full cursor-pointer"
        />
        <h2 className="font-semibold text-2xl">Search User</h2>
      </div>
      {isAuthenticated ? (
        <div>
          {" "}
          <div className="mt-10 mr-4 relative">
            <div className="relative w-full">
              <SidebarIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                icon={<FiSearch size="16" />}
              />

              <input
                type="text"
                name="searchUser"
                value={searchUser}
                placeholder="Search"
                onClick={() => {
                  setIsOpen(true);
                }}
                onBlur={() => setIsOpen(false)}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full rounded bg-gray-100 pl-10"
                style={{
                  borderStyle: isOpen ? "solid" : "none",
                  borderWidth: isOpen ? "1px" : "0px",
                  borderColor: isOpen ? "orange" : "white",
                  transitionProperty: "width",
                  transitionDuration: isOpen ? "300ms" : "150ms",
                }}
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4">
            <UserList
              usersListSearch={usersListSearch}
              searchUser={searchUser}
              userListMembers={userListMembers}
            />
          </div>
        </div>
      ) : (
        <LoginRequired />
      )}
    </div>
  );
};

export default SearchUserComponent;
