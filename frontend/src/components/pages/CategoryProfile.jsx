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
            <h3>{categoryString}</h3>
        </div>
        

        <div className="item-list">
            <ItemGrid category={category} />
        </div>
        </>
    )
}
export default CategoryProfile;
