import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
//ac stands for Action Creator

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVotes(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});
export const { addVotes, setAnecdotes, createAnecdote } = anecdoteSlice.actions;

export const acSetAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const acCreateAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content);
    dispatch(createAnecdote(anecdote));
  };
};

export const acAddVotes = (anecdote) => {
  return async (dispatch) => {
    anecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const updatedAnecdote = await anecdoteService.updateVotes(anecdote);
    dispatch(addVotes(updatedAnecdote));
  };
};
export default anecdoteSlice.reducer;
