
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

    const buttonStyles = {
    Start: "bg-green-600 hover:bg-green-500 text-white",
    Resume: "bg-green-600 hover:bg-green-500 text-white",
    Pause: "bg-amber-500 hover:bg-amber-400 text-gray-950",
    Finish: "bg-purple-600 hover:bg-purple-500 text-white"
};

    const buttons = display_control[props.current_state];
    return (
        <div className="flex gap-1">
            {
                buttons.map((button) => {
                    return (
                        <input 
                        key={button} 
                        type="button" 
                        value={button} 
                        onClick={() => props.onTransition(props.id, button_to_state[button])}
                        className={`${buttonStyles[button]} font-semibold px-2 py-1 rounded-lg cursor-pointer transition-colors`}
                        />
                    )
                })
            }
        </div>
    )
}

export default TaskControl;