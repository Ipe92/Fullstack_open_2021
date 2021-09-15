import React, { useState } from "react";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", id: 1, number: "040-123456" },
		{ name: "Ada Lovelace", id: 2, number: "39-44-5323523" },
		{ name: "Dan Abramov", id: 3, number: "12-43-234345" },
		{ name: "Mary Poppendieck", id: 4, number: "39-23-6423122" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

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
			setPersons(persons.concat(personObject));
			setNewName("");
			setNewNumber("");
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
			<Persons persons={persons} filter={filter} />
		</div>
	);
};

export default App;
