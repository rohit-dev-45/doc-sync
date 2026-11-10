export function formatDocumentDate(iso: string) {
    const date = new Date(iso);
    const now = new Date();
    const sameDay =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

    if (sameDay) {
        return `Opened ${date.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
        })}`;
    }

    return `Opened ${date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
    })}`;
}
