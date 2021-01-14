const express = require("express");
const AuthorSchema = require("./schema");

const authorsRouter = express.Router();

authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorSchema(req.body);
    const { _id } = await newAuthor.save();

    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = authorsRouter;
