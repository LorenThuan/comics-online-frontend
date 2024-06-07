import Featured from "../featured/Featured";
import useLoginPopup from "../hooks/LoginPopup";
import LastestUpdateMain from "../lastest-updates/LastestUpdateMain";
import PopularTitles from "../popular-titles/PopularTitles";
import Searchbar from "../searchbar/Searchbar";
import Sidebar from "../sidebar/Sidebar";
import Popup from "../user/Popup";
import User from "../user/User";


const Home = () => {
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
      <Searchbar/>
      <User handleLoginPopup={handleLoginPopup}/>
      <Popup loginPopup={loginPopup} handleLoginPopup={handleLoginPopup} setLoginPopup={setLoginPopup}/>
    </div>
    </>
  )
}

export default Home