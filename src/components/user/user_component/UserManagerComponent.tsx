import React from "react";
import Common from "../../common/Common";
import UserManagement from "./UserManagement";
import CrudUser from "../../../hooks/CrudUser";

const UserManagerComponent = () => {
  return (
    <Common
      className="grid grid-cols-1 w-full ml-[290px] mt-10"
      components={<UserManagement />}
    />
  );
};

export default UserManagerComponent;
