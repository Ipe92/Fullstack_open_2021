import React from "react";

const Total = (props) => {
  const total = props.course.parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <div>
      <p>Total number of exercises {total}</p>
    </div>
  );
};

export default Total;
