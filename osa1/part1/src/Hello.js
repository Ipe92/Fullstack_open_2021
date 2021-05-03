import React from 'react';

const Hello = (props) => {
    return (
        <>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </>
    )
};

export default Hello;