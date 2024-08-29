import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dropdown.css'; 

const Dropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(true);
    console.log(items)
    

    return (
        <div className="dropdown">
            <button className="dropdown-button">
                {title}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link to={`/categories/${item.link}`}><p>{item.category}</p></Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
