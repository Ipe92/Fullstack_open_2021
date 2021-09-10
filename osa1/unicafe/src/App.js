import React, { useState } from "react";

const Button = ({ handleClick, text }) => <button onClick={handleClick}> {text} </button>;

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                <h1>statistics</h1>
                No feedback given
            </div>
        );
    }
    return (
        <div>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {good + bad + neutral}</p>
            <p>average {(good - bad) / (good + neutral + bad)}</p>
            <p>positive {(good / (good + neutral + bad)) * 100} %</p>
        </div>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => {
        setGood(good + 1);
    };

    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    };

    const handleBadClick = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <div>
                <h1>give feedback</h1>
                <Button handleClick={handleGoodClick} text="good" />
                <Button handleClick={handleNeutralClick} text="neutral" />
                <Button handleClick={handleBadClick} text="bad" />
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
        </div>
    );
};

export default App;