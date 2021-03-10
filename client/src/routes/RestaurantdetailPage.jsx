import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantContext';


function RestaurantdetailPage() {
    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await RestaurantFinder.get(`/${id}`);
                console.log(response)
                setSelectedRestaurant(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    // console.log(selectedRestaurant)

    return (
        <div>{selectedRestaurant.restaurant && (
            <>
                <h1 className='text-center'>{selectedRestaurant.restaurant.name}</h1>
                <div className="text-center">
                    <StarRating rating={selectedRestaurant.restaurant.average_rating} />
                    <span className="text-warning">
                        {
                            selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})`
                            : "(0)"
                        }
                        
                    </span>
                </div>
                <div className="mt-3">
                    <Reviews reviews={selectedRestaurant.reviews}/>
                </div>
            </>
            )
            }
            <AddReview />
        </div>
    )
}

export default RestaurantdetailPage
