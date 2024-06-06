const express = require("express");
const Tracking = require("../models/trackingModel");
const router = express.Router();

//post a food for tracking

router.post("/track", async (req, res) => {
  try {
    const data = req.body;
    const response = await Tracking.create(data);
    //or
    // const trackedFood = new Tracking(data);
    // const response = await trackedFood.save();
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all tracked food by user
router.get("/track/:id/:date", async (req, res) => {
  const userId = req.params.id;
  const date = new Date(req.params.date);
  const formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  try {
    const response = await Tracking.find({
      user: userId,
      eatenDate: formattedDate,
    })
      .populate("user")
      .populate("food");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
