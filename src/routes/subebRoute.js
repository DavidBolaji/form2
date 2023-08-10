const express = require("express");
const User = require("../model/base");
const { auth } = require("../middleware/authMiddleware");
const subebeRouter = express.Router();

subebeRouter.get("/subeb", async (req, res) => {
  try {
    await User.findAll("subeb", (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

subebeRouter.post("/create/subeb", async (req, res) => {
  const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
  let subeb = new User(staffId, sex, phoneNumber, penNumber, LGA, pfa, "subeb");
  subeb = await subeb.save();
  res.status(201).send({ message: "user created successfully", data: subeb });
});

subebeRouter.delete("/delete/subeb/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await User.delete("lga", id, (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

module.exports = subebeRouter;
