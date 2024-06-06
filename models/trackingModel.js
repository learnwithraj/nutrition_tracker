const mongoose = require("mongoose");

const trackingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Food",
    },
    quantity: {
      type: Number,
      required: true,
      min:1
    },
    eatenDate: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
  },
  { timestamps: true }
);

const Tracking=mongoose.model("Tracking",trackingSchema);
module.exports=Tracking;
