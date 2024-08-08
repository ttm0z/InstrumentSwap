import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:8000'
});

/** Fetch all listings
 * 
 * @returns json listings object
 */
export const fetchAllListings = (sortOption=null) => {
    console.log("Fetching all listings");
    console.log("SortOption:",sortOption)
    if (sortOption) return api.get(`/api/listings/getAll?sort=${sortOption}`)
    return api.get('/api/listings/getAll/');
};

/**Fetch listings by category
 * 
 * @param {*} category 
 * @returns 
 */
export const fetchListingsByCategory = (category, sortOption=null) => {
    console.log("Fetching listings of category", category);
    console.log("Service SortOption:",sortOption)
    if (sortOption) return api.get(`/api/listings/getByCategory/${category}?sort=${sortOption}`)
    return api.get(`/api/listings/getByCategory/${category}/`);
}

/**Fetch listings by user id
 * 
 * @param {*} category 
 * @returns 
 */
export const fetchListingsByUserId = (user_id, sortOption=null) => {
    console.log("Fetching listings of userid", user_id);
    if (sortOption) return api.get(`/api/listings/getByUserId//${user_id}?sort=${sortOption}`)
    return api.get(`/api/listings/getByUserId/${user_id}/`);
}

/**Fetch listings by user id
 * 
 * @param {*} category 
 * @returns 
 */
export const fetchListingsByListingId = (listing_id) => {
    console.log("Fetching listings of id", listing_id);
    return api.get(`/api/listings/${listing_id}/`);
}

/** Create a new listing
 * 
 * @param {FormData} formData - The form data to be sent in the request
 * @returns {Promise} - The promise representing the API call
 */
export const createListing = (formData) => {
    console.log('Creating a new listing');
    return api.post('/api/listings/create_listing/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

/**delete listing
 * 
 * @param {*} category 
 * @returns 
 */
export const deleteListing = (listing_id) => {
    console.log("deleting listing", listing_id);
    return api.delete(`/api/listings/${listing_id}/`);
}
