const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { UserModel } = require("./model/user");
const app = express();
const router = express.Router();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send({ message: "user fetch succesfully", data: users });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = new UserModel({ ...req.body });
    await user.save();
    res.status(201).send({ message: "user created succesfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "Server Error", data: [] });
  }
});

app.use("/api/v1/users", router);

app.listen(PORT, async () => {
  console.log(`server running on ${PORT}`);
});
