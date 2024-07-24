import React from "react";
import CategoryList from "./CategoryList";
import './Frontpage.css'

const Frontpage = () => {
    return (
        <div className="container">
            
            <div>
                <h3>Featured Items</h3>
            </div>
            <div>
                <h3>Browse By Category</h3>
                <CategoryList />
            </div>
            <div>
                <h3>Recently Viewed</h3>
            </div>
        </div>
    );
};

export default Frontpage;