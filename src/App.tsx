import Featured from "./components/featured/Featured";
import LastestUpdateMain from "./components/lastest-updates/LastestUpdateMain";
import PopularTitles from "./components/popular-titles/PopularTitles";
import Searchbar from "./components/searchbar/Searchbar";
import Sidebar from "./components/sidebar/Sidebar";
import User from "./components/user/User";

function App() {
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
      <User/>
     


    </div>
    </>
  );
}

export default App;
