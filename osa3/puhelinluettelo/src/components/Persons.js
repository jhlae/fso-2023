import { useState } from "react";

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
            &nbsp;{" "}
            <button onClick={() => handleDeletePerson(person.id, person.name)}>
              x
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
