import React, { useState } from 'react';
import '../styles/Dropdown.css'; 

const Dropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
                {title}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                <a href={item.link}>{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
