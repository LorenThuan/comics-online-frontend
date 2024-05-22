import React from "react";
import { LuHome } from "react-icons/lu";
import SidebarIcon from "./icon/SidebarIcon";

const Home = () => {
  return (
    <div className="flex space-x-2 mt-6 cursor-pointer">
      <div className="">
        <SidebarIcon icon={<LuHome size="24" />} />
      </div>

      <a
        href="/"
        onClick={(e) => e.preventDefault()}
        className="font-sans font-bold"
      >
        Home
      </a>
    </div>
  );
};

export default Home;
