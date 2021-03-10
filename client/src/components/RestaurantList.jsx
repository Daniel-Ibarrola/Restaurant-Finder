import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';
import StarRating from './StarRating';
import './styles/RestaurantList.css'

function RestaurantList() {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let history = useHistory();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await RestaurantFinder.get("/");
                console.log(response.data.data);
                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try{
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter((restaurant) => {
                return restaurant.id !== id  
            }));
        } catch (err) {
            console.log(err);
        }
      
    };

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`);
    };

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`);
    };

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return (
                <p className="text-warning">No reviews</p>
            )
        }
        else {
            return(
                <>
                    <StarRating rating={restaurant.average_rating}/>
                    <span className="text-warning ml-1">({restaurant.count})</span>
                </>
            )
        }
        
    }

    return (
        <div className='container mt-2'>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className='bg-primary'>
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map && restaurants.map(restaurant => {
                        return(
                            <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button className="btn btn-warning" onClick={(e) => handleUpdate(e, restaurant.id)}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={(e) => handleDelete(e, restaurant.id)}>Delete</button></td>
                            </tr>
                        )   
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;
