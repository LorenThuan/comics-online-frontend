import Featured from "../featured/Featured";
import useComicList from "../hooks/CrudComicList";
import useLoginPopup from "../hooks/LoginPopup";
import LastestUpdateMain from "../lastest-updates/LastestUpdateMain";
import PopularComicDetails from "../popular-titles/PopularComicDetails";
import PopularTitles from "../popular-titles/PopularTitles";
import Searchbar from "../searchbar/Searchbar";
import Sidebar from "../sidebar/Sidebar";
import LoginPopup from "../user/login/LoginPopup";
import UpdateUserPopup from "../user/user_component/UpdateUserPopup";
import User from "../user/user_component/User";

const Home = () => {
  const { setLoginPopup, loginPopup, handleLoginPopup } = useLoginPopup();
  const { popularComic } = useComicList();
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />

        <div className="grid grid-cols-1 w-full ml-[290px]">
          <PopularTitles data={popularComic} />
          <LastestUpdateMain />
          <Featured />
        </div>
        <Searchbar />
        <User handleLoginPopup={handleLoginPopup} />
        <LoginPopup
          loginPopup={loginPopup}
          handleLoginPopup={handleLoginPopup}
          setLoginPopup={setLoginPopup}
        />
      </div>
    </>
  );
};

export default Home;
