import React, { useState } from "react";

const App = (props) => {
  const MostVotes = (props) => {
    return (
      <div>
        {
          props.anecdotes[
            props.points.reduce(
              (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
              0
            )
          ]
        }
        <p>has {Math.max(...props.points)} votes</p>
      </div>
    );
  };

  const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>;
  };

  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0)
  );

  const handleRandomClick = (props) => {
    const rnd = Math.floor(Math.random() * Math.floor(6));

    console.log("random: ", rnd);
    setSelected(rnd);
  };

  const handleVoteClick = (props) => {
    const copy = [...points];
    copy[props.selected] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>

      <div>
        <Button handleClick={() => handleVoteClick({ selected })} text="vote" />
        <Button handleClick={() => handleRandomClick()} text="next anecdote" />
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        <MostVotes anecdotes={anecdotes} points={points} />
      </div>
    </div>
  );
};

export default App;
