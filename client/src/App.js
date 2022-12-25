import { Route, Routes } from "react-router-dom";
import HomeProtect from "./Auth/HomeProtect";
import LoginProtect from "./Auth/LoginProtect";
import LandingPage from "./Components/UserComponents/LandingPage/LandingPage";
import Navbar from "./Components/UserComponents/Navbar/Navbar";
import AdminDashboardPage from "./Pages/AdminPages/AdminDashboardPage";
import AdminLogin from "./Pages/AdminPages/AdminLogin";
import Home from "./Pages/UserPages/Home";
import Signin from "./Pages/UserPages/Signin";
import Signup from "./Pages/UserPages/Signup";

const App = () => {
  return (
    <>
      <Routes>
        
        <Route element={<LoginProtect />}>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
        </Route>


        <Route element={<HomeProtect />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/navbar" element={<Navbar />}></Route>
        </Route>

        <Route path="/" element={<LandingPage />}></Route>

        <Route path="/adminlogin" element={<AdminLogin />}></Route>
        <Route path="/admindashboard" element={<AdminDashboardPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
