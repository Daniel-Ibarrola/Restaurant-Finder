import React from 'react';
import Jumbotron from '../components/Jumbotron';
import RestaurantList from '../components/RestaurantList';

function Home() {
    return (
        <div>
            <Jumbotron />
            <RestaurantList/>
        </div>
    )
}

export default Home
