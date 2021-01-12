const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");

const articlesRouter = require("./articles");

const server = express();

const port = process.env.PORT || 3077;

server.use(express.json());

server.use("/articles", articlesRouter);

server.get("/", (req, res, next) => {
  res.send("This server is running");
});

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("This server is running on port", port);
    })
  )
  .catch((error) => console.log(error));
