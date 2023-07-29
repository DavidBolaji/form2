const mongoose = require("../db/mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: [true, "Please provide the user ID."] },
    sex: { type: String, required: [true, "Please provide the sex."] },
    phoneNumber: {
      type: String,
      required: [true, "Please provide the phone number."],
    },
    penNumber: {
      type: String,
      required: [true, "Please provide the pen number."],
    },
    LGA: { type: String, required: [true, "Please provide the LGA."] },
    pfa: { type: String, required: [true, "Please provide the PFA."] },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
