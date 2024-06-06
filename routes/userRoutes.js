const express = require("express");
const router = express.Router();
const User = require("./../models/userModel");
const { generateToken } = require("../jwt");

//register a new user
router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    const payload = {
      email: response.email,
      id: response.id,
    };
    const token = await generateToken(payload);
    console.log("Token is:", token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//login a existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: "Invalid email or password" });
    }
    const payload = {
      email: user.email,
      id: user.id,
    };

    const token = await generateToken(payload);

    res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
