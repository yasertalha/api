const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

mongoose.model("User", userSchema);
