import React from "react";

const Persons = (props) => {
	return (
		<div>
			{props.persons
				.filter((suodatin) =>
					suodatin.name
						.toLowerCase()
						.includes(props.filter.toLowerCase()),
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

export default Persons;
