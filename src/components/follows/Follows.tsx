import React from "react";
import Updates from "./Updates";
import Library from "./Library";
import MDLists from "./MDLists";
import MyGroups from "./MyGroups";
import ReadingHistory from "./ReadingHistory";
import { FaRegBookmark } from "react-icons/fa";
import SidebarIcon from "../icon/SidebarIcon";

const Follows = () => {
  return (
    <div className="space-y-2">
      <div className="sidebar-category">
        <SidebarIcon icon={<FaRegBookmark size="22" />} />
        <h2>Follows</h2>
      </div>
      <div className="ml-2 text-gray-700 font-sans space-y-1">
        <Updates />
        <Library />
        <MDLists />
        <MyGroups />
        <ReadingHistory />
      </div>
    </div>
  );
};

export default Follows;
