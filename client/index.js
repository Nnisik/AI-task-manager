// Displays a message indicating that there are no tasks
function drawEmptyListMessage() {
    const emptyListMessage = document.createElement("p");
    emptyListMessage.classList.add("no-tasks-message");
    emptyListMessage.innerText = "Looks like there is no tasks you need to do. Time to make plans for future.";
    document.querySelector("#tasks-list").appendChild(emptyListMessage);
}

// Section containing task details (content and creation date)
function drawTaskInfoSection(content, date) {
    const container = document.createElement("div");
    container.classList.add("task__info");

    // Task content (title)
    const header = document.createElement("h3");
    header.innerText = content;
    container.appendChild(header);

    // Task creation date
    // FIXME: Adjust date format to "day/month"
    const creationDate = document.createElement("p");
    creationDate.innerText = date;
    container.appendChild(creationDate);

    return container;
}

// Edit button
function drawEditButton(id) {
    const button = document.createElement("button");
    button.classList.add("task__button", "edit-btn");
    button.href = `http://localhost:5000/api/update/${id}`;
    const img = document.createElement("img");
    img.src = "./src/icons/edit-tools.png";
    button.appendChild(img);

    return button;
}

// Delete button
// TODO: Add id data property to use in delete function
function drawDeleteButton(id) {
    const button = document.createElement("button");
    button.classList.add("task__button, delete-btn");
    button.href = `http://localhost:5000/api/delete/${id}`;
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
    // If the gallery element exists, append the posts
    if (document.querySelector("#tasks-list")) return;

    if (!tasks) {
        drawEmptyListMessage() // Displays a message if no tasks are available
        return;
    }

    // Iterates over tasks and creates task elements
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
function getTasks() {
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

// Creates a new task and sends it to the server via a POST request
function createNewTask() {
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

// TODO: sorting by name function
// TODO: sorting by date function


var tasks;

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

// TODO: finish setting up Wepack