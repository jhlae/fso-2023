import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      state.push(action.payload);
    },
    insertAnecdote(state, action) {
      state.push(action.payload);
      // console.log(JSON.parse(JSON.stringify(state)));
      // return action.payload;
    },
    addVote(state, action) {
      const votedAnecdoteId = action.payload;
      const anecdoteToChange = state.find((n) => n.id === votedAnecdoteId.id);

      const votedAnecdote = {
        content: anecdoteToChange.content,
        id: anecdoteToChange.id,
        votes: anecdoteToChange.votes + 1,
      };
      console.log(JSON.parse(JSON.stringify(votedAnecdote)));

      return state.map((anecdote) =>
        anecdote.id === votedAnecdoteId.id ? votedAnecdote : anecdote
      );
    },
  },
});

export const { setAnecdotes, insertAnecdote, addVote } = anecdoteSlice.actions;

/*
  Action creators 
*/

export const initializeAnecdotes = (anecdote) => {
  return {
    type: "anecdotes/setAnecdotes",
    payload: anecdote,
  };
};

export const createNewAnecdote = (content) => {
  return {
    type: "anecdotes/insertAnecdote",
    payload: content,
  };
};

export const addVoteToAnecdote = (id) => {
  return {
    type: "anecdotes/addVote",
    payload: { id },
  };
};

export default anecdoteSlice.reducer;
