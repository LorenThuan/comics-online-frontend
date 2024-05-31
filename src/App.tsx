import Featured from "./components/featured/Featured";
import useLoginPopup from "./components/hooks/LoginPopup";
import LastestUpdateMain from "./components/lastest-updates/LastestUpdateMain";
import PopularTitles from "./components/popular-titles/PopularTitles";
import Searchbar from "./components/searchbar/Searchbar";
import Sidebar from "./components/sidebar/Sidebar";
import Popup from "./components/user/Popup";
import User from "./components/user/User";

function App() {
  const {loginPopup, handleLoginPopup, setLoginPopup} = useLoginPopup();

  return (
    <>

    <div className="flex flex-row">
      <Sidebar />
      
      <div className="flex flex-col w-full ml-[300px]">
      <PopularTitles/>
      <LastestUpdateMain/>
      <Featured/>
      </div>
      <Searchbar />
      <User handleLoginPopup={handleLoginPopup}/>
      <Popup loginPopup={loginPopup} handleLoginPopup={handleLoginPopup} setLoginPopup={setLoginPopup}/>
    </div>
    </>
  );
}

export default App;
