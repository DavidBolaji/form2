const express = require("express");
const { auth } = require("../../middleware/mongo/authMiddleware");
const { middleModel } = require("../../model/mongo/middleSchool");
const middleRouter = express.Router();

middleRouter.get("/middle", async (req, res) => {
  try {
    const result = await middleModel.find()
    res.status(200).send({ message: "user fetch succesfully", data: result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

middleRouter.post("/create/middle", async (req, res) => {
    const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
    try {
        const lga = new middleModel({ staffId, sex, phoneNumber, penNumber, LGA, pfa });
        await lga.save();
        res.status(201).send({ message: "user created successfully", data: lga });
    } catch (error) {
        res.status(500).send({ message: "Server Error", data: [] });
    }
  
});

middleRouter.delete("/delete/middle/:_id", auth, async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await middleModel.deleteOne({ _id: { $eq: _id } });
    res.status(200).send({ message: "user fetch succesfully", data: result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

module.exports = middleRouter;