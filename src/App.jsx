import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.js';
import Home from "./user/Pages/Home";
import EditProfile from "./user/Pages/EditProfile";
import Login from "./user/Pages/Login";
import Profile from "./user/Pages/Profile";
import Pesanan from "./user/Pages/Pesanan";
import Review from "./user/Pages/Review";
import Search from "./user/Pages/Search";
import Register from "./user/Pages/Register";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/editProf" element={<EditProfile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/pesanan" element={<Pesanan/>} />
        <Route path="/review" element={<Review/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App;