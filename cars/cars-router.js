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

router.put("/:carID", (req, res) => {
  const { carID } = req.params;
  const changes = req.body;

  db("cars")
    .where({ carID })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ updated: count });
      } else {
        res.status(404).json({ message: "Car ID not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error updating car", error });
    });
});

router.delete("/:carID", async (req, res) => {
  const { carID } = req.params;

  try {
    const count = await db("cars").where({ carID }).del();
    count
      ? res.status(200).json({ deleted: count })
      : res.status(404).json({ message: "Car ID not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car", error });
  }
});

module.exports = router;
