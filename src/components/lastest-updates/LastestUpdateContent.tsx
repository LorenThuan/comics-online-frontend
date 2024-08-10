import LastestUpdateList from "./LastestUpdateList";
import useComicList from "../../hooks/CrudComicList";

const LastestUpdateContent = () => {
  const { comicListAll, loadingLastComics } = useComicList();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mr-4">
      <LastestUpdateList data={comicListAll.slice(0, 6)} loadingLastComics={loadingLastComics} />
      <LastestUpdateList data={comicListAll.slice(7, 13)} loadingLastComics={loadingLastComics} />
    </div>
  );
};

export default LastestUpdateContent;
