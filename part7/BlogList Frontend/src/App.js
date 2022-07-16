//import libraries
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useMatch } from "react-router-dom";

//import components
import Login from "./components/Login";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
//import services
import blogService from "./services/blogs";

//import reducers
import { acSetUser, acUserLogin } from "./reducers/userReducer";
import { acSetUsers } from "./reducers/usersReducer";
import {
  acCreateBlog,
  acUpdateBlog,
  acDeleteBlog,
  acSetBlogs,
  acCreateComment,
} from "./reducers/blogsReducer";
import { updateNotification } from "./reducers/notificationReducer";

const App = () => {
  // Hooks
  const [errMsg, setErrMsg] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [blogInfo, setBlogInfo] = useState(null);
  const timeoutID = useRef(0);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const matchUser = useMatch("/users/:id");
  const matchBlog = useMatch("/blogs/:id");
  useEffect(() => {
    if (window.localStorage.user) {
      const curUser = JSON.parse(window.localStorage.user);
      blogService.setToken(curUser.token);
      dispatch(acSetUser(curUser));
    }
    dispatch(acSetUsers());
    dispatch(acSetBlogs());
  }, [dispatch]);

  useEffect(() => {
    setUserInfo(
      matchUser ? users.find((user) => user._id === matchUser.params.id) : null
    );
  }, [matchUser, users]);
  useEffect(() => {
    setBlogInfo(
      matchBlog ? blogs.find((blog) => blog._id === matchBlog.params.id) : null
    );
  }, [matchBlog, blogs]);

  //callback functions
  const handleLogin = (credentials) => {
    dispatch(acUserLogin(credentials)).catch((err) => {
      setErrMsg("Wrong username or password");
      setTimeout(() => setErrMsg(""), 5000);
    });
  };
  const handleAddBlog = (blog) => {
    clearTimeout(timeoutID.current);
    dispatch(acCreateBlog(blog)).catch((err) =>
      dispatch(updateNotification("Error creating blog"))
    );
    dispatch(updateNotification("Successfully created blog"));

    timeoutID.current = setTimeout(
      () => dispatch(updateNotification("")),
      5000
    );
  };
  const handleAddComment = (blog, comment) => {
    dispatch(acCreateComment(blog, comment));
  };
  const handleLikeBlog = (blog) => {
    dispatch(
      acUpdateBlog({
        ...blog,
        likes: blog.likes + 1,
      })
    );
  };
  const handleRemoveBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(acDeleteBlog(blog));
    }
  };
  //View
  return user === null ? (
    <Login handleLogin={handleLogin} errMsg={errMsg}></Login>
  ) : (
    <>
      <div className="bg-gray-300">
        <Link to="/" className="underline text-sky-800">
          {" "}
          blogs{" "}
        </Link>
        <Link to="/users" className="underline text-sky-800">
          {" "}
          users{" "}
        </Link>
        <span>{user.name} logged in </span>
        <button
          className="py-1 px-2 rounded-full bg-teal-400/75"
          onClick={() => {
            blogService.setToken(null);
            window.localStorage.removeItem("user");
            dispatch(acSetUser(null));
          }}
        >
          Logout
        </button>
      </div>
      <h2 className="font-serif font-bold text-2xl">blog app</h2>
      <Routes>
        <Route
          path="/"
          element={<Home blogs={blogs} handleAddBlog={handleAddBlog} />}
        ></Route>
        <Route path="/users/:id" element={<User user={userInfo} />}></Route>
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blogInfo}
              user={user}
              handleLikeBlog={handleLikeBlog}
              handleRemoveBlog={handleRemoveBlog}
              handleAddComment={handleAddComment}
            ></Blog>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
