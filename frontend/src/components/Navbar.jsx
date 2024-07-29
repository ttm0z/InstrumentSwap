import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import {AuthContext} from '../services/authContext'
const NavBar = () => {
    const authToken = localStorage.getItem('authToken');
    const{ isAuthenticated, setIsAuthenticated, logout} = useContext(AuthContext);
    const username = localStorage.getItem('username')
    const handleAuthStatus = () => {
        const authToken = localStorage.getItem('authToken');
        console.log(authToken ? `Authenticated: ${authToken}` : 'Not authenticated');
      };
  
      const dropdownItems = {
        instruments: [
            { name: 'Guitars', link: '/guitars' },
            { name: 'Keyboards', link: '/keyboards' },
            { name: 'Drums', link: '/drums' }
        ],
        equipment: [
            { name: 'Microphones', link: '/microphones' },
            { name: 'Amps', link: '/amps' },
            { name: 'Speakers', link: '/speakers' }
        ],
        merch: [
            { name: 'T-Shirts', link: '/tshirts' },
            { name: 'Hats', link: '/hats' },
            { name: 'Posters', link: '/posters' }
        ],
        hotDeals: [
            { name: 'Discounted Instruments', link: '/discounted-instruments' },
            { name: 'Clearance Equipment', link: '/clearance-equipment' },
            { name: 'Special Offers', link: '/special-offers' }
        ]
    };
    
    return (
        <nav className="navbar">
            <div className='top_bar'>
            <ul>
                <li>
                    <Link to="/">
                        <h1>I S</h1>
                    </Link>    
                </li>
                <div className='search'>
                    <input
                        type="search"
                        name="form1"
                        className="search_input"
                        placeholder='Search'
                        onChange={(e) => {
                            //search;
                            ;
                        }}
                        ></input>
                </div>
      
                <li>
                    <Link to="/frontpage_prototype">Frontpage</Link>        
                </li>
                
                <li>
                    <Link to="/listings">Listings</Link>        
                </li>
                
                <li>
                {isAuthenticated ? (
                        <Link to={`/profile/${username}`}>Profile</Link>
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
                
                <li>
                    <button onClick={handleAuthStatus}>Auth</button>
                </li>
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
                
                
            
            
            </ul>
            </div>

            <ul className='bottom_bar'>
                <li>
                    <Dropdown title="Instruments" items={dropdownItems.instruments} />
                </li>
                <li>
                    <Dropdown title="Equipment" items={dropdownItems.equipment} />
                </li>
                <li>
                    <Dropdown title="Merch" items={dropdownItems.merch} />
                </li>
                <li>
                    <Dropdown title="Hot Deals" items={dropdownItems.hotDeals} />
                </li>
            </ul>

        </nav>
    );
};

export default NavBar;