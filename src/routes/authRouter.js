const express = require("express");
const User = require("../model/base");
const Auth = require("../model/auth");
const { signOut, auth } = require("../middleware/authMiddleware");
const authRouter = express.Router();

authRouter.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.signin(email, password, (err, data) => {
    console.log(err);
    if (err === "error") {
      return res.status(400).send({ message: "Wrong credentials", data: {} });
    }

    res.status(200).send({ message: "Succesful sign in", data });
  });
});

authRouter.post("/auth/signout", auth, signOut, async (req, res) => {
  res.status(200).send({ message: "signout successful" });
});

authRouter.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.signup(email, password, (result) => {
    if (result === "error") {
      return res.status(400).send({ message: "Signup failed", data: {} });
    }
    res.status(200).send({ message: "signup successful" });
  });
});

module.exports = authRouter;
