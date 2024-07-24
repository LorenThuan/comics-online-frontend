import { useEffect } from "react";
import Common from "../common/Common";
import Featured from "../featured/Featured";
import useComicList from "../../hooks/CrudComicList";
import LastestUpdateMain from "../lastest-updates/LastestUpdateMain";
import PopularTitles from "../popular-titles/PopularTitles";
import ChapterManager from "../chapter/ChapterManager";

const Home = () => {
  const { popularComic, loadingPopularComics } = useComicList();
  //p-4 when close  sidebar

  return (
    <Common
      className="grid grid-cols-1 w-full"
      components={
        <div>
          <PopularTitles
            data={popularComic}
            loadingPopularComics={loadingPopularComics}
          />
          <LastestUpdateMain />
          <Featured />
        </div>
      }
    />
  );
};

export default Home;
