import React from "react";

const AddPerson = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name:
        <input
          type="text"
          name="name"
          value={props.newName}
          onChange={(e) => props.handleNameChange(e.target.value)}
        />
      </div>
      <div>
        number:
        <input
          type="text"
          name="number"
          value={props.newNumber}
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
