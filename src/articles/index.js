const express = require("express");
const ArticleModel = require("./schema.js");

const articlesRouter = express.Router();

// GET /articles => returns the list of articles
articlesRouter.get("/", async (req, res, next) => {
  try {
    const articles = await ArticleModel.find();
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
    res.status(201).send();
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

module.exports = articlesRouter;
