const usersRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (req, res) => {
  const { username, name, password, blogs } = req.body;
  if (password.length < 3)
    return res
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  if (username.length < 3)
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" });
  if (await User.findOne({ username }))
    return res.status(400).json({
      error: "Username must be unique",
    });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
    blogs,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}); //.populate("blogs");
  res.json(users);
});
module.exports = usersRouter;
