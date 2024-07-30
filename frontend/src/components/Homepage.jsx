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
            <div className="api-test">
                <button>Get User</button>
                <button>Get Users</button>
                
                <button>Get Listing</button>
                <button>Get Listings</button>
                <button>Get Cat. Listings</button>
                
                <button>Get All Users</button>
                <button>Get All Users</button>
                <div className="api-test-textbox">

                </div>

            </div>
            <h1>InstrumentSwap Prototype</h1>
            <ImageUpload />
            <img src={`http://localhost:8000/api/instrument_swap_media/images/stratocaster_test_image.jpg/`} />
        </div>
        
    );
};

export default Homepage;