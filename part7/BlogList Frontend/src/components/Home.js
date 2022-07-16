import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddBlog from "./AddBlog";
import Togglable from "./Togglable";

const Home = ({ blogs, handleAddBlog }) => {
  const notification = useSelector((state) => state.notification);
  return (
    <>
      <Togglable openButtonLabel="New Blog" closeButtonLabel="Cancel">
        <AddBlog handleAddBlog={handleAddBlog} />
      </Togglable>
      <div>{notification}</div>
      {[...blogs]
        .sort((a, b) => (a.likes < b.likes ? 1 : -1))
        .map((blog) => (
          <div
            key={blog._id}
            className="m-1 border-2 border-solid border-gray-300"
          >
            <Link to={`/blogs/${blog._id}`} className="underline text-sky-800">
              {blog.title}
            </Link>
          </div>
        ))}
    </>
  );
};
export default Home;
