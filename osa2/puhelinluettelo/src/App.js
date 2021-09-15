import React, { useState } from "react";

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
		console.log("persons", persons);

		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		console.log("personObject", personObject);

		if (persons.some((nimi) => nimi.name === newName)) {
			window.alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat(personObject));
			setNewName("");
			setNewNumber("");
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilter = (event) => {
		setFilter(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with{" "}
				<input value={filter} onChange={handleFilter} />
			</div>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number:{" "}
					<input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons
				.filter((suodatin) =>
					suodatin.name.toLowerCase().includes(filter.toLowerCase()),
				)
				.map((person) => {
					return (
						<div key={person.id}>
							{person.name} {person.number}
						</div>
					);
				})}
		</div>
	);
};

export default App;
