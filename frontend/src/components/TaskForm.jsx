
function TaskForm(props)
{
    return (
    <>
    <form onSubmit={props.addTask}>
      <div className="form-container">
              <label> <span>Title:</span> <input type='text' placeholder='Add task title...' name='title' value={props.title} onChange={props.onChange}/></label>
              <label> <span>Description:</span> <input type='text' placeholder='Add task description...' name='description' value={props.description} onChange={props.onChange}/></label>
              <button type="submit" className="item">Add Task</button>
        </div>
    </form>
    </>
  )
}

export default TaskForm;