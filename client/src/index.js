import drawTaskList from "./js/ui";
import {createNewTask, deleteTask, updateTask} from "./js/api";
import {sortTasksByDate, sortTasksByName} from "./app/utils/sorting";

let tasks;
let taskNeedToUpdate;

// Initializes the application once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    drawTaskList(); // Displays tasks on page load

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
        taskNeedToUpdate = button.getAttribute("data-id");
        button.onclick = () => {
            document.getElementById("task-update").style.display = "flex";
        }
    });

    // Deletes a task when the delete button is clicked
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.onclick = () => {
            deleteTask(button.getAttribute("data-id"));
        }
    })

    // Updates a task when the update button is clicked
    document.getElementById("task-update__btn").onclick = () => {
        updateTask(taskNeedToUpdate);
    }

    document.getElementById("by-name-sort").onclick = () => {
        sortTasksByName(tasks);
    }

    document.getElementById("by-date-sort").onclick = () => {
        sortTasksByDate(tasks);
    }

    console.log("Building something that's not sucks ✨");
});