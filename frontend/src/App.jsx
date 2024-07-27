// src/App.js

import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import PostForm from './components/PostForm';


function App() {
 

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postForm" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
