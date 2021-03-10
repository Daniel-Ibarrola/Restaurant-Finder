require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "client/build")))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query(`
        SELECT
            *
        FROM
            restaurants
        LEFT JOIN
            (
                SELECT
                    restaurant_id,
                    COUNT(*),
                    TRUNC(AVG(rating), 1) as average_rating
                FROM
                    reviews
                GROUP BY 
                    restaurant_id
            ) reviews 
        ON 
            restaurants.id = reviews.restaurant_id;`);


        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            }
        });
    } catch(err) {
        console.log(err)
    }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
//    console.log(req.params.id);

    try {
        const restaurant =  await db.query(`
        SELECT
            *
        FROM
            restaurants
        LEFT JOIN
            (
                SELECT
                    restaurant_id,
                    COUNT(*),
                    TRUNC(AVG(rating), 1) as average_rating
                FROM
                    reviews
                GROUP BY 
                    restaurant_id
            ) reviews 
        ON 
            restaurants.id = reviews.restaurant_id
        WHERE
            id = $1;`, [req.params.id]);

        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id=$1", [req.params.id]);
        // console.log(reviews.rows)

        res.status(200).json({
        status: "success",
        data: {
            restaurant: restaurant.rows[0],
            reviews: reviews.rows
        }
        });
    } catch (err) {
        console.log(err)
    }
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    // console.log(req.body);

    try{
        const result = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", 
            [req.body.name, req.body.location, req.body.price_range]);
        // console.log(result)    
        res.status(201).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        });
    } catch (err) {
        console.log(err)
    }

});


// Update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    
    try {
        const result = await db.query(
            "UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 RETURNING *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        )
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        });
    } catch (err) {
        console.log(err)
    }

    
});

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const result = await db.query(
            "DELETE FROM restaurants WHERE id=$1",
            [req.params.id]
        )
        res.status(204).json({
            status: "success"
        });
    } catch (err) {
        console.log(err);
    }

   
})

// Create Review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {

    try{
        const newReview = await db.query(
            "INSERT INTO reviews(restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *" ,
            [req.params.id, req.body.name, req.body.review, req.body.rating]);

        res.status(201).json({
            status: "success",
            data: {
                restaurant: newReview.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }

})

// Redirect all paths that are not defined
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname), "client/build/index.html")
  })

const port  = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up an listening on port: ${port}`);
});