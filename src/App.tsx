import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import LastestComicsAll from "./components/lastest-updates/AllComicUpdate/LastestComicsAll";
import LoginForm from "./components/user/login/LoginForm";
import RegisterForm from "./components/user/register/RegisterForm";
import PopularDetailMain from "./components/popular-titles/PopularDetailMain";
import AdvancedSearchManager from "./components/titles/advanced_search/AdvancedSearchManager";
import MyProfileManager from "./components/user/profile/MyProfileManager";
import LibraryManager from "./components/follows/library/LibraryManager";
import SearchUserManager from "./components/user/user_component/SearchUserManager";
import UserManagerComponent from "./components/user/user_component/UserManagerComponent";
import { ContextProvider } from "./context/StateContext";

function App() {
  return (
    <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" index element={<Home />} />
          <Route path="/titles/latest" element={<LastestComicsAll />} />
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/title/*" element={<PopularDetailMain />} />
          <Route path="/titles/follows" element={<LibraryManager />} />
          <Route path="/titles" element={<AdvancedSearchManager />} />
          <Route path="/user/me" element={<MyProfileManager />} />
          <Route path="/users" element={<SearchUserManager />} />
          <Route
            path="/admin/user-manager"
            element={<UserManagerComponent />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
