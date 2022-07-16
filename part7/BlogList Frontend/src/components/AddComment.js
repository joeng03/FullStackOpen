const AddComment = ({ handleAddComment }) => {
  return (
    <form
      className="addComment"
      onSubmit={(e) => {
        e.preventDefault();
        const comment = {
          content: e.target.content.value,
          timeStamp: Date.now(),
        };
        handleAddComment(comment);
      }}
    >
      Comment:
      <input
        name="content"
        className="border-b-2 border-teal-500/50 focus:outline-0 focus:border-teal-500"
      />
      <button
        className="create py-1 px-2 rounded-full bg-emerald-400"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
export default AddComment;
