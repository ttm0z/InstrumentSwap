import React from "react";
import "./Homepage.css"
const Homepage = () => {
    const listStyle = {
        display:'flex',
        flex_direction:'row'
    }
    
    return (
        <div>
            
            <h1>InstrumentSwap Prototype</h1>
            <h3>To Do</h3>

            <div style={listStyle}>        
            <ul>
                <li>Search feature</li>
                <li>Listing preview card</li>
                <li>Provide service to fetch photos</li>
                <li>Properly align frontpage</li>
                <li>User Profile (Dynamic)</li>
                <li>Real time messaging feature</li>
            
            </ul>
            
            <ul>
                <li>Develop API Endpoints</li>
                <li>Update database schema design</li>
                <li>Provide dynamic appearance based on authentication status</li>
            
            </ul>
            </div>
        </div>
    );
};

export default Homepage;