const express = require("express");
const helmet = require("helmet");

const carsRouter = require("../cars/cars-router.js");
const db = require("../data/dbConfig.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Car Dealership API up and running" });
});

module.exports = server;
