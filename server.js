const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { generateToken, jwtAuthMiddleware } = require("./jwt");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);
const foodRoutes = require("./routes/foodRoutes");
app.use("/food", jwtAuthMiddleware, foodRoutes);
const trackingRoutes = require("./routes/trackingRoutes");
app.use("/foods", jwtAuthMiddleware, trackingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in Port ${PORT}`);
});
