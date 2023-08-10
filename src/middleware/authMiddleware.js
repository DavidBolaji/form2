const jwt = require("jsonwebtoken");
const Auth = require("../model/auth");

const auth = (req, res, next) => {
  const header = req.headers["authorization"];

  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    Auth.findAuth(decoded.id, token, (err, result) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      if (result.email !== process.env.EMAIL) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      req.authId = result.id;
      next();
    });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

const signOut = async (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header.replace("Bearer ", "");

  try {
    await Auth.removeToken(req.authId, token);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "An error occured" });
  }
};

module.exports = { auth, signOut };
