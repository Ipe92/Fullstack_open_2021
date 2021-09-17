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
						<div key={person.name}>
							{person.name} {person.number}
							<button
								name={person.name}
								onClick={(event) =>
									props.deletePerson(
										event,
										person.id,
										person.name,
									)
								}
							>
								delete
							</button>
						</div>
					);
				})}
		</div>
	);
};

export default Persons;
