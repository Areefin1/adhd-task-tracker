
function TaskForm(props)
{
    return (
    <>
          <form>
              <label> Title: </label>
              <input type='text' placeholder='Add task title...' name='title' value={props.title} onChange={props.onChange}/>
              <label> Description </label>
              <input type='text' placeholder='Add task description...' name='description' value={props.description} onChange={props.onChange}/>

              <label> Status: </label>
              <select name='status' value={props.status} onChange={props.onChange}>
                <option value="">--Please choose an option--</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button onClick={props.addTask}>Add Task</button>
          </form>
    </>
  )
}

export default TaskForm;