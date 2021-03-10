import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import RestaurantFinder from '../api/RestaurantFinder';

function AddReview() {

    const { id } = useParams();
    const location  = useLocation();
    const history = useHistory();
    const [name, setName] = useState("");
    const [rating, setRating] = useState("Rating");
    const [reviewText, setReviewText] = useState("");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating, 
            });
            history.push("/");
            history.push(location.pathname)
        } catch (err) {
            console.log(err);
        }
       
    }

    return (
        <div className="container">
            <form action="" className="row">
                <div className="mb-3 col-8">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Name"
                    />
                </div>
                <div className="mb-3 col-4">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <select
                        value={rating}
                        onChange={e => setRating(e.target.value)} 
                        id="rating" 
                        className="form-select">
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}  
                        className="form-control" 
                        id="review" 
                        rows="3">
                    </textarea>
                </div>
                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary col-4 offset-4">Submit</button>
            </form>  
        </div>
    )
}

export default AddReview;
