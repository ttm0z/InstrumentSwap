import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Frontpage from './components/Frontpage';
import Navbar from './components/Navbar';



function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/frontpage_prototype" element={<Frontpage />}/>
        </Routes>
      </Router>
    
    </>
  );
};

export default App;
