
function TaskForm(props)
{
    return (
    <>
    <form onSubmit={props.addTask}>
      <div className="form-container">
              <label> <span>Title:</span> <input type='text' placeholder='Add task title...' name='title' value={props.title} onChange={props.onChange}/></label>
              
              <label> <span>Description:</span> <input type='text' placeholder='Add task description...' name='description' value={props.description} onChange={props.onChange}/></label>

              <label> 
                <span>Status:</span>               
                <select name='status' value={props.status} onChange={props.onChange}>
                <option value="">--Please choose an option--</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              </label>
              <button type="submit" className="item">Add Task</button>
        </div>
    </form>
    </>
  )
}

export default TaskForm;