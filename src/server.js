const express = require("express");
const listEndpoints = require("express-list-endpoints");

const server = express();

const port = process.env.PORT || 3077;

server.use(express.json());

server.get("/", (req, res, next) => {
  res.send("This server is running");
});

server.listen(port, () => {
  console.log("This server is running on port", port);
});
