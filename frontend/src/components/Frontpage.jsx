import React from "react";
import CategoryList from "./CategoryList";
import './Frontpage.css'
import ItemList from "./ItemList";

const Frontpage = () => {
    return (
        <div className="container">
            
            <div>
                <h2>Featured Items</h2>
                <ItemList/>
            </div>
            <div>
                <h2>Browse By Category</h2>
                <CategoryList />
            </div>
            <div>
                <h2>Recently Viewed</h2>
            </div>
        </div>
    );
};

export default Frontpage;