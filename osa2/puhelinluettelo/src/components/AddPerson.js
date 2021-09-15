import React from "react";

const AddPerson = (props) => {
	return (
		<form onSubmit={props.addPerson}>
			<div>
				name:
				<input
					type="text"
					name="name"
					onChange={(e) => props.handleNameChange(e.target.value)}
				/>
			</div>
			<div>
				number:
				<input
					type="text"
					name="number"
					onChange={(e) => props.handleNumberChange(e.target.value)}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default AddPerson;
