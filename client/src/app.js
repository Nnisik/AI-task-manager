// Getting required functions
import {drawTaskList} from './app/task-list';
import {getTasks} from './app/utils/get-api-data';
import {createNewTask} from './app/utils/post-api-data';

// TODO: sorting by name function
// TODO: sorting by date function


export var tasks;

// Initializes the application once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    getTasks(); // Fetches tasks
    drawTaskList(tasks); // Displays tasks on page load

    // Opens the "Add Task" modal
    document.getElementById("add-task-btn").addEventListener("click", () => {
        document.getElementById("add-task").style.display = "flex";
    });

    // Handles the "New Task" form submission
    document.getElementById("new-task__btn").onclick = () => {
        createNewTask();
    }

    // Closes modals when the close button is clicked
    document.querySelectorAll(".close-button").forEach((button) => {
        button.onclick = () => {
            document.querySelectorAll(".modal").forEach((modal) => {
                modal.style.display = "none";
            });
        }
    });

    // Opens the "Edit Task" modal
    document.querySelectorAll(".edit-btn").forEach((button) => {
        button.onclick = () => {
            document.getElementById("task-update").style.display = "flex";
        }
    });

    // Deletes a task when the delete button is clicked
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.onclick = () => {
            deleteTask();
        }
    })

    // Updates a task when the update button is clicked
    document.getElementById("task-update__btn").onclick = () => {
        updateTask();
    }

    console.log("Building something that's not sucks ✨");
});