import { useState, useEffect } from "react";
import personService from "./services/person";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAllNumbers, setShowAllNumbers] = useState(true);
  const [filteredNumbers, setFilteredNumbers] = useState([
    { name: "", number: "" },
  ]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  // Insert initial persons to phonebook by using personService module
  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updatePersonList = () => {
    personService.getAllPersons().then((personList) => {
      setPersons(personList);
    });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  /* 
  Helper function to handle all notifications and to remove them after 3 seconds 
  */
  const handleNotification = (msg, type) => {
    if (msg && type) {
      setNotificationMessage(msg);
      setNotificationType(type);
    } else {
      return false;
    }
    const timer = setTimeout(() => {
      setNotificationMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  };

  const addPerson = (event) => {
    event.preventDefault();

    let personNames = persons;

    // Checks whether we already have same person in our phonebook
    let found = personNames.find((element) => element.name === newName);

    if (found && found.id) {
      console.log("found");
      if (
        window.confirm(
          `Person ${newName} already found, do you want to update the phone number?`
        )
      ) {
        const personObj = {
          name: newName,
          number: newNumber,
        };
        personService
          .updatePerson(found.id, personObj)
          .then((returnedPerson) => {
            handleNotification(
              `Person ${personObj.name} updated.`,
              "notification"
            );
          })
          .catch((error) => {
            handleNotification(
              `Could not update person's information.`,
              "notification"
            );
          });
        updatePersonList();
      }
    } else {
      const personObj = {
        name: newName,
        number: newNumber,
      };

      personService.createPerson(personObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        // Let's empty the input fields for name and number
        setNewName("");
        setNewNumber("");
        handleNotification(`${returnedPerson.name} was added!`, "notification");
      });
    }
  };

  const handleDeletePerson = (personId, personName) => {
    console.log("delete", personId);
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .deletePerson(personId)
        .then((returnedPerson) => {
          console.log(returnedPerson);
        })
        .catch((error) => {
          handleNotification(`${personName} already deleted.`, "error");
        });
      updatePersonList();
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
      {notificationMessage ? (
        <Notification
          message={notificationMessage}
          notificationType={notificationType}
        />
      ) : (
        ""
      )}
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
