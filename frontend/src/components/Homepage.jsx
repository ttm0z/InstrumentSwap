import React from "react";
import "./Homepage.css"
import ImageUpload from './ImageUpload'
import ImageFetcher from './ImageFetcher';
const Homepage = () => {
    const listStyle = {
        display:'flex',
        flex_direction:'row'
    }
    
    return (
        <div>
            
            <h1>InstrumentSwap Prototype</h1>
            <ImageUpload />
            <img src={`http://localhost:8000/api/instrument_swap_media/images/stratocaster_test_image.jpg/`} />
        </div>
        
    );
};

export default Homepage;