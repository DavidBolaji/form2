const express = require("express");
const { subebModel } = require("../../model/mongo/subeb");
const { auth } = require("../../middleware/mongo/authMiddleware");
const subebRouter = express.Router();

subebRouter.get("/subeb", async (req, res) => {
  try {
    const result = await subebModel.find()
    res.status(200).send({ message: "user fetch succesfully", data: result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

subebRouter.post("/create/subeb", async (req, res) => {
    const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
    try {
        const lga = new subebModel({ staffId, sex, phoneNumber, penNumber, LGA, pfa });
        await lga.save();
        res.status(201).send({ message: "user created successfully", data: lga });
    } catch (error) {
        res.status(500).send({ message: "Server Error", data: [] });
    }
  
});

subebRouter.delete("/delete/subeb/:_id", auth, async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await subebModel.deleteOne({ _id: { $eq: _id } });
    res.status(200).send({ message: "user fetch succesfully", data: result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

module.exports = subebRouter;