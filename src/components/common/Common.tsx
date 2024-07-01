import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Searchbar from "../searchbar/Searchbar";
import User from "../user/user_component/User";
import LoginPopup from "../user/login/LoginPopup";
import useLoginPopup from "../../hooks/LoginPopup";
import UpdateUserPopup from "../user/user_component/UpdateUserPopup";
import CrudUser from "../../hooks/CrudUser";

const Common = ({ className, components }: any) => {
  const { setLoginPopup, loginPopup, handleLoginPopup } = useLoginPopup();

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className={className}>{components}</div>
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
