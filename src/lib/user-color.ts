const COLORS = [
    "#d93025",
    "#1a73e8",
    "#188038",
    "#e37400",
    "#9334e6",
    "#007b83",
    "#c5221f",
    "#1967d2",
];

export function colorForUser(id: string) {
    let hash = 0;

    for (const char of id) {
        hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    }

    return COLORS[hash % COLORS.length];
}
