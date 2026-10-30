
function TaskForm(props)
{
    return (
    <>
    <form onSubmit={props.addTask}>
      <div className="form-container">
              <label> 
                <span>Title:</span> 
                <input 
                type='text' 
                placeholder='Add task title...' 
                name='title' value={props.title} 
                onChange={props.onChange}
                className="bg-teal-950 text-white placeholder:text-gray-400 border border-teal-700 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </label>
              <label> 
                <span>Description:</span> 
                <input 
                type='text' 
                placeholder='Add task description...' 
                name='description' 
                value={props.description} 
                onChange={props.onChange}
                className="bg-teal-950 text-white placeholder:text-gray-400 border border-teal-700 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </label>
              <button type="submit" className="item bg-teal-600 hover:bg-teal-500 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors">Add Task</button>
        </div>
    </form>
    </>
  )
}

export default TaskForm;