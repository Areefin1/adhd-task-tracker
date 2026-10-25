import React from 'react';

function Task(props)
{
    return (
        <>
        <div className='task-row'>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
            <label>Status:
            <select name="status" value={props.status} onChange={(e) => props.onEdit(props.id, e.target.value)}>
                <option value="">--Please choose an option--</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            </label>
            <input type='button' value={"Delete"} onClick={() => props.onDelete(props.id)}/>
        </div>
        </>
    )
}

export default Task;