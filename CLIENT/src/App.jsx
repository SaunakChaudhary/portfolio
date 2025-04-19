import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import Achievements from './Pages/Achievments';
import Resume from './Pages/Resume';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  )
}

export default App
