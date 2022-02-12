import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <>
      <p>
        {props.course.parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </p>
    </>
  );
};

export default Content;
