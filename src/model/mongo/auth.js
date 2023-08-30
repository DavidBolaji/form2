const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
}, {
    timestamps: true
});

authSchema.methods.genAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  };

 authSchema.statics.validateUser = async (email, password) => {
    const user = await AuthModel.findOne({ email: email });
  
    try {
      if (!user) {
        throw new Error("Unable to login");
      }
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        throw new Error("Unable to login");
      }
      return user;
    } catch (e) {
      return e;
    }
  
    return user;
  };
  
  authSchema.pre("save", async function (next) {
    const user = this;
  
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  
    next();
  });

const AuthModel = mongoose.model('Auth', authSchema);

module.exports = AuthModel;
