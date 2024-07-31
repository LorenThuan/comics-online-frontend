import { useEffect } from "react";
import Common from "../common/Common";
import useComicList from "../../hooks/CrudComicList";
import LastestUpdateMain from "../lastest-updates/LastestUpdateMain";
import PopularTitles from "../popular-titles/PopularTitles";
import ChapterManager from "../chapter/ChapterManager";
import RecentlyAdded from "../titles/recently_add/RecentlyAdd";

const Home = () => {
  const { popularComic, loadingPopularComics } = useComicList();

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
          <RecentlyAdded />
        </div>
      }
    />
  );
};

export default Home;
