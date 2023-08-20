import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, initializeAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.payload.content
            .toLowerCase()
            .includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  );

  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(addVote(id));
  };

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <>
      {anecdotes
        .sort((a, b) => b.payload.votes - a.payload.votes)
        .map((anecdote) => (
          <div key={anecdote.payload.id}>
            <div>{anecdote.payload.content}</div>
            <div>
              has {anecdote.payload.votes}
              <button onClick={() => handleVote(anecdote.payload.id)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteForm;
