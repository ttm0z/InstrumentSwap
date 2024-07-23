import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Frontpage from './components/Frontpage';
import Navbar from './components/Navbar';
import ListingsPage from './components/ListingsPage';
import AuthTest from './components/AuthTest';
import './App.css'; // Import the CSS file

function App() {
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/frontpage_prototype" element={<Frontpage />} />
                        <Route path="/listings" element={<ListingsPage />} />
                        <Route path="/logintest" element={<AuthTest />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
