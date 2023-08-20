import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  addVote,
  initializeAnecdotes,
  createNewAnecdote,
} from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const handleVote = (id) => {
    dispatch(addVote(id));
  };

  const handleCreateAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createNewAnecdote(anecdote));
  };

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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

export default App;
