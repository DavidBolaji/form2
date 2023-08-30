const mongoose = require("mongoose");


const phcbSchema = new mongoose.Schema(
  {
    staffId: { type: String, required: [true, "Please provide the staffId"] },
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

const phcbModel = mongoose.model("phcb", phcbSchema);

module.exports = { phcbModel };