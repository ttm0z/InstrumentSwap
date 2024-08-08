import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Dropdown from './Dropdown';
import {AuthContext} from '../services/authContext'
import SearchBar from './SearchBar';

const NavBar = () => {
    
    const{ isAuthenticated, setIsAuthenticated, logout} = useContext(AuthContext);
    
    const username = localStorage.getItem('username')
  
      //replace with categories
      const dropdownItems = {
        instruments: [
            { name: 'Guitars', link: '/categories/guitar' },
            { name: 'Bass Guitars', link: '/categories/bass' },
            { name: 'Keyboards', link: '/categories/keys' },
            { name: 'Pianos', link: '/categories/piano' },
            { name: 'Percussion', link: '/categories/percussion' },
            { name: 'Woodwind', link: '/categories/woodwind' },
            { name: 'Brass', link: '/categories/brass' },
            { name: 'Orchestral', link: '/categories/orchestral' },
            { name: 'Other', link: '/categories/other' }
        ],
        gear: [
            { name: 'Recording Equipment', link: '/categories/recording' },
            { name: 'Amplifiers & PAs', link: '/categories/amps' },
            { name: 'Effects', link: '/categories/effects' },
            { name: 'Components', link: '/categories/components' },
            { name: 'Accessories', link: '/categories/accessories' }
        ],
        merch: [
            { name: 'Clothing', link: '/categories/clothing' },
            { name: 'Memorabilia', link: '/categories/memorabilia' },
            { name: 'Miscellaneous', link: '/categories/miscellaneous' }
        ]
    };
    /////////
    return (
        <nav className="navbar">
            <div className='top_bar'>
            <ul>
                <li>
                    <Link to="/">
                        <h1>IS</h1>
                    </Link>    
                </li>
                <SearchBar />
                <li>
                    <Link to="/frontpage_prototype">Frontpage</Link>        
                </li>
                
                <li>
                    <Link to="/listings">Listings</Link>        
                </li>
                
                <li>
                {isAuthenticated ? (
                        <Link to={`/profile/${username}`}>{username}</Link>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </li>
                
                <li>
                {isAuthenticated ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                        <Link to="/signup">SignUp</Link>
                    )}
                </li>
            
            </ul>
            </div>

            <ul className='bottom_bar'>
                <li>
                    <Dropdown title="Instruments" items={dropdownItems.instruments} />
                </li>
                <li>
                    <Dropdown title="Equipment" items={dropdownItems.gear} />
                </li>
                <li>
                    <Dropdown title="Merch" items={dropdownItems.merch} />
                </li>
            </ul>

        </nav>
    );
};

export default NavBar;