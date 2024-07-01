import { useEffect } from "react";
import Common from "../common/Common";
import Featured from "../featured/Featured";
import useComicList from "../../hooks/CrudComicList";
import CrudUser from "../../hooks/CrudUser";
import LastestUpdateMain from "../lastest-updates/LastestUpdateMain";
import PopularTitles from "../popular-titles/PopularTitles";
import { useStateContext } from "../../context/StateContext";

const Home = () => {
  const { popularComic } = useComicList();
  // const { handleGetUserLogin } = CrudUser();

  // useEffect(() => {
  //   handleGetUserLogin();
  // }, []);

  return (
    <Common
      className="grid grid-cols-1 w-full ml-[290px]"
      components={
        <div>
          <PopularTitles data={popularComic} />
          <LastestUpdateMain />
          <Featured />
        </div>
      }
    />
  );
};

export default Home;
