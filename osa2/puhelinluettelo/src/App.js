import { useState, useEffect } from "react";
import personService from "./services/person";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAllNumbers, setShowAllNumbers] = useState(true);
  const [filteredNumbers, setFilteredNumbers] = useState([
    { name: "", number: "" },
  ]);

  // Insert initial persons to phonebook by using personService module
  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    let personNames = persons;

    // Checks whether we already have same person in our phonebook
    let found = personNames.find((element) => element.name === newName);

    if (found) {
      console.log("found");
      alert(`${newName} is already added to phonebook!`);
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        // Let's empty the input fields for name and number
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDeletePerson = (personId, personName) => {
    console.log("delete", personId);
    if (window.confirm(`Delete ${personName}?`)) {
      personService.deletePerson(personId).then((returnedPerson) => {
        console.log(returnedPerson);
      });
    }
  };

  // let filteredPersons = "";

  // const filterPhoneBookResults = (event) => {
  //   setShowAllNumbers(false);
  //   const numbers = showAllNumbers
  //     ? persons
  //     : persons.find((person) =>
  //         person.name.toLowerCase().includes(event.target.value.toLowerCase())
  //       );
  //   console.log(numbers);
  //   setFilteredNumbers(numbers);
  // };

  // let numbersList = showAllNumbers ? persons : filteredNumbers;

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>
        filter shown with: <input onChange={filterPhoneBookResults} />
      </div> */}

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
