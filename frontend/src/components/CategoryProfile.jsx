import { useParams } from "react-router-dom";

const CategoryProfile = () => {

    const category = useParams();
    console.log(category)
    return (
        <>
        <p>
            Category:
        </p>
        </>
    )
}
export default CategoryProfile;
