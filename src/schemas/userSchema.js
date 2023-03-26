const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    bio: { type: String },
    isAdmin: { type: Boolean, default: false},
    savedPets: { type: Array },
    ownedPets: { type: Array },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;