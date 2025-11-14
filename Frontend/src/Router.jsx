import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

import Main from "./pages/Main/Index";
import Library from "./pages/Library/Index";
import Profile from "./pages/Profile/Index";
import Msg from "./pages/Msg/Index";
import Login from "./pages/Login/Index";
import Register from "./pages/Register/Index";

export default function AppRoutes() {
  const [ isLoggedIn ] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Main isLoggedIn={isLoggedIn}/>} />
      <Route path="/Library" element={<Library isLoggedIn={isLoggedIn}/>} />
      <Route path="/Profile" element={<Profile isLoggedIn={isLoggedIn}/>} />
      <Route path="/Msg" element={<Msg isLoggedIn={isLoggedIn}/>} />
      <Route path="/Login" element={<Login isLoggedIn={isLoggedIn}/>}/>
      <Route path="/Register" element={<Register isLoggedIn={isLoggedIn}/>}/>
    </Routes>
  );
}
