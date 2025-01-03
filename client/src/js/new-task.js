import {clearTaskList, drawTaskList} from "./gallery";

// Creates a new task and sends it to the server via a POST request
export function createNewTask(taskContent) {
    // Sending a POST request to the server with the new task's content and creation date
    fetch("http://127.0.0.1:5000/api/tasks/", {
        method: "POST",
        body: JSON.stringify({
            content: taskContent,
        })
    })
        .then((response) => response.json() // Parses the JSON response
        )
        .then((json) => {
            console.log(json);
            clearTaskList(); // Clears the current task list on the UI
            drawTaskList(json) // Redraws the task list with updated data
        })
}