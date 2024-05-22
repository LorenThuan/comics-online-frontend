import React from "react";
import AdvancedSearch from "./AdvancedSearch";
import RecentlyAdded from "./RecentlyAdded";
import LatestUpdates from "./LatestUpdates";
import Random from "./Random";
import { FiBookOpen } from "react-icons/fi";
import SidebarIcon from "../icon/SidebarIcon";

const Titles = () => {
  return (
    <div className="space-y-2">
      <div className="sidebar-category">
        <SidebarIcon icon={<FiBookOpen size="22" />} />
        <div>Titles</div>
      </div>
      <div className="ml-2 text-gray-700 font-sans space-y-1">
        <AdvancedSearch />
        <RecentlyAdded />
        <LatestUpdates />
        <Random />
      </div>
    </div>
  );
};

export default Titles;
