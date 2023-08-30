const jwt = require("jsonwebtoken");
const AuthModel = require("../../model/mongo/auth");

const auth = async (req, res, next) => {
    const header = req.headers["authorization"];
    try {
        if (header) {
            const token = header.replace("Bearer ", "");
            const decoded = jwt.verify(token, process.env.SECRET);
            const user = await AuthModel.findOne({ _id: decoded._id, 'tokens.token': token})
    
            if(!user) {
                throw new Error({ message: "Unauthorized" });
            }
            req.authId = user.id
            next();
        }
    } catch (error) {
        
        res.status(401).send({ message: "Unauthorized" });
    }
 
}

const signOut = async (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header.replace("Bearer ", "");
    try {
      const user = await AuthModel.findOne({_id: req.authId});
      const tokenList = user.tokens.filter((t) => t.token !== token);
      await AuthModel.findOneAndUpdate({_id: req.authId}, {tokens: tokenList}, {new: true})
      next();
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "An error occured" });
    }
  };

  module.exports = { auth, signOut };