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

    const personObj = {
      name: newName,
      number: newNumber,
    };
    personService
      .createPerson(personObj)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        handleNotification(
          `Added ${returnedPerson.name} to phonebook`,
          "notification"
        );
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error.response.data.error);
        handleNotification(`${error.response.data.error}`, "error");
      });
  };

  const handleDeletePerson = (personId, personName) => {
    console.log("delete", personId);
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .deletePerson(personId)
        .then((returnedPerson) => {
          console.log(returnedPerson);
          handleNotification(`${personName} deleted.`, "notification");
          updatePersonList();
        })
        .catch((error) => {
          handleNotification(`${personName} already deleted.`, "error");
        });
    }
  };

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
