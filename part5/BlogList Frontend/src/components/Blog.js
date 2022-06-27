import PropTypes from "prop-types";
import Togglable from "./Togglable";
const Blog = ({ blog, user, handleLikeBlog, handleRemoveBlog }) => {
  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Togglable openButtonLabel="View" closeButtonLabel="Hide">
        <p className="url">{blog.url}</p>
        <p className="likes">
          likes: {blog.likes}{" "}
          <button className="like" onClick={() => handleLikeBlog(blog)}>
            like
          </button>
        </p>
        {user.id === blog.user ? (
          <button className="remove" onClick={() => handleRemoveBlog(blog)}>
            Remove
          </button>
        ) : null}
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
};

export default Blog;
