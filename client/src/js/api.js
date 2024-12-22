// TODO: remove all api functions here
// TODO: set up Webpack
import drawTaskList, {clearTaskList} from "./ui";

// Creates a new task and sends it to the server via a POST request
export function createNewTask() {
    let taskContent = document.getElementById("new-task__form__content").value;

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
            clearTaskList(); // Clears the current task list on the UI
            drawTaskList(json) // Redraws the task list with updated data
        })
}

export function updateTaskList(taskId, method, body=null) {
    // Sending a request to the server
    fetch(`http://127.0.0.1:5000/api/tasks/${taskId}`, {
        method: method,
        body: body ? JSON.stringify(body) : null
    })
        .then((response) => response.json() // Parses the JSON response
        )
        .then((json) => {
            clearTaskList(); // Clears the current task list on the UI
            drawTaskList(json) // Redraws the task list with updated data
        })
}

export function deleteTask(taskId) {
    updateTaskList(taskId, "DELETE");
}

export function updateTask(taskId) {
    let taskContent = document.getElementById("task-update__form__content").value;
    updateTaskList(taskId, "PUT", {
        content: taskContent
    });
}

