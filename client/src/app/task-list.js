import {drawEmptyListMessage} from './empty-list-message';

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
// TODO: Refactor object creation into modular functions or separate files for better maintainability
export function drawTaskList(tasks) {
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
