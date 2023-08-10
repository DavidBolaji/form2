const express = require("express");
const User = require("../model/base");
const { auth } = require("../middleware/authMiddleware");
const phcbRouter = express.Router();

phcbRouter.get("/phcb", async (req, res) => {
  try {
    await User.findAll("phcb", (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

phcbRouter.post("/create/phcb", async (req, res) => {
  const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
  let phcb = new User(staffId, sex, phoneNumber, penNumber, LGA, pfa, "phcb");
  phcb = await phcb.save();
  res.status(201).send({ message: "user created successfully", data: phcb });
});

phcbRouter.delete("/delete/phcb/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await User.delete("lga", id, (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

module.exports = phcbRouter;
