const express = require("express");
const ArticleModel = require("./schema.js");
const mongoose = require("mongoose");

const articlesRouter = express.Router();

// GET /articles => returns the list of articles
articlesRouter.get("/", async (req, res, next) => {
  try {
    const articles = await ArticleModel.find().populate("authors");
    res.send(articles);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// GET /articles/:id => returns a single article
articlesRouter.get("/:id", async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    res.send(article);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /articles => create a new article
articlesRouter.post("/", async (req, res, next) => {
  try {
    const newArticle = new ArticleModel(req.body); //creating instance (piemērs) from the req body
    await newArticle.save();
    res.status(201).send("Article has been added.");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// PUT /articles/:id => edit the article with the given id
articlesRouter.put("/:id", async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.send("Changes has been added.");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE /articles/:id => delete the article with the given id
articlesRouter.delete("/:id", async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);
    if (article) {
      res.send("Article has been deleted!");
    } else {
      const error = new Error(
        `Article with this id: ${req.params.id} has not been found.`
      );
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//     GET /articles/:id/reviews => returns all the reviews for the specified article
articlesRouter.get("/:id/reviews", async (req, res, next) => {
  try {
    const { reviews } = await ArticleModel.findById(req.params.id);
    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//     GET /articles/:id/reviews/:reviewId => returns a single review for the specified article
articlesRouter.get("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const { reviews } = await ArticleModel.findOne(
      {
        _id: mongoose.Types.ObjectId(req.params.id), //using mangoose to find object by id (converting string into object)
      },
      {
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      }
    );
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//     POST /articles/:id => adds a new review for the specified article
articlesRouter.post("/:id/reviews", async (req, res, next) => {
  try {
    const review = req.body;
    const newReview = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      { $push: { reviews: review } },
      { runValidators: true, new: true }
    );
    res.status(201).send({ newReview });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//     PUT /articles/:id/reviews/:reviewId => edit the review belonging to the specified article
articlesRouter.put("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    // find article wthic has id as :id and hass and review which has id as reviewId
    const article = await ArticleModel.findOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      }
    );
    // but I need index in the array for that review

    const reviewIndex = article.reviews.findIndex(
      // since  I know reviews has id and their data type is ObjectId but I have review id to compare as  string
      // since I cant compare different data types I convert ObjectId to string
      (review) => review._id.toString() === req.params.reviewId
    );

    // find the review in array with the index
    const reviewInArray = article.reviews[reviewIndex];

    // copy everything from found review  and overwrite my changes

    const updatedReview = { ...reviewInArray._doc, ...req.body };

    // replace the specified review with updated review

    article.reviews[reviewIndex] = updatedReview;

    // update article with updated review

    await article.update({ reviews: article.reviews });

    res.send(article);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//     DELETE /articles/:id/reviews/:reviewId => delete the review belonging to the specified article
articlesRouter.delete("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const deleteReview = await ArticleModel.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: { _id: mongoose.Types.ObjectId(req.params.reviewId) } },
    });
    res.status(204).send(deleteReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = articlesRouter;
