import { useParams } from "react-router-dom";
import ItemGrid from "../features/ItemGrid";

const CategoryDetail = () => {

    const category = useParams().category;
        
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    const categoryString = capitalizeFirstLetter(category);
    
    return (
        <>
        <div className="category-header">
            <h2>{categoryString}</h2>
        </div>
        

        <div className="item-list">
            <ItemGrid category={category} />
        </div>
        </>
    )
}
export default CategoryDetail;
