import React from "react";
import LastestComicsContentAll from "./LastestComicsContentAll";
import Common from "../../common/Common";

const LastestComicsAll = () => {

  return (
    <Common className="grid grid-cols-1 w-full mt-16" components={<LastestComicsContentAll/>}/>
  );
};

export default LastestComicsAll;
