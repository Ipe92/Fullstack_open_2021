import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes";

const App = (props) => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showAll, setshowAll] = useState(false);

	useEffect(() => {
		noteServices.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			import: Math.random() > 0.5,
		};

		noteServices.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote("");
		});
	};

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteServices
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(
					notes.map((note) => (note.id !== id ? note : returnedNote)),
				);
			})
			.catch((error) => {
				alert(
					`the note "${note.content}" was already deleted from server`,
				);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const handleNoteChange = (event) => {
		console.log(event.target.value);
		setNewNote(event.target.value);
	};

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setshowAll(!showAll)}>
					show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type="submit">save</button>
			</form>
		</div>
	);
};

export default App;
