import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initializeAnecdotes,
  addVoteToAnecdote,
} from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  );

  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(addVoteToAnecdote(id));
  };

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) =>
      anecdotes.forEach((anecdote) => {
        dispatch(initializeAnecdotes(anecdote));
      })
    );
  }, []);

  return (
    <>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteForm;
