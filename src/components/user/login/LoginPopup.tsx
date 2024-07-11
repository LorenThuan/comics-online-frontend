import React, { useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";
import SidebarIcon from "../../icon/SidebarIcon";
import { IoSettingsOutline, IoWaterOutline } from "react-icons/io5";
import VnIcon from "../../../assets/vn.svg";
import { useNavigate } from "react-router-dom";
import UserService from "../../constants/UserService";
import { ImProfile } from "react-icons/im";
import { FaUsers } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { useStateContext } from "../../../context/StateContext";

interface PopupProps {
  loginPopup: boolean;
  setLoginPopup: (isLogin: boolean) => void;
  handleLoginPopup(): void;
}

const LoginPopup = (props: PopupProps) => {
  let loginRef = useRef(null);

  const navigate = useNavigate();

  // const { user } = CrudUser();
  const {user} = useStateContext();

  const isAuthenticated = UserService.isAuthenticated();
  const adminOnly = UserService.adminOnly();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout");
    if (confirmLogout) {
      UserService.logout();
      navigate("/");
    }
  };

  const onClose = () => {
    props.setLoginPopup(false);
  };

  useEffect(() => {
    let handle = (e: any) => {
      // @ts-ignore: Object is possibly 'null'.
      if (loginRef.current && !loginRef.current?.contains(e.target)) {
        onClose();
        console.log(loginRef.current);
      }
    };

    document.addEventListener("mousedown", handle);

    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, []);

  return (
    <>
      {props.loginPopup ? (
        <div className="h-screen w-screen fixed top-0 left-0 z-20 backdrop-brightness-75">
          <div
            className="fixed left-3/4 top-1/3 -translate-y-1/4 bg-white
      p-[24px] h-auto rounded-md shadow-md min-w-[256px] max-w-[320px] w-[302.906px]
      "
            ref={loginRef}
          >
            {/*User info*/}
            <div className="flex flex-col gap-4 mt-4 items-center hover:bg-gray-200 cursor-pointer">
              <SidebarIcon icon={<FiUser size="46" />} />
              <h1 className="text-2xl font-sans font-bold">
                {isAuthenticated ? (
                  <span>{user?.name}</span>
                ) : (
                  <span>Guest</span>
                )}
              </h1>
            </div>
            <hr className="border-1 border-solid border-hr-white-rgb my-4 w-full" />
            {/*Setting*/}
            <div className="flex flex-col gap-4">
              {/* User and Admin */}
              {isAuthenticated && (
                <div
                  onClick={() => navigate("/user/me")}
                  className="ml-6 flex items-center gap-2 hover:bg-gray-200 cursor-pointer "
                >
                  <SidebarIcon icon={<ImProfile size="24" />} />
                  <p className="text-lg">My Profile</p>
                </div>
              )}

              {adminOnly && (
                <div className="ml-6 flex flex-col space-y-3">
                  <div
                  onClick={() => navigate("/admin/user-manager")}
                  className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer "
                >
                  <SidebarIcon icon={<FaUsers size="24" />} />
                  <p className="text-lg">User Management</p>
                </div>

                <div
                onClick={() => navigate("/comics/comic-management")}
                className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer "
              >
                <SidebarIcon icon={<FaBook size="24" />} />
                <p className="text-lg">Comic Managemnet</p>
              </div>
                </div>
              )}

              {/*Settings and theme*/}
              <div className="flex w-full justify-evenly">
                <div className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer ">
                  <SidebarIcon icon={<IoSettingsOutline size="24" />} />
                  <p className="text-lg">Settings</p>
                </div>
                <div className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer">
                  <SidebarIcon icon={<IoWaterOutline size="24" />} />
                  <p className="text-lg">Theme</p>
                </div>
              </div>
              {/*Interface Language*/}
              <div className="flex justify-evenly items-center cursor-pointer hover:bg-gray-200">
                <p className="text-lg font-sans">Interface Language</p>
                <p className="font-sans text-[10px] text-white font-bold py-1 px-2 bg-orange-500 rounded-lg">
                  BETA
                </p>
              </div>
              {/*Chapter Languages*/}
              <div className="flex justify-around items-center hover:bg-gray-200 cursor-pointer">
                <p className="text-lg font-sans">Chapter Language</p>
                <div className="">
                  <img
                    src={VnIcon}
                    alt="Vn icons"
                    className="w-[20px] h-[20px] text-center"
                  />
                </div>
              </div>
              <div className="ml-6">
                {/*Content Fillter*/}
                <p className="text-lg font-sans hover:bg-gray-200 cursor-pointer">
                  Content Fillter
                </p>
              </div>
              <hr className="border-1 border-solid border-hr-white-rgb my-2 w-full" />
              {/*Login Register*/}
              <div className="flex flex-col gap-4">
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-4">
                    <button
                      className="px-10 py-2 text-lg bg-orange-500 rounded-lg text-white font-bold text-center
              hover:bg-orange-700"
                      onClick={() => navigate("/auth/login")}
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => navigate("/auth/register")}
                      className="text-center text-lg hover:bg-gray-400 cursor-pointer rounded-lg px-10 py-2"
                    >
                      Register
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <button
                      className="px-10 py-2 text-lg bg-red-500 rounded-lg text-white font-bold text-center
              hover:bg-red-700"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginPopup;
