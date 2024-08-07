import { useParams } from "react-router-dom";
import ItemGrid from "../features/ItemGrid";

const CategoryProfile = () => {

    const category = useParams().category;
        
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    const categoryString = capitalizeFirstLetter(category);
    
    return (
        <>
        <div className="category-header">
            <h3>{categoryString} Listings</h3>
            <p>Here you will find all of our {category} listings. Click on a listing for more information</p>
            <p>//Add a filter/sortby feature</p>
        </div>
        

        <div className="item-list">
            <ItemGrid category={category} />
        </div>
        </>
    )
}
export default CategoryProfile;
