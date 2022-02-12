import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification.js";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      console.log("data", initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    const korvattava = persons.find((nimi) => nimi.name === newName);

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((nimi) => nimi.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      );
      personService
        .update(korvattava.id, personObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== korvattava.id ? person : returnedPerson
            )
          );

          setNewName("");
          setNewNumber("");
          setMessage(
            `Person "${korvattava.name}" phone number change on server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Person "${newName}" was already removed from server`
          );
          setPersons(persons.filter((person) => person.id !== korvattava.id));
        });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessage(`Added "${returnedPerson.name}"`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (event, id, name) => {
    event.preventDefault();
    console.log("ID joka poistetaan: ", id);

    if (window.confirm(`Delete ${name}?`)) {
      console.log("Delete");
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          setErrorMessage(`Person "${name}" was already removed from server`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });

      setMessage(`Person "${name}" removed from server`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      console.log("Perutaan poisto");
    }
  };

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const handleNameChange = (newName) => {
    setNewName(newName);
  };
  const handleNumberChange = (newNumber) => {
    setNewNumber(newNumber);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <Filter value={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <AddPerson
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
