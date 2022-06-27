import { useState } from "react";
const AddBlog = ({ handleAddBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  return (
    <form className="addBlog">
      <h2>Create new</h2>
      <div>
        Title:
        <input
          className="title"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
      </div>
      <div>
        Author:
        <input
          className="author"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        />
      </div>
      <div>
        URL:
        <input
          className="url"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        />
      </div>
      <button
        className="create"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          setTitle("");
          setAuthor("");
          setUrl("");
          handleAddBlog({ title, author, url });
        }}
      >
        Create
      </button>
    </form>
  );
};
export default AddBlog;
