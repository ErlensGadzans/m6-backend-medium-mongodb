const express = require("express");
const ArticleModel = require("./schema.js");

const articlesRouter = express.Router();

// GET /articles => returns the list of articles
// GET /articles/:id => returns a single article
// POST /articles => create a new article
articlesRouter.post("/", async (req, res, next) => {
  try {
    const newArticle = new ArticleModel(req.body); //creating instance (piemērs) from the req body
    await newArticle.save();
    res.status(201).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// PUT /articles/:id => edit the article with the given id
// DELETE /articles/:id => delete the article with the given id

module.exports = articlesRouter;
