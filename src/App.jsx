import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import AllPosts from './Components/AllPosts';
import NavBar from './Components/NavBar';
import Authenticate from './Components/Login';

function App() {

  return (
    <>
    <div className="container">
      <NavBar />
    </div>
    <div className="mainbody">
      <Routes>
      <Route path="/" element={<Authenticate />} />
      <Route path="/AllPosts" element={<AllPosts />} />
      </Routes>
    </div>
    </>
  )
}

export default App
