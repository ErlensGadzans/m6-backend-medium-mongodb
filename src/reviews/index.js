const express = require("express");

const reviewsRouter = express.Router();

//     GET /articles/:id/reviews => returns all the reviews for the specified article
//     GET /articles/:id/reviews/:reviewId => returns a single review for the specified article
//     POST /articles/:id => adds a new review for the specified article
//     PUT /articles/:id/reviews/:reviewId => edit the review belonging to the specified article
//     DELETE /articles/:id/reviews/:reviewId => delete the review belonging to the specified article

module.exports = reviewsRouter;
