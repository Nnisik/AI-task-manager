import drawTaskList from "./js/ui";
import {deleteTask, updateTask} from "./js/api";
import {sortTasksByDate, sortTasksByName} from "./app/utils/sorting";
import {addTask} from "./js/add-task";
import showModal from "./app/utils/modal";

import {TaskListService} from "./app/services/task-list.service";

// global constants
export const taskList = new TaskListService();
export let taskNeedToUpdate;

// TODO: window.onload
// TODO: check for any currently logged users (COOKIES)

// Initializes the application once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    drawTaskList(); // Displays tasks on page load

    // Opens the "Add Task" modal
    document.getElementById("add-task-btn").addEventListener("click", () => {
        showModal("add-task");
    });

    // Handles the "New Task" form submission
    document.getElementById("new-task__btn").onclick = () => {
        addTask()
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
            showModal("task-update");
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
        sortTasksByName();
    }

    document.getElementById("by-date-sort").onclick = () => {
        sortTasksByDate();
    }

    console.log("Building something that's not sucks ✨");
});