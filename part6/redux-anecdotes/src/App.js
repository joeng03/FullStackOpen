import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { acSetAnecdotes } from "./reducers/anecdoteReducer";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(acSetAnecdotes());
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
