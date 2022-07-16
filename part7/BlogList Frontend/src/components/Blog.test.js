import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let testBlog;
  const blog = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 14,
    user: "62adb4920e4fff594d2332ca",
  };
  const user = {
    _id: "62af3fbe1a1862d49e1f6dae",
    username: "test",
    blogs: [
      "62af4c82e93c15d8af748374",
      "62af4cbb9373441b1e437b90",
      "62af4cc39373441b1e437b95",
      "62af4cc49373441b1e437b99",
      "62af4cc49373441b1e437b9d",
      "62af4cc59373441b1e437ba1",
      "62af4cc59373441b1e437ba5",
      "62af4cc59373441b1e437ba9",
      "62af4cc59373441b1e437bad",
      "62af4cce9373441b1e437bb2",
      "62af4ccf9373441b1e437bb6",
      "62af4ccf9373441b1e437bba",
      "62af4ccf9373441b1e437bbe",
      "62af4cd09373441b1e437bc2",
      "62af4cd09373441b1e437bc6",
      "62af4cd19373441b1e437bca",
      "62af4cd19373441b1e437bce",
      "62af4cd19373441b1e437bd2",
      "62af4cd79373441b1e437bd6",
      "62af4cd89373441b1e437bda",
      "62af4cd99373441b1e437bde",
      "62af4cda9373441b1e437be2",
      "62af4cdb9373441b1e437be6",
      "62af4cdc9373441b1e437bea",
      "62af4d009373441b1e437bef",
      "62af4d809373441b1e437bf7",
      "62af4d8b9373441b1e437bfb",
      "62af4d8e9373441b1e437bff",
      "62af4d9f9373441b1e437c04",
      "62af4dce9373441b1e437c0b",
      "62af4dd09373441b1e437c0f",
      "62af4dd09373441b1e437c13",
      "62af4dd09373441b1e437c17",
      "62af4dd19373441b1e437c1b",
      "62af4dd19373441b1e437c1f",
      "62af4dd19373441b1e437c23",
      "62af4dd19373441b1e437c27",
      "62af4dd19373441b1e437c2b",
      "62af4dd29373441b1e437c2f",
      "62af4dd29373441b1e437c33",
      "62af4dd29373441b1e437c37",
      "62af4dd29373441b1e437c3b",
      "62af4dd29373441b1e437c3f",
      "62af4dd29373441b1e437c43",
      "62af4dd99373441b1e437c48",
      "62b1548c8e8d69d96c14894b",
      "62b154948e8d69d96c14894f",
      "62b154958e8d69d96c148953",
      "62b154968e8d69d96c148957",
      "62b154968e8d69d96c14895c",
      "62b154968e8d69d96c148963",
      "62b154978e8d69d96c148967",
      "62b1549a8e8d69d96c14896b",
      "62b1549c8e8d69d96c14896f",
      "62b1549d8e8d69d96c148973",
      "62b154a38e8d69d96c148977",
      "62b154a58e8d69d96c14897b",
      "62b154a68e8d69d96c14897f",
      "62b154a68e8d69d96c148983",
      "62b154a78e8d69d96c148987",
      "62b154a78e8d69d96c14898c",
      "62b154a78e8d69d96c148993",
      "62b154a88e8d69d96c148997",
      "62b154a88e8d69d96c14899b",
      "62b154a88e8d69d96c14899f",
      "62b154a88e8d69d96c1489a3",
      "62b154a88e8d69d96c1489a7",
      "62b154a88e8d69d96c1489ab",
      "62b154a98e8d69d96c1489af",
      "62b154a98e8d69d96c1489b3",
      "62b154a98e8d69d96c1489b7",
      "62b154a98e8d69d96c1489bb",
      "62b154a98e8d69d96c1489bf",
      "62b154a98e8d69d96c1489c3",
      "62b154aa8e8d69d96c1489c7",
      "62b154aa8e8d69d96c1489cb",
      "62b154aa8e8d69d96c1489cf",
      "62b154ab8e8d69d96c1489d3",
      "62b154cc8e8d69d96c1489d7",
      "62b154cd8e8d69d96c1489db",
      "62b154cf8e8d69d96c1489df",
      "62b154cf8e8d69d96c1489e3",
      "62b154d08e8d69d96c1489e7",
      "62b154d18e8d69d96c1489eb",
      "62b154d18e8d69d96c1489ef",
      "62b154d18e8d69d96c1489f3",
      "62b154d18e8d69d96c1489f7",
      "62b154d18e8d69d96c1489fb",
      "62b154d18e8d69d96c1489ff",
      "62b154d28e8d69d96c148a03",
      "62b154d28e8d69d96c148a07",
      "62b154d28e8d69d96c148a0b",
      "62b154d38e8d69d96c148a0f",
      "62b154d38e8d69d96c148a13",
      "62b154d38e8d69d96c148a17",
      "62b154d38e8d69d96c148a1b",
      "62b154d38e8d69d96c148a1f",
      "62b154d48e8d69d96c148a23",
      "62b154d48e8d69d96c148a27",
      "62b154d48e8d69d96c148a2b",
      "62b154d58e8d69d96c148a2f",
      "62b154d58e8d69d96c148a33",
      "62b154d58e8d69d96c148a37",
      "62b154d58e8d69d96c148a3b",
      "62b154d58e8d69d96c148a3f",
      "62b154d58e8d69d96c148a43",
      "62b154d68e8d69d96c148a47",
      "62b154d68e8d69d96c148a4b",
      "62b154d68e8d69d96c148a4f",
      "62b154d68e8d69d96c148a53",
      "62b154d68e8d69d96c148a57",
      "62b154d78e8d69d96c148a5b",
      "62b154d78e8d69d96c148a5f",
      "62b154d78e8d69d96c148a63",
      "62b154d78e8d69d96c148a67",
      "62b154d78e8d69d96c148a6b",
      "62b154d78e8d69d96c148a6f",
      "62b154d88e8d69d96c148a73",
      "62b154d88e8d69d96c148a77",
      "62b154d88e8d69d96c148a7b",
      "62b154d88e8d69d96c148a7f",
      "62b154d88e8d69d96c148a83",
      "62b154d88e8d69d96c148a87",
      "62b154d98e8d69d96c148a8b",
      "62b154d98e8d69d96c148a8f",
      "62b154d98e8d69d96c148a93",
      "62b154d98e8d69d96c148a97",
      "62b154d98e8d69d96c148a9b",
      "62b154da8e8d69d96c148a9f",
      "62b154e18e8d69d96c148aa4",
      "62b154e18e8d69d96c148aa8",
      "62b154e28e8d69d96c148aac",
      "62b154e28e8d69d96c148ab3",
      "62b154e28e8d69d96c148ab8",
      "62b154e28e8d69d96c148abc",
      "62b154e38e8d69d96c148ac0",
      "62b154e48e8d69d96c148ac4",
      "62b155168e8d69d96c148ac8",
      "62b155178e8d69d96c148acc",
      "62b155188e8d69d96c148ad0",
      "62b155188e8d69d96c148ad4",
      "62b155198e8d69d96c148ad8",
      "62b155198e8d69d96c148adc",
      "62b155198e8d69d96c148ae1",
      "62b1551a8e8d69d96c148ae8",
      "62b1551a8e8d69d96c148aec",
      "62b1551a8e8d69d96c148af0",
      "62b1551a8e8d69d96c148af4",
      "62b1551a8e8d69d96c148af8",
      "62b1551a8e8d69d96c148afc",
      "62b1551b8e8d69d96c148b00",
      "62b1551b8e8d69d96c148b04",
      "62b1551b8e8d69d96c148b08",
      "62b1551b8e8d69d96c148b0c",
      "62b1551b8e8d69d96c148b10",
      "62b1551b8e8d69d96c148b14",
      "62b1551c8e8d69d96c148b18",
      "62b1551c8e8d69d96c148b1c",
      "62b1551c8e8d69d96c148b20",
      "62b1551c8e8d69d96c148b24",
      "62b1551c8e8d69d96c148b28",
      "62b1551c8e8d69d96c148b2c",
      "62b1551d8e8d69d96c148b30",
      "62b1551d8e8d69d96c148b34",
      "62b1551d8e8d69d96c148b38",
      "62b1551d8e8d69d96c148b3c",
      "62b1551d8e8d69d96c148b40",
      "62b1551e8e8d69d96c148b44",
      "62b1551e8e8d69d96c148b48",
      "62b1551e8e8d69d96c148b4c",
      "62b1551e8e8d69d96c148b50",
      "62b1551e8e8d69d96c148b54",
      "62b1551e8e8d69d96c148b58",
      "62b1551f8e8d69d96c148b5c",
      "62b1551f8e8d69d96c148b60",
      "62b1551f8e8d69d96c148b64",
      "62b1551f8e8d69d96c148b68",
      "62b1551f8e8d69d96c148b6c",
      "62b1551f8e8d69d96c148b70",
      "62b155208e8d69d96c148b74",
      "62b155208e8d69d96c148b78",
      "62b155208e8d69d96c148b7c",
      "62b155208e8d69d96c148b80",
      "62b155208e8d69d96c148b84",
      "62b155218e8d69d96c148b88",
      "62b155218e8d69d96c148b8c",
      "62b155218e8d69d96c148b90",
      "62b155218e8d69d96c148b94",
      "62b155218e8d69d96c148b98",
      "62b155218e8d69d96c148b9c",
      "62b155228e8d69d96c148ba0",
      "62b155228e8d69d96c148ba4",
      "62b155228e8d69d96c148ba8",
      "62b155228e8d69d96c148bac",
      "62b155228e8d69d96c148bb0",
      "62b155228e8d69d96c148bb4",
      "62b155228e8d69d96c148bb8",
      "62b155238e8d69d96c148bbc",
      "62b155238e8d69d96c148bc0",
      "62b155238e8d69d96c148bc4",
      "62b155238e8d69d96c148bc8",
      "62b155248e8d69d96c148bcc",
      "62b155248e8d69d96c148bd0",
      "62b155248e8d69d96c148bd4",
      "62b155248e8d69d96c148bdc",
      "62b155248e8d69d96c148be0",
      "62b155248e8d69d96c148be4",
      "62b155258e8d69d96c148be8",
      "62b1834c8e8d69d96c148bfe",
      "62b1aca6063fefe0805ccdbe",
    ],
  };
  const handleLikeBlog = async (blog) => {
    blog.likes += 1;
    const updatedBlog = await blogService.update(blog);
    const updatedBlogs = blogs
      .map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
      .sort((a, b) => (a.likes < b.likes ? 1 : -1));
    setBlogs(updatedBlogs);
  };
  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog);
      setBlogs(blogs.filter((_blog) => _blog._id !== blog._id));
    }
  };
  const setup = () => {
    return render(
      <Blog
        className="testBlog"
        blog={blog}
        user={user}
        handleLikeBlog={handleLikeBlog}
        handleRemoveBlog={handleRemoveBlog}
      />
    ).container;
  };
  beforeEach(() => {});

  test("Blog Details are hidden on first render", async () => {
    testBlog = setup();
    const togglableContent = testBlog.querySelector(".togglableContent");
    expect(togglableContent).toHaveStyle("display:none");
  });
  test("Blog Details are shown when view button is clicked", async () => {
    testBlog = setup();
    const user = userEvent.setup();
    const btnView = testBlog.querySelector(".view");
    await user.click(btnView);
    const togglableContent = testBlog.querySelector(".togglableContent");
    expect(togglableContent).not.toHaveStyle("display:none");
  });
  test("The like button works correctly", async () => {
    const handleLikeBlog = jest.fn();
    const user = userEvent.setup();
    const testBlog = render(
      <Blog
        className="testBlog"
        blog={blog}
        user={user}
        handleLikeBlog={handleLikeBlog}
        handleRemoveBlog={handleRemoveBlog}
      />
    ).container;
    const btnView = testBlog.querySelector(".view");
    const btnLike = testBlog.querySelector(".like");
    console.log(handleLikeBlog);
    await user.click(btnView);
    for (let i = 0; i < 2; ++i) await user.click(btnLike);
    expect(handleLikeBlog.mock.calls).toHaveLength(2);
  });
});
