import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
			console.log("data", response.data);
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
			axios
				.post("http://localhost:3001/persons", personObject)
				.then((response) => {
					setPersons(persons.concat(personObject));
					setNewName("");
					setNewNumber("");
				});
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
