const express = require("express");
const Food = require("../models/foodModel");
const router = express.Router();
const { generateToken, jwtAuthMiddleware } = require("./../jwt");

//add food
router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newFood = new Food(data);
    const response = await newFood.save();
    // console.log("Food added to the db");
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

//get all foods
router.get("/all", async (req, res) => {
  try {
    const response = await Food.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});
//search food by name
router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const response = await Food.find({ name: { $regex: name, $options: "i" } });
    if (response.length != 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Food item not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
