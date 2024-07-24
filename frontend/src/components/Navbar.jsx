import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
//import {AuthContext} from '../services/authContext'
const NavBar = () => {
    
  //  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
    
    return (
        <nav className="navbar">
            <div className='top_bar'>
            <ul>
                <li><h1>I S</h1></li>
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
    
                    <Link to="/logintest">Login</Link>
                    
                    
                </li>
            </ul>
            </div>

            <ul className='bottom_bar'>
                
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                
                <li>
                    <Link to="/frontpage_prototype">Frontpage</Link>        
                </li>
                
                <li>
                    <Link to="/listings">Listings</Link>        
                </li>
                
                <li>
                    <Link to="/logintest">Login</Link>        
                </li>
            </ul>

        </nav>
    );
};

export default NavBar;