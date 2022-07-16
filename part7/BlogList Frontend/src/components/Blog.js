import Togglable from "./Togglable";
import AddComment from "./AddComment";
const Blog = ({
  blog,
  user,
  handleLikeBlog,
  handleRemoveBlog,
  handleAddComment,
}) => {
  return blog ? (
    <div className="blog">
      <h2 className="font-serif font-bold text-xl">
        {blog.title} by {blog.author}
      </h2>

      <p className="url">{blog.url}</p>
      <p className="likes">
        likes: {blog.likes}{" "}
        <button
          className="like py-1 px-2 rounded-full bg-teal-400/75"
          onClick={() => handleLikeBlog(blog)}
        >
          like
        </button>
      </p>
      <p>
        {user.id === blog.user._id ? (
          <button
            className="remove py-1 px-2 rounded-full bg-teal-400/75"
            onClick={() => handleRemoveBlog(blog)}
          >
            Remove
          </button>
        ) : null}
      </p>
      <p>Added by {blog.user.name}</p>
      <h3>Comments</h3>
      {blog.comments.map((comment) => (
        <li key={comment._id}>{comment.content}</li>
      ))}
      <Togglable openButtonLabel="Add Comment" closeButtonLabel="Cancel">
        <AddComment
          blog={blog}
          handleAddComment={(comment) => {
            handleAddComment(blog, comment);
          }}
        ></AddComment>
      </Togglable>
    </div>
  ) : null;
};
/*
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
};
*/
export default Blog;
