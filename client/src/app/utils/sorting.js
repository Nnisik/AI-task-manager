export function sortTasksByName(tasks) {
    return tasks.sort((a, b) => {
        a.content.localeCompare(b.content);
    })
}

export function sortTasksByDate(tasks) {
    return tasks.sort((a, b) => {
        a.date.localeCompare(b.date);
    })
}
