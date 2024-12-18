// Constants
var tasks;
var taskNeedToUpdate;

// TODO: groups buttons
// TODO: progress buttons
// TODO: double tap on task to complete it

// Clears the displayed task list by emptying the task list container
function clearTaskList() {
    document.getElementById("tasks-list").innerHTML = "";
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

// Draws the list of tasks in the UI
function drawTaskList(){
    let tasks;
    fetch("http://127.0.0.1:5000/api/tasks/")
        .then(res => res.json())
        .then(tasks => {
            clearTaskList(); // Ensure the task list is cleared before rendering
            if (!tasks) {
                // Displays a message indicating that there are no tasks
                const emptyListMessage = document.createElement("p");
                emptyListMessage.classList.add("no-tasks-message");
                emptyListMessage.innerText = "Looks like there is no tasks you need to do. Time to make plans for future.";
                document.querySelector("#tasks-list").appendChild(emptyListMessage);
                return;
            }

            // Iterates over tasks and creates task elements
            tasks.forEach((task) => {
                // Container for a single task
                const taskContainer = document.createElement("div");
                taskContainer.classList.add("task", "flex");

                // Task info section
                const taskInfo = document.createElement("div");
                taskInfo.classList.add("task__info");

                // Task title
                const taskTitle = document.createElement("h3");
                taskTitle.innerText = capitalizeFirstLetter(task.content);
                taskTitle.classList.add("task__title");
                taskInfo.appendChild(taskTitle);

                // Task group and status
                const taskGroups = document.createElement("div");
                taskGroups.classList.add("task__groups");

                // Group
                const group = document.createElement("p");
                group.innerText = task.group;
                group.classList.add("group");
                taskGroups.appendChild(group);

                // Status
                const status = document.createElement("select");
                status.classList.add("group", "task-status");
                status.innerHTML = "<option value=0>Not started</option><option value=1>In progress</option><option value=2>Done</option>";
                taskGroups.appendChild(status);
                taskInfo.appendChild(taskGroups);

                // Task date
                const taskDate = document.createElement("p");
                taskDate.innerText = task.date.year + "/" + task.date.month + "/" + task.date.day;
                taskDate.classList.add("task__date");
                taskInfo.appendChild(taskDate);
                taskContainer.appendChild(taskInfo);

                // Task options
                const taskOptionsContainer = document.createElement("div");
                taskOptionsContainer.classList.add("task__options");

                // Edit button
                const editButton = document.createElement("button");
                editButton.classList.add("task__button", "edit-btn", "no-outline-no-border");
                editButton.setAttribute("data-id", task.id);
                editButton.setAttribute("aria-label", "Edit task");
                const editIcon = document.createElement("img");
                editIcon.classList.add("task__icon");
                editIcon.setAttribute("src", "src/icons/edit-tools.png");
                editIcon.setAttribute("alt", "edit");
                editButton.appendChild(editIcon);
                taskOptionsContainer.appendChild(editButton);
                // Delete button
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("task__button", "delete-btn", "no-outline-no-border");
                deleteButton.setAttribute("data-id", task.id);
                deleteButton.setAttribute("aria-label", "Delete task");
                const deleteIcon = document.createElement("img");
                deleteIcon.classList.add("task__icon");
                deleteIcon.setAttribute("src", "src/icons/loschen.png");
                deleteIcon.setAttribute("alt", "delete");
                deleteButton.appendChild(deleteIcon);
                taskOptionsContainer.appendChild(deleteButton);

                taskContainer.appendChild(taskOptionsContainer);
                document.querySelector("#tasks-list").append(taskContainer);
            });
        })
        .catch(err => console.log(err));
}

// Fetches tasks from the API and returns them
function getTasks() {
    fetch("http://127.0.0.1:5000/api/tasks/")
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => console.log(err));
}

// Creates a new task and sends it to the server via a POST request
function createNewTask() {
    let taskContent = document.getElementById("new-task__form__content").value;

    // Getting and formatting the current date and time as "YYYY-MM-DD HH:MM:SS"
    const now = new Date();
    let formatedDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

    // Sending a POST request to the server with the new task's content and creation date
    fetch("http://127.0.0.1:5000/api/tasks/", {
        method: "POST",
        body: JSON.stringify({
            content: taskContent,
            date: formatedDate
        })
    })
        .then((response) => response.json() // Parses the JSON response
        )
        .then((json) => {
            clearTaskList(); // Clears the current task list on the UI
            drawTaskList(json) // Redraws the task list with updated data
        })
}

function updateTaskList(taskId, method, body=null) {
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

// TODO: test function
function deleteTask(taskId) {
    updateTaskList(taskId, "DELETE");
}

// TODO: test function
function updateTask(taskId) {
    let taskContent = document.getElementById("task-update__form__content").value;
    updateTaskList(taskId, "PUT", {
        content: taskContent
    });
}

// TODO: sorting by name function
function sortTasksByName(tasks) {
    return tasks.sort((a, b) => {
        a.content.localeCompare(b.content);
    })
}

// TODO: sorting by date function
function sortTasksByDate(tasks) {
    return tasks.sort((a, b) => {
        a.date.localeCompare(b.date);
    })
}

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
        drawTaskList(tasks);
    }

    document.getElementById("by-date-sort").onclick = () => {
        sortTasksByDate(tasks);
        drawTaskList(tasks);
    }

    console.log("Building something that's not sucks ✨");
});