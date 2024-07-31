import React from "react";
import SupportUs from "./SupportMe";
import SiteRules from "./SiteRules";
import Announcements from "./Announcements";
import AboutUs from "./AboutMe";
import { GrPin } from "react-icons/gr";
import SidebarIcon from "../icon/SidebarIcon";

const ComicRead = () => {
  return (
    <div className="space-y-2">
      <div className="sidebar-category">
        <SidebarIcon icon={<GrPin size="22" />} />
        <div>ComicRead</div>
      </div>

      <div className="ml-2 text-gray-700 font-sans space-y-1">
        <SupportUs />
        <SiteRules />
        <Announcements />
        <AboutUs />
      </div>
    </div>
  );
};

export default ComicRead;
