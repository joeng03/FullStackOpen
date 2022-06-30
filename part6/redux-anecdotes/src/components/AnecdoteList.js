import { connect } from "react-redux";
import { acAddVotes, acSetAnecdotes } from "../reducers/anecdoteReducer";
import { acSetNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const addVotes = (anecdote) => {
    props.acAddVotes(anecdote);
    props.acSetNotification(`You voted ${anecdote.content}`, 5);
  };
  return (
    <>
      {[...props.anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} {anecdote.votes > 1 ? "votes" : "vote"}
              <button onClick={() => addVotes(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter)
    ),
    filter: state.filter,
  };
};
const mapDispatchToProps = {
  acAddVotes,
  acSetAnecdotes,
  acSetNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
