import React from "react";

const Filter = (props) => {
	return (
		<form>
			<div>
				filter shown with
				<input
					type="text"
					name="name"
					onChange={(e) => props.handleFilter(e.target.value)}
				/>
			</div>
		</form>
	);
};

export default Filter;
