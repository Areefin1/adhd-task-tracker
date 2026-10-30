import { useState, useEffect } from "react";

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

    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return (
        <div>{formatTime(displayedTimeWorked)}</div>
    );
}

export default TimeWorked;