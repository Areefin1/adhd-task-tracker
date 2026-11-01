import { useState, useEffect } from "react";
import formatTime from "../helpers/formatTime";

function CurrentSession(props) {
    const [currentTime, setCurrentTime] = useState(Date.now());

    const current_timer_state = props.current_timer_state;
    const started_at = props.started_at;
    const accumulated_time = props.accumulated_time;
    const minimum_break_threshold = props.minimum_break_threshold;
    const sessionBaseline = props.sessionBaseline;
    const paused_at = props.paused_at;

    useEffect(() => {
        if (current_timer_state !== "Running" && current_timer_state !== "Paused") {
            return;
        }

        setCurrentTime(Date.now());

        const intervalId = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };

    }, [current_timer_state, started_at, paused_at]);

    let displayedCurrentSession;

    if (current_timer_state === "Running" && started_at != null) {
        displayedCurrentSession =
            accumulated_time
            + Math.max(0, currentTime - started_at)
            - sessionBaseline;
    }
    else {
        displayedCurrentSession = accumulated_time - sessionBaseline;
    }

    displayedCurrentSession = Math.max(0, displayedCurrentSession);

    if (current_timer_state === "Paused" && paused_at != null) {
        if (currentTime - paused_at >= minimum_break_threshold) {
            displayedCurrentSession = 0;
        }
    }

    return (
        <div>{formatTime(displayedCurrentSession)}</div>
    );
}

export default CurrentSession;