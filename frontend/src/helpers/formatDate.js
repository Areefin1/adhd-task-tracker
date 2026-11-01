function formatDate(timestamp) {
    if (timestamp == null) return "—";

    return new Date(timestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

export default formatDate;