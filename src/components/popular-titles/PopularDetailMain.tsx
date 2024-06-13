import useLoginPopup from "../hooks/LoginPopup";
import Searchbar from "../searchbar/Searchbar";
import Sidebar from "../sidebar/Sidebar";
import LoginPopup from "../user/LoginPopup";
import User from "../user/User";
import PopularComicDetails from "./PopularComicDetails";

const PopularDetailMain = () => {
  const { setLoginPopup, loginPopup, handleLoginPopup } = useLoginPopup();

  return (
    <>
      <div className="flex flex-row">
        <Sidebar />

        <div className="grid grid-cols-1 w-full ml-[290px]">
            <PopularComicDetails/>
        </div>
        <Searchbar/>
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

export default PopularDetailMain;
