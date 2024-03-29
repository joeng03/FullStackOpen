const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const [blogObj, userInfo] = [req.body, req.user];

  if (!userInfo) res.status(401).json({ error: "Missing or invalid token" });
  if (!(blogObj.hasOwnProperty("title") || blogObj.hasOwnProperty("url")))
    return res.status(400).json({ error: "Title or url should be specified" });

  if (!blogObj.hasOwnProperty("likes")) blogObj.likes = 0;

  const blog = new Blog({ ...blogObj, user: userInfo.id });
  const savedBlog = await blog.save();
  await savedBlog.populate("user");
  /*
const user = await User.findById(userInfo.id);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
*/
  await User.findByIdAndUpdate(
    userInfo.id,
    { $push: { blogs: savedBlog._id } },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  res.status(201).json(savedBlog);
});

//adding comments
blogsRouter.post("/:id/comments", async (req, res) => {
  console.log(req.params.id);
  const [blogId, comment] = [req.params.id, req.body];
  const blog = await Blog.findById(blogId);
  blog.comments = blog.comments.concat(comment);
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const [blogId, userInfo] = [req.params.id, req.user];
  if (!userInfo)
    return res.status(401).json({ error: "Missing or invalid token" });

  const blog = await Blog.findById(blogId);

  if (!blog) return res.status(404).json({ error: "Blog is already deleted" });
  if (blog.user.toString() !== userInfo.id)
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
  const [blog, user, id] = [req.body, req.user, req.params.id];
  if (!user) res.status(401).json({ error: "Missing or invalid token" });
  /*
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: "Blog is already deleted" });
  
  if (!(blog.user.toString() === user.id))
    return res.status(401).json({ error: "Not authorized to edit blog" });
    
  blog.likes = blogObj.likes;
  const savedBlog = await blog.save();
  await savedBlog.populate("user");
  */

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", { username: 1, name: 1 });

  res.json(updatedBlog);
});
module.exports = blogsRouter;
