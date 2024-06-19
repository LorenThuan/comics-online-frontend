import Common from "../common/Common";
import PopularComicDetails from "./PopularComicDetails";

const PopularDetailMain = () => {

  return (
      <Common className="grid grid-cols-1 w-full ml-[290px]" components={<PopularComicDetails/>}/>
  )
};

export default PopularDetailMain;
