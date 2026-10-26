
function TaskControl(props)
{
    const display_control = {
        "Not Active": ["Start"],
        "Running": ["Pause", "Finish"],
        "Paused": ["Resume", "Finish"],
        "Completed": []
    }
    const button_to_state = {
        "Pause": "Paused",
        "Resume": "Running",
        "Finish": "Completed",
        "Start": "Running"
    }

    const buttons = display_control[props.current_state];
    return (
        <div>
            {
                buttons.map((button) => {
                    return (
                        <input 
                        key={button} 
                        type="button" 
                        value={button} 
                        onClick={() => props.onTransition(props.id, button_to_state[button])}
                        />
                    )
                })
            }
        </div>
    )
}

export default TaskControl;