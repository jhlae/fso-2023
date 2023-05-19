import { useState, useEffect } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  /* 
  https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/20222538#20222538
  */

  const votePointsArr = Array.apply(null, new Array(anecdotes?.length)).map(
    Number.prototype.valueOf,
    0
  );

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [votes, setVotes] = useState();

  const max = anecdotes?.length - 1;
  const min = selectedIdx < 1 ? 1 : 0; // prevent loading anecdote from index zero twice at the start

  const generateRandomNumber = (min, max) => {
    let rand = Math.floor(Math.random() * max);
    return rand;
  };

  /* 
  Function goes through an array of votes saved in state and returns an anecdote with most votes.
  */
  const getAnecdoteWithMostVotes = (votes) => {
    let mostVotesIdx = 0; // Index for most votes, will be updated as we'll go through the array containing the votes
    {
      votes.map((val, i) => {
        if (val > votes[mostVotesIdx]) {
          mostVotesIdx = i;
        }
      });
    }
    // console.log(mostVotesIdx);
    return anecdotes[mostVotesIdx];
  };

  /* Initialize votes with zeros */
  useEffect(() => {
    setVotes(votePointsArr);
  }, []);

  /*
  Handle the click event
  */
  const nextRandomAnecdote = (e) => {
    e.preventDefault();
    setSelectedIdx(generateRandomNumber(min, max));
  };

  /*
  Handle the vote
  */
  const handleVote = (anecdoteToVote) => {
    let copy = [...votes];
    copy[anecdoteToVote] += 1;
    // console.log(copy);
    setVotes(copy);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selectedIdx]}</p>
      <p>{votes ? `has ${votes[selectedIdx]} votes` : ""}</p>
      <button onClick={nextRandomAnecdote}>next anecdote</button>
      <button onClick={() => handleVote(selectedIdx)}>vote</button>

      <h2>Anecdote with most votes</h2>
      {votes && getAnecdoteWithMostVotes(votes)}
    </div>
  );
};

export default App;
