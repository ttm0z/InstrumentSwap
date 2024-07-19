import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/listings/')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    if(!data) return <p>Loading...</p>

    return(
        <div>
            <h1>Dashboard</h1>
            <h2>Listings</h2>
            <ul>
                {data.map(listing => (
                    <li key={listing.id}>
                        <h3>{listing.title}</h3>
                        <p>{listing.description}</p>
                        <p>Price: {listing.price}</p>
                        <p>Location: {listing.loaction}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;