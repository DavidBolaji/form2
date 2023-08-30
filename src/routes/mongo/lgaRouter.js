const express = require("express");
const { auth } = require("../../middleware/mongo/authMiddleware");
const { lgaModel } = require("../../model/mongo/lga");
const lgaRouter = express.Router();

lgaRouter.get("/lga", async (req, res) => {
  try {
    const result = await lgaModel.find()
    res.status(200).send({ message: "user fetch succesfully", data: result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

lgaRouter.post("/create/lga", async (req, res) => {
    const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
    try {
        const lga = new lgaModel({ staffId, sex, phoneNumber, penNumber, LGA, pfa });
        await lga.save();
        res.status(201).send({ message: "user created successfully", data: lga });
    } catch (error) {
        res.status(500).send({ message: "Server Error", data: [] });
    }
  
});

lgaRouter.delete("/delete/lga/:_id", auth, async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await lgaModel.deleteOne({ _id: { $eq: _id } });
    res.status(200).send({ message: "user fetch succesfully", data: result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

module.exports = lgaRouter;
