import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Frontpage from './components/Frontpage';
import Navbar from './components/Navbar';

import ListingsPage from './components/ListingsPage';
import ListingDetail from './components/ListingDetail';
import CreateListing from './components/CreateListing';

import CategoryPage from './components/CategoryPage';
import CategoryProfile from './components/CategoryProfile';

import Profile from './components/Profile';
import ProfileUpdater from './components/ProfileUpdater';

import AuthProvider from './services/authContext';
import Login from './components/Login';
import Signup from './components/Signup';

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
                        <Route path="/update-profile" element={<ProfileUpdater />} />

                        {/* Categories */}
                        <Route path="/categories" element={<CategoryPage/>}/>
                        <Route path="/categories/:category" element={<CategoryProfile />} />
                        
                    </Routes>
                </div>
            </div>
        </Router>
        </AuthProvider>
    );
}

export default App;
