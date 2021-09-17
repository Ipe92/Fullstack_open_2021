import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

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

		const personObject = {
			name: newName,
			id: persons.length + 1,
			number: newNumber,
		};

		if (persons.some((nimi) => nimi.name === newName)) {
			window.alert(`${newName} is already added to phonebook`);
		} else {
			personService.create(personObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
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
				.then(setPersons(persons.filter((person) => person.id !== id)));
		} else {
			console.log("Do nothing");
		}
	};

	const handleNameChange = (newName) => {
		setNewName(newName);
	};

	const handleNumberChange = (newNumber) => {
		setNewNumber(newNumber);
	};

	const handleFilter = (newFilter) => {
		setFilter(newFilter);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filter} handleFilter={handleFilter} />
			<h2>add a new</h2>
			<AddPerson
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<h2>numbers</h2>
			<Persons
				persons={persons}
				filter={filter}
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;
