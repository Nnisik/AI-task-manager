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

// Displays a message indicating that there are no tasks
function drawEmptyListMessage() {
    const emptyListMessage = document.createElement("p");
    emptyListMessage.classList.add("no-tasks-message");
    emptyListMessage.innerText = "Looks like there is no tasks you need to do. Time to make plans for future.";
    document.querySelector("#tasks-list").appendChild(emptyListMessage);
}

// Section containing task details (content and creation date)
function drawTaskInfoSection(content, status, group, priority, date) {
    const container = document.createElement("div");
    container.classList.add("task__info");

    // Task content (title)
    // TODO: modify subclass style base on priority value
    const header = document.createElement("h3");
    container.classList.add("task__title");
    header.innerText = content;
    container.appendChild(header);

    // TODO: Grouping sections
    const groupSection = drawTaskGroups(status, group);
    container.appendChild(groupSection);

    // Task creation date
    // FIXME: Adjust date format to "day/month"
    const creationDate = document.createElement("p");
    creationDate.innerText = date;
    container.appendChild(creationDate);

    return container;
}

function drawTaskGroups(status, group) {
    const groupSection = document.createElement("div");
    groupSection.classList.add("task__groups");

    // group
    const groupElement = document.createElement("p");
    groupElement.classList.add("group");
    groupElement.innerText = group;
    groupSection.appendChild(groupElement);

    // TODO: status
    const statusElement = document.createElement("select");
    statusElement.classList.add("group", "task-status");
    // TODO: add options and option select
    statusElement.innerText = status;
    groupSection.appendChild(statusElement);

    return groupSection;
}

// Edit button
function drawEditButton(id) {
    const button = document.createElement("button");
    button.classList.add("task__button", "edit-btn", "no-outline-no-borders");
    button.setAttribute("data-id", id)
    const img = document.createElement("img");
    img.src = "./src/icons/edit-tools.png";
    button.appendChild(img);

    return button;
}

// Delete button
function drawDeleteButton(id) {
    const button = document.createElement("button");
    button.classList.add("task__button, delete-btn", " no-outline-no-borders");
    button.setAttribute("data-id", id)
    const img = document.createElement("img");
    img.src = "./src/icons/loschen.png";
    button.appendChild(img);

    return button;

}

// Section for task action buttons (edit and delete)
function drawTaskOptionsSection(id) {
    // Section for task action buttons (edit and delete)
    const options = document.createElement("div");
    options.classList.add("task__options");

    // Edit button
    const editButton = drawEditButton(id);

    // Delete button
    const deleteButton = drawDeleteButton(id);

    options.append(editButton, deleteButton);
    return options;
}

// Draws the list of tasks in the UI
function drawTaskList(tasks){
    /*
    clearTaskList(); // Ensure the task list is cleared before rendering
    if (!tasks || tasks.length === 0) {
        drawEmptyListMessage();
        return;
    }
    */

    // Iterates over tasks and creates task elements
    // FIXME: remake for new styling
    tasks.forEach((task) => {
        // Container for a single task
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task", "flex");

        // Section containing task details (content and creation date)
        const taskInfo = drawTaskInfoSection(task["content"]);
        taskContainer.append(taskInfo);

        // Section for task action buttons (edit and delete)
        const taskOptions = drawTaskOptionsSection();

        taskContainer.append(taskOptions);
        document.querySelector("#tasks-list").append(taskContainer);
    });
}

// Fetches tasks from the API and returns them
async function getTasks() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/tasks/");
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        tasks = await response.json();
        return tasks;
    } catch (error) {
        // Logs errors during the fetch or processing
        console.error("Error fetching posts:", error);
    }
}

// Creates a new task and sends it to the server via a POST request
function createNewTask() {
    let taskContent = document.getElementById("new-task__form__content").value;

    // Getting and formatting the current date and time as "YYYY-MM-DD HH:MM:SS"
    const now = new Date();

    // Sending a POST request to the server with the new task's content and creation date
    fetch("http://127.0.0.1:5000/api/tasks/", {
        method: "POST",
        body: JSON.stringify({
            content: taskContent
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
document.addEventListener("DOMContentLoaded", async () => {
    await getTasks(); // Fetches tasks
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