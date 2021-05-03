import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const App = () => {

  return (
    <div>
      <Header course={course} />
      <Content part={part} />
      <Total exercise={exercise} />
    </div>
  )
}

export default App;

/*
 <div>
      <Header course="Half Stack application development" />
      <p>
        <Content part="Fundamentals of React" /> <Total exercise="10" />
      </p>
      <p>
        <Content part='Using props to pass data' /> <Total exercise="7" />
      </p>
      <p>
        <Content part='State of a component' /> <Total exercise="14" />
      </p>
      <p>Number of exercises {<Total exercise="10" /> + <Total exercise="7" /> + <Total exercise="14" />}</p>
    </div>
*/
