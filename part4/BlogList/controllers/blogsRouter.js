const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}); //.populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const [blogObj, userInfo] = [req.body, req.user];

  if (!userInfo) res.status(401).json({ error: "Missing token" });
  if (!userInfo.id) res.status(401).json({ error: "Invalid token" });
  if (!(blogObj.hasOwnProperty("title") || blogObj.hasOwnProperty("url")))
    return res.status(400).json({ error: "Title or url should be specified" });

  if (!blogObj.hasOwnProperty("likes")) blogObj.likes = 0;

  const user = await User.findById(userInfo.id);
  console.log(userInfo);
  blogObj.user = user._id;
  const blog = new Blog(blogObj);
  savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const [blogId, userInfo] = [req.params.id, req.user];
  console.log(userInfo);
  if (!userInfo) return res.status(401).json({ error: "Missing token" });
  if (!userInfo.id) return res.status(401).json({ error: "Invalid token" });

  const blog = await Blog.findById(blogId);

  if (!blog) return res.status(404).json({ error: "Blog is already deleted" });
  if (!(blog.user.toString() === userInfo.id))
    return res.status(401).json({ error: "Not authorized to delete blog" });

  await Blog.findByIdAndRemove(blogId);

  const user = await User.findById(userInfo.id);
  user.blogs = user.blogs.filter(
    (userBlogId) => userBlogId.toString() != blogId
  );
  await user.save();
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const [blogObj, user] = [req.body, req.user];
  console.log(blogObj);
  if (!user) res.status(401).json({ error: "Missing token" });
  if (!user.id) return res.status(401).json({ error: "Invalid token" });

  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: "Blog is already deleted" });
  /*
  if (!(blog.user.toString() === user.id))
    return res.status(401).json({ error: "Not authorized to edit blog" });
    */
  console.log(blog);
  blog.likes = blogObj.likes;
  const savedBlog = await blog.save();
  res.json(savedBlog);
});
module.exports = blogsRouter;
