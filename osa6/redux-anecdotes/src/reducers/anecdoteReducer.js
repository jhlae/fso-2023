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
    type: "ANECDOTE",
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  };
};

const initialState = anecdotesAtStart.map(asObject);

export const reducer = (state = [], action) => {
  // console.log("action", action);
  switch (action.type) {
    case "INITIALIZE":
      return initialState;

    case "ADD_VOTE":
      const id = action.payload.id;
      const noteToChange = state.find((n) => n.payload.id === id);
      const changedNote = {
        ...noteToChange,
        payload: {
          content: noteToChange.payload.content,
          id: noteToChange.payload.id,
          votes: noteToChange.payload.votes + 1,
        },
      };

      return state.map((anecdote) =>
        anecdote.payload.id === noteToChange.payload.id ? changedNote : anecdote
      );

    case "ANECDOTE":
      state.push(action);
      return [...state];

    default:
      return state;
  }
};

export const addVote = (id) => {
  return {
    type: "ADD_VOTE",
    payload: { id },
  };
};

export const initializeAnecdotes = () => {
  console.log("initialized");
  return {
    type: "INITIALIZE",
    payload: {},
  };
};

export const createNewAnecdote = (anecdoteValue) => {
  return {
    type: "ANECDOTE",
    payload: { content: anecdoteValue, id: getId(), votes: 0 },
  };
};
