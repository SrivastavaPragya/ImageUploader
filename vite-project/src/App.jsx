import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import '../src/App.css'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import ImageUpload from "./components/ImageUpload";
import GetImages from "./components/GetImages";



const App = () => {
  return (
    <div>
      <Router>
      <Header/>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/GetImages" element={<GetImages />} />
        
        </Routes>
      </Router>
    </div>
  );
};

export default App;




