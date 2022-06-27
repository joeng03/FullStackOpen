import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    if (window.localStorage.user) {
      const curUser = JSON.parse(window.localStorage.user);
      blogService.setToken(curUser.token);
      setUser(curUser);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
      setBlogs(blogs);
    });
  }, []);

  const handleLogin = async (credentials) => {
    //console.log(credentials);
    try {
      const userObj = await loginService.login(credentials);
      //console.log(user);
      blogService.setToken(userObj.token);
      setUser(userObj);

      window.localStorage.setItem("user", JSON.stringify(userObj));
    } catch (exception) {
      setErrMsg("Wrong username or password");
      setTimeout(() => setErrMsg(""), 5000);
    }
  };
  const handleAddBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(savedBlog));
      setNotification("Successfully created blog");
    } catch (exception) {
      setNotification("Error creating blog");
    }
    setTimeout(() => setNotification(""), 5000);
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
  return user === null ? (
    <Login handleLogin={handleLogin} errMsg={errMsg}></Login>
  ) : (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      <button
        onClick={() => {
          blogService.setToken(null);
          window.localStorage.removeItem("user");
          setUser(null);
        }}
      >
        Logout
      </button>
      <Togglable openButtonLabel="New Blog" closeButtonLabel="Cancel">
        <AddBlog handleAddBlog={handleAddBlog} />
      </Togglable>
      <div>{notification}</div>
      {blogs.map((blog) => (
        <Blog
          key={blog._id}
          blog={blog}
          user={user}
          handleLikeBlog={handleLikeBlog}
          handleRemoveBlog={handleRemoveBlog}
        ></Blog>
      ))}
    </div>
  );
};

export default App;
