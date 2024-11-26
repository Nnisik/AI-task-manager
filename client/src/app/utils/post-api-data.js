// Getting required functions
import {clearTaskList} from "../clear-task-list";
import {drawTaskList} from "../task-list";


// Creates a new task and sends it to the server via a POST request
export function createNewTask() {
    let taskContent = document.getElementById("new-task__form__content").value;

    // Getting and formatting the current date and time as "YYYY-MM-DD HH:MM:SS"
    const now = new Date();
    let taskDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    // Sending a POST request to the server with the new task's content and creation date
    fetch("http://127.0.0.1:5000/api/tasks/", {
        method: "POST",
        body: JSON.stringify({
            content: taskContent,
            date: taskDate
        })
    })
        .then((response) => response.json() // Parses the JSON response
        )
        .then((json) => {
            clearTaskList(); // Clears the current task list on the UI
            drawTaskList(json) // Redraws the task list with updated data
        })
}

