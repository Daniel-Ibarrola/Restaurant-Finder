import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';

function UpdateRestaurant(props) {
    const {id} = useParams();
    let history = useHistory();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                // console.log(response.data.data.restaurant)
                const restaurant = response.data.data.restaurant
            
                setName(restaurant.name);
                setLocation(restaurant.location);
                setPriceRange(restaurant.price_range);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        history.push("/")
    } 
    return (
        <div className='container'>
            <form action="" className="row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input 
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            id="name" 
                            className="form-control" 
                            type="text"/>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="location">Location</label>
                        <input
                            onChange={e => setLocation(e.target.value)} 
                            value={location} 
                            id="location" 
                            className="form-control" 
                            type="text"/>
                    </div>
                    <div className="form-group col-12">
                        <label htmlFor="price_range">Price Range</label>
                        <input
                            onChange={e => setPriceRange(e.target.value)} 
                            value={priceRange} 
                            id="price_range" 
                            className="form-control" 
                            type="number"/>
                    </div>
                    <button onClick={handleSubmit} type="submit" className='btn btn-primary col-2 mt-4'>Update</button>
            </form>
        </div>
    )
};

export default UpdateRestaurant;
