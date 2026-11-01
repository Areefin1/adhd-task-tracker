import Task from "./Task";
import TaskForm from "./TaskForm"
import TimeWorked from "./TimeWorked";
import CurrentSession from "./CurrentSession";
import TaskControl from "./TaskControl";


function ActiveTasksTab(props)
{
    return (
    <>
      <h2>Create a New Task</h2>
      <TaskForm
        addTask={props.handleAddTask}
        onChange={props.handleOnChange}
        title={props.task.title}
        description={props.task.description}
      />
      <div className="heading">
          <h2>Title</h2>
          <h2>Description</h2>
          <h2>Status</h2>
          <h2>Time Worked</h2>
          <h2>Current Session</h2>
          <h2>Actions</h2>
      </div>
      {props.activeTasks.map((task) => (
        <div key={task.id} className="task-row">
            <Task
            id={task.id}
            title={task.title}
            description={task.description}
            status={props.timer_status[task.timer_state ?? "Not Active"]}
            />
            <TimeWorked 
            current_timer_state={task.timer_state ?? "Not Active"}
            started_at={task.started_at}
            accumulated_time={task.accumulated_time ?? 0}
            />
            <CurrentSession 
            current_timer_state={task.timer_state ?? "Not Active"}
            started_at={task.started_at}
            accumulated_time={task.accumulated_time ?? 0}
            paused_at={task.paused_at}
            sessionBaseline={task.session_baseline}
            minimum_break_threshold={props.minimum_break_threshold}
            />
            <div className="actions">            
              <TaskControl
              id={task.id} 
              current_state={task.timer_state ?? "Not Active"}
              onTransition={props.handleTransition}
              />
              <input 
              type="button"
              value={"Delete"}
              onClick={() => props.handleDelete(task.id)}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold px-2 py-1 rounded-lg cursor-pointer transition-colors"
              />
            </div>
        </div>
      ))}
    </>
  );
}

export default ActiveTasksTab;