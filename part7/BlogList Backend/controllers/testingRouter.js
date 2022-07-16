const testingRouter = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
testingRouter.post("/reset", async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  res.status(204).end();
});
module.exports = testingRouter;
