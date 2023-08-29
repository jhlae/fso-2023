import React from "react";
import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreateAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.create(anecdote);
    // console.log(newAnecdote);
    dispatch(createNewAnecdote(newAnecdote));
    dispatch(addNotification(`New anecdote added: '${anecdote}'`));
    // Todo: create a better way to show and hide notifications
    setTimeout(() => {
      dispatch(addNotification(""));
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
