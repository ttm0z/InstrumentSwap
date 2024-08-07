import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './components/pages/Homepage';
import Frontpage from './components/pages/Frontpage';
import ListingsPage from './components/pages/ListingsPage';
import ListingDetail from './components/pages/ListingDetail';
import CreateListing from './components/pages/CreateListing';
import DirectMessageComponent from './components/pages/DirectMessageComponent';
import CategoryProfile from './components/pages/CategoryProfile';
import Profile from './components/pages/Profile';

import Navbar from './components/layout/Navbar';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AuthProvider from './components/services/authContext';
import './App.css';

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
                        <Route path="/listings/:listingid" element = {<ListingDetail />} />
                        <Route path="/create-listing/:username" element={<CreateListing />} />

                        {/* Profile */}
                        <Route path="/profile/:username" element={<Profile/>}/>
                    
                        {/* Categories */}
                        <Route path="/categories/:category" element={<CategoryProfile />} />
                        
                        {/* DM --- FIX BEFORE UNCOMMENTING !!!!!! */}
                        <Route path="/direct-message/:userid" element={<DirectMessageComponent />} />
                    </Routes>
                </div>
            </div>
        </Router>
        </AuthProvider>
    );
}
export default App;
