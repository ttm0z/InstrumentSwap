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
import ProfileUpdater from './components/ProfileUpdater';

import './App.css'; // Import the CSS file
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    return (
      <AuthProvider>
        <Router>
            <Navbar />
            <div className="app-container">
                <div className="content">
                    <Routes>
                        
                        {/* Frontpage, dashboard */}
                        <Route path="/" element={<Homepage />} />
                        <Route path="/frontpage_prototype" element={<Frontpage />} />

                        {/* Auth */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        
                        {/* Listing */}
                        <Route path="/listings" element={<ListingsPage />} />
                        <Route path="/listing/:listingid" element = {<Listing />} />
                        <Route path="/create-listing" element={<CreateListing />} />

                        {/* Profile */}
                        <Route path="/profile/:username" element={<Profile/>}/>
                        <Route path="/update-profile" element={<ProfileUpdater />} />

                        {/* Categories */}
                        <Route path="/categories" element={<CategoryPage/>}/>
                        <Route path="/categories/:category" element={<CateoryProfile />} />
                        
                    </Routes>
                </div>
            </div>
        </Router>
        </AuthProvider>
    );
}

export default App;
