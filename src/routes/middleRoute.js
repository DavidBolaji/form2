const express = require("express");
const User = require("../model/base");
const { auth } = require("../middleware/authMiddleware");
const middleRouter = express.Router();

middleRouter.get("/middle", async (req, res) => {
  try {
    await User.findAll("middle", (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

middleRouter.post("/create/middle", async (req, res) => {
  const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
  let middle = new User(
    staffId,
    sex,
    phoneNumber,
    penNumber,
    LGA,
    pfa,
    "middle"
  );
  middle = await middle.save();
  res.status(201).send({ message: "user created successfully", data: middle });
});

middleRouter.delete("/delete/middle/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await User.delete("middle", id, (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

module.exports = middleRouter;
