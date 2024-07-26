import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Frontpage from './components/Frontpage';
import Navbar from './components/Navbar';
import ListingsPage from './components/ListingsPage';
import AuthTest from './components/AuthTest';
import Profile from './components/Profile';
import CreateListing from './components/CreateListing';
import AuthProvider from './services/authContext';
import './App.css'; // Import the CSS file

function App() {
    return (
      <AuthProvider>
        <Router>
            <Navbar />
            <div className="app-container">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/frontpage_prototype" element={<Frontpage />} />
                        <Route path="/listings" element={<ListingsPage />} />
                        <Route path="/login" element={<AuthTest />} />
                        <Route path="/create-listing" element={<CreateListing />} />
                        <Route path="/profile/:username" element={<Profile/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
        </AuthProvider>
    );
}

export default App;
