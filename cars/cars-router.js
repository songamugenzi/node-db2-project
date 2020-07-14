const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Failed to retrieve cars", error: error.message });
    });
});

router.post("/", (req, res) => {
  const newCarData = req.body;

  db("cars")
    .insert(newCarData)
    .then((ids) => {
      db("cars")
        .where({ carID: ids[0] })
        .then((newCarEntry) => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch((error) => {
      console.log("POST error", error);
      res.status(500).json({ message: "Unable to store new car data" });
    });
});

module.exports = router;
