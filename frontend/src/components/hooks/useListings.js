import {useState, useEffect} from 'react';
import { fetchAllListings, fetchListingsByCategory, fetchListingsByUserId } from '../services/listingService';

const useListings = (category=null, user_id=null) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async() => {
            try{
                let response;
                if (category) {
                    response = await fetchListingsByCategory(category);
                }
                else if (user_id){
                    response = await fetchListingsByUserId(user_id)
                }
                else{
                    response = await fetchAllListings()
                }
                setListings(response.data);
            }
            catch(error){
                setError(error);
            } 
            finally{
                setLoading(false);
            }
        };
        fetchListings();
    }, [category, user_id]);
    return {listings, loading, error};
};
export default useListings;