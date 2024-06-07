import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import LastestComicsAll from "./components/lastest-updates/LastestComicsAll";
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="/" index element={<Home/>}/>
        <Route path="titles/latest" element={<LastestComicsAll/>}/>
        <Route path="/auth/login" element={<LoginForm/>}/>
        <Route path="/auth/register" element={<RegisterForm/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
