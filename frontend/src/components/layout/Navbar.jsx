import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Dropdown from './Dropdown';
import {AuthContext} from '../services/authContext'
import SearchBar from './SearchBar';
import categories from '../../categories'
import { AccountCircleOutlined, ShoppingCartOutlined, SearchOutlined, AppsOutlined, LogoutOutlined, SignLanguage, LoginOutlined } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';

const NavBar = () => {
    
    const{ isAuthenticated, setIsAuthenticated, logout, username} = useContext(AuthContext);
    
    
    const instruments = categories.slice(0, 9)
    const gear = categories.slice(9, 14)
    const merch = categories.slice(14, 17)


    return (
        <nav className="navbar">
            <div className='top_bar'>
            <ul>
                <li>
                    <Link to="/frontpage">
                        <h1 className='logo'>InstrumentSwap</h1>
                    </Link>    
                </li>
                <SearchBar />
                <li>
                    
                    <Link to={`/cart/${username}`}>
                        <div>
                        <ShoppingCartOutlined />
                        Cart
                        </div>
                    </Link>    
                    
                    
                    
                </li>

                <li>
                    
                    <Link to="/listings">
                        <div>
                        <AppsOutlined />
                        Listings
                        </div>
                    </Link>        
                    
                    
                    
                    
                </li>
                
                <li>
                {isAuthenticated ? (
        
                
                    <Link to={`/profile/${username}`}>
                        <div>
                        <AccountCircleOutlined />
                        {username}
                        </div>
                            
                    </Link>
        
                    
                    ) : (    
                            <Link to="/login">
                                <div>
                                <LoginOutlined/>
                                Log In
                                </div>
                            </Link>
                        
                        
                    )}
                </li>
                
                <li>
                {isAuthenticated ? (
                    <div>
                        <LogoutOutlined/>
                        <button onClick={logout}>Log Out</button>
                    </div>
                    
                ) : (
                    <Link to="/signup">
                        <div>
                        <AccountCircleOutlined />
                        Sign Up
                        </div>
                        </Link>
                    
                        
                    )}
                </li>
            
            </ul>
            </div>

            <ul className='bottom_bar'>
                <li>
                    <Dropdown title="Instruments" items={instruments} />
                </li>
                <li>
                    <Dropdown title="Equipment" items={gear} />
                </li>
                <li>
                    <Dropdown title="Merch" items={merch} />
                </li>
            </ul>

        </nav>
    );
};

export default NavBar;