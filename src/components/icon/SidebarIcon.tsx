import React from "react";

const SidebarIcon = ({ icon, onClick, className }: any) => {
  return <div className={className} onClick={onClick}>{icon}</div>;
};

export default SidebarIcon;
