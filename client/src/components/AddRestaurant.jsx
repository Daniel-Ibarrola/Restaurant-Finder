import React, {useState, useContext} from 'react';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';

function AddRestaurant() {
    const {addRestaurant} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post("/", {
                name: name,
                location: location,
                price_range: price
            });
            addRestaurant(response.data.data.restaurant)
            console.log(response);
        } catch(err) {
            console.log(err)
        }

    }

    return (
        <div className="mb-4 mt-4 container">
            <form action="">
                <div className="form-row row">
                    <div className="col-3">
                        <input 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            placeholder="name"/>
                    </div>
                    <div className="col-3">
                        <input
                            value={location} 
                            onChange={e => setLocation(e.target.value)}  
                            type="text" 
                            className="form-control" 
                            placeholder="location"/>
                    </div>
                    <div className="col-3">
                        <select
                            value={price} 
                            onChange={e => setPrice(e.target.value)}  
                            className="form-select mr-sm-2"
                        >
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className='btn btn-primary col-3'>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
