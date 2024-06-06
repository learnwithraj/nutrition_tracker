const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      required: [true, "Name is Mandatory"],
      type: String,
    },
    email: {
      required: [true, "Email is Mandatory"],
      type: String,
      unique: true,
    },
    password: {
      required: [true, "Password is Mandatory"],
      type: String,
    },
    age: {
      required: [true, "Age is Mandatory"],
      type: Number,
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    const user = this;
    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    return isMatch;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
