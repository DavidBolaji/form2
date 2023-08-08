const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { UserModel } = require("./model/user");
const app = express();
const router = express.Router();
const cors = require("cors");
const pool = require("./db/mysql");
const User = require("./model/base");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/lga", async (req, res) => {
  try {
    await User.findAll("lga", (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

router.get("/middle", async (req, res) => {
  try {
    await User.findAll("middle", (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

router.get("/subeb", async (req, res) => {
  try {
    await User.findAll("subeb", (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

router.get("/phcb", async (req, res) => {
  try {
    await User.findAll("phcb", (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

router.post("/create/lga", async (req, res) => {
  const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
  let lga = new User(staffId, sex, phoneNumber, penNumber, LGA, pfa, "lga");
  lga = await lga.save();
  res.status(201).send({ message: "user created successfully", data: lga });
});

router.post("/create/middle", async (req, res) => {
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

router.post("/create/subeb", async (req, res) => {
  const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
  let subeb = new User(staffId, sex, phoneNumber, penNumber, LGA, pfa, "subeb");
  subeb = await subeb.save();
  res.status(201).send({ message: "user created successfully", data: subeb });
});

router.post("/create/phcb", async (req, res) => {
  const { staffId, sex, phoneNumber, penNumber, LGA, pfa } = req.body;
  let phcb = new User(staffId, sex, phoneNumber, penNumber, LGA, pfa, "phcb");
  phcb = await phcb.save();
  res.status(201).send({ message: "user created successfully", data: phcb });
});

router.delete("/delete/lga/:id", async (req, res) => {
  const {id} = req.params;
  console.log(id)
  try {
    await User.delete("lga", id, (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

router.delete("/delete/middle/:id", async (req, res) => {
  const {id} = req.params;
  console.log(id)
  try {
    await User.delete("lga", id, (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

router.delete("/delete/subeb/:id", async (req, res) => {
  const {id} = req.params;
  console.log(id)
  try {
    await User.delete("lga", id, (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

router.delete("/delete/phcb/:id", async (req, res) => {
  const {id} = req.params;
  console.log(id)
  try {
    await User.delete("lga", id, (result) => {
      res.status(200).send({ message: "user fetch succesfully", data: result });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

app.use("/api/v1/users", router);

app.listen(PORT, async () => {
  console.log(`server running on ${PORT}`);
});
