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
          className="title border-b-2 border-teal-500/50 focus:outline-0 focus:border-teal-500"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
      </div>
      <div>
        Author:
        <input
          className="author border-b-2 border-teal-500/50 focus:outline-0 focus:border-teal-500"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        />
      </div>
      <div>
        URL:
        <input
          className="url border-b-2 border-teal-500/50 focus:outline-0 focus:border-teal-500"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        />
      </div>
      <button
        className="create py-1 px-2 rounded-full bg-emerald-400"
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
