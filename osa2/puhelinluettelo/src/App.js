import React, { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
	const [newName, setNewName] = useState("");

	const addPerson = (event) => {
		event.preventDefault();
		console.log("persons", persons);

		const personObject = {
			name: newName,
			id: persons.length + 1,
		};
		console.log("personObject", personObject);

		if (persons.some((nimi) => nimi.name === newName)) {
			window.alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat(personObject));
			setNewName("");
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => {
				return <div key={person.id}>{person.name}</div>;
			})}
		</div>
	);
};

export default App;