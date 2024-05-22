import React from "react";
import Forums from "./Forums";
import Users from "./Users";
import Groups from "./Groups";
import { FiUsers } from "react-icons/fi";
import SidebarIcon from "../icon/SidebarIcon";

const Community = () => {
  return (
    <div className="space-y-2">
      <div className="sidebar-category">
        <SidebarIcon icon={<FiUsers size="22" />} />
        <div>Community</div>
      </div>
      <div className="ml-2 text-gray-700 font-sans space-y-1">
        <Forums />
        <Groups />
        <Users />
      </div>
    </div>
  );
};

export default Community;
