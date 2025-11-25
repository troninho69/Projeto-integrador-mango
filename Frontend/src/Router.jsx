import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

import Main from "./pages/Main/Index.jsx";
import Library from "./pages/Library/Index.jsx";
import Profile from "./pages/Profile/Index.jsx";
import Msg from "./pages/Msg/Index.jsx";
import Login from "./pages/Login/Index.jsx";
import Register from "./pages/Register/Index.jsx";
import ArtistDashboard from "./pages/ArtistDashboard/ArtistDashboard.jsx";

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
      <Route path="/Dashboard" element={<ArtistDashboard isLoggedIn={isLoggedIn}/>}/>
    </Routes>
  );
}
