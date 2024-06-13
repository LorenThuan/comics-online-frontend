import React from "react";
import { LuHome } from "react-icons/lu";
import SidebarIcon from "./icon/SidebarIcon";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div className="flex space-x-2 mt-6 p-0.5 cursor-pointer bg-orange-500 rounded-md text-white">
      <div className="">
        <SidebarIcon icon={<LuHome size="24" />} />
      </div>

      <Link to="/"
        onClick={(e) => e.stopPropagation()}
        className="font-sans font-bold">Home</Link>
    </div>
  );
};

export default Home;