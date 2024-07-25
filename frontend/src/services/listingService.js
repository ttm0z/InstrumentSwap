import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:8000'
});

export const fetchAllListings = () => {
    return api.get('/api/listings/getAll/');
};

export const fetchListingsByCategory = (category) => {
    return api.get(`/api/listings/getByCategory:${category}/`);
}