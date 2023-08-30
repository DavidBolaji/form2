const express = require("express");
const AuthModel = require("../../model/mongo/auth");
const { auth, signOut } = require("../../middleware/mongo/authMiddleware");
const authRouter = express.Router();

authRouter.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthModel.validateUser(req.body.email, req.body.password);
    const token = await user.genAuthToken();
    res.status(200).send({ message: "Succesful sign in", data: {user, token} });
  } catch (e) {
    return res.status(400).send({ message: "Wrong credentials", data: {} });
  }
});

authRouter.post("/auth/signout", auth, signOut, async (req, res) => {
  res.status(200).send({ message: "signout successful" });
});

authRouter.post("/auth/signup", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = new AuthModel({email, password})
        await user.save();
        const token = await user.genAuthToken();
        await user.save();
        res.status(200).send({ message: "signup successful" });
      } catch (error) {
        return res.status(400).send({ message: "Signup failed", data: {} });
      }
});

module.exports = authRouter;