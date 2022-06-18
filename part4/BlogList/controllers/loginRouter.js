const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const dotenv = require("dotenv");
const User = require("../models/User");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log(password, user);
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET_KEY);
  res.status(200).json({ username: user.username, name: user.name, token });
});

module.exports = loginRouter;
