// Getting required functions
import {tasks} from "../../app";

// Fetches tasks from the API and returns them
export function getTasks() {
    try {
        // Fetch tasks from the server
        fetch("http://127.0.0.1:5000/api/tasks/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then((json) => {
                tasks = json; // Stores the retrieved tasks
            })
        return tasks;
    } catch (error) {
        // Logs errors during the fetch or processing
        console.error("Error fetching posts:", error);
    }
}