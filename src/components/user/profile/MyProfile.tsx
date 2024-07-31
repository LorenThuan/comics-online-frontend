import React from "react";
import avartar from "../../../assets/Logo.jpg";
import { FaRegCircle } from "react-icons/fa";
import SidebarIcon from "../../icon/SidebarIcon";
import CrudUser from "../../../hooks/CrudUser";
import UserService from "../../constants/UserService";
import LoginRequired from "../login/LoginRequired";
import { useStateContext } from "../../../context/StateContext";

const MyProfile = () => {
  const { user } = useStateContext();
  const isAuthenticated = UserService.isAuthenticated();
  return (
    <>
      {isAuthenticated ? (
        <div className="flex justify-center items-center">
          <div className="bg-violet-300 w-fit rounded-md p-2">
            <div className="flex items-center space-x-4">
              <img
                src={avartar}
                alt="demo"
                className="object-cover w-[120px] h-[120px] rounded-full border border-solid border-white-rgb"
              />
              <div className="flex flex-col space-y-6">
                <h2 className="font-bold text-2xl">{user?.name}</h2>
                <div>
                  <p className="font-semibold text-xl">User Id</p>
                  <p>{user?.userId}</p>
                </div>

                <div>
                  <p className="font-semibold text-xl">Roles</p>
                  <div className="flex items-center gap-1 pl-2 mt-2 bg-gray-200 rounded-md">
                    <SidebarIcon
                      icon={<FaRegCircle size="14" color="gray" />}
                    />
                    <p>{user?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoginRequired />
      )}
    </>
  );
};

export default MyProfile;
