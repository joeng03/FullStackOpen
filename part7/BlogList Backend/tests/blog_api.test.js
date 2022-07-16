const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/Blog.js");
const app = require("../app");
const { application } = require("express");
const api = supertest(app);

const testJwtToken =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRFU1QiLCJpZCI6IjYyYWRiNDkyMGU0ZmZmNTk0ZDIzMzJjYSIsImlhdCI6MTY1NTU1MTgzNn0.WPmksFitz-EaWl8FhkxxHTj-SjJRzHjbrciTMhIMcdk";
const initBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "62adb4920e4fff594d2332ca",
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "62adb4920e4fff594d2332ca",
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initBlogs);
  /*
  for (let blogObj of initBlogs) {
    let blog = new Blog(blogObj);
    await blog.save();
  }
  */
});
test("Length and format of blogs", async () => {
  const resultBlogs = await api
    .get("/api/blogs")
    .set("Authorization", testJwtToken)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(resultBlogs.body).toHaveLength(initBlogs.length);
});

test("Existence of ID in blogs", async () => {
  const resultBlogs = await api
    .get("/api/blogs")
    .set("Authorization", testJwtToken);
  for (let blog of resultBlogs.body) {
    expect(blog._id).toBeDefined();
  }
});

test("POST request works correctly", async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", testJwtToken)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const resultBlogs = await api
    .get("/api/blogs")
    .set("Authorization", testJwtToken)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(resultBlogs.body).toHaveLength(initBlogs.length + 1);

  const urls = resultBlogs.body.map((blog) => blog.url);
  expect(urls).toContain(newBlog.url);
});

test("Likes property of Blogs defaults to 0 if not provided", async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    __v: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", testJwtToken)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  let resultBlogs = await api
    .get("/api/blogs")
    .set("Authorization", testJwtToken)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  resultBlogs = resultBlogs.body;
  expect(resultBlogs[resultBlogs.length - 1].likes).toBe(0);
});

test("Without both title and url properties, POST to /api/blogs returns a 400 status code", async () => {
  const newBlog = {
    author: "Michael Chan",
    likes: 2,
    __v: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", testJwtToken)
    .expect(400);
});

test("DELETE request works correctly", async () => {
  const id = "5a422aa71b54a676234d17f8";
  await api
    .delete(`/api/blogs/${id}`)
    .set("Authorization", testJwtToken)
    .expect(204);
  const resultBlogs = await api
    .get("/api/blogs")
    .set("Authorization", testJwtToken)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(resultBlogs.body).toHaveLength(initBlogs.length - 1);

  const ids = resultBlogs.body.map((blog) => blog._id);
  expect(ids).not.toContain(id);
});

test("PUT request works correctly", async () => {
  const newBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 8,
  };
  const updatedBlog = await api
    .put(`/api/blogs/${newBlog._id}`)
    .send(newBlog)
    .set("Authorization", testJwtToken)
    .expect(200);
  delete updatedBlog.body.user;
  expect(updatedBlog.body).toEqual(newBlog);
  const resultBlogs = await api
    .get("/api/blogs")
    .set("Authorization", testJwtToken)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(resultBlogs.body).toHaveLength(initBlogs.length);
});
afterAll(() => {
  mongoose.connection.close();
});
