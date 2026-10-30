import React from 'react';

function Task(props)
{
    return (
        <>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
            <span>{props.status}</span>
        </>
    )
}

export default Task;