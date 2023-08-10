const express = require("express");
const User = require("../model/base");
const { auth } = require("../middleware/authMiddleware");
const lgaRouter = express.Router();

lgaRouter.get("/lga", async (req, res) => {
  try {
    await User.findAll("lga", (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

lgaRouter.post("/create/lga", async (req, res) => {
  const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
  let lga = new User(staffId, sex, phoneNumber, penNumber, LGA, pfa, "lga");
  lga = await lga.save();
  res.status(201).send({ message: "user created successfully", data: lga });
});

lgaRouter.delete("/delete/lga/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    await User.delete("lga", id, (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

module.exports = lgaRouter;
