import Task from './Task'
import formatTime from '../helpers/formatTime';
import formatDate from '../helpers/formatDate';

function TaskHistoryTab(props)
{
    return (
        <>
            <div className="heading heading-history">
                <h2>Title</h2>
                <h2>Description</h2>
                <h2>Status</h2>
                <h2>Time Worked</h2>
                <h2>Last Session</h2>
                <h2>Created At</h2>
                <h2>Completed At</h2>
                <h2>Actions</h2>
            </div>
            {props.completedTasks.map((task) => (
                    <div key={task.id} className="task-row task-row-history">
                        <Task 
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        status={"Completed"}
                        />
                        <span>{formatTime(task.accumulated_time)}</span>
                        <span>{formatTime(task.accumulated_time - task.session_baseline)}</span>
                        <span>{formatDate(task.created_at)}</span>
                        <span>{formatDate(task.finished_at)}</span>
                        <div className='actions'>
                            <input 
                            type="button"
                            value={"Delete"}
                            onClick={() => props.handleDelete(task.id)}
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold px-2 py-1 rounded-lg cursor-pointer transition-colors"
                            />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default TaskHistoryTab;