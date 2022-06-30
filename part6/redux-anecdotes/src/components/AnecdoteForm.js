import { connect } from "react-redux";
import { acCreateAnecdote } from "../reducers/anecdoteReducer";
import { acSetNotification } from "../reducers/notificationReducer";
const AnecdoteForm = (props) => {
  const createAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    props.acCreateAnecdote(content);
    props.acSetNotification(`You added ${content}`, 5);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <input name="content" />
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  acCreateAnecdote,
  acSetNotification,
};
export default connect(null, mapDispatchToProps)(AnecdoteForm);
