import { useState, useEffect } from "react";
import formatTime from "../helpers/formatTime";

function TimeWorked(props) {
    const [currentTime, setCurrentTime] = useState(Date.now());

    const current_timer_state = props.current_timer_state;
    const started_at = props.started_at;
    const accumulated_time = props.accumulated_time;

    useEffect(() => {
        if (current_timer_state !== "Running") {
            return;
        }

        setCurrentTime(Date.now());

        const intervalId = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [current_timer_state, started_at]);

    const displayedTimeWorked =
        current_timer_state === "Running" && started_at != null
            ? accumulated_time + Math.max(0, currentTime - started_at)
            : accumulated_time;
    return (
        <div>{formatTime(displayedTimeWorked)}</div>
    );
}

export default TimeWorked;