import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <h1>InstrumentSwap</h1>
            <ul>
                <li>
                    <Link to="/">Homepage</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/user">Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;