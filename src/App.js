// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LoginPage';
import Home from './Home';
import CropLibrary from './CropLibrary';
import CropDetails from './CropDetail'; // Ensure this path is correct
import Feedback from './FeedbackPage';
import Community from './CommunityPage';


function App() {
  return (
    <Router> {/* Ensure Router is at the top level */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/crop-library" element={<CropLibrary />} />
        <Route path="/crop-library/:cropId" element={<CropDetails />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/community" element={<Community />} />
        
      </Routes>
    </Router>
  );
}

export default App;
