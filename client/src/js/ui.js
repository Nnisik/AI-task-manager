// Clears the displayed task list by emptying the task list container
import capitalizeFirstLetter from "../app/utils/capitalize-first-letter";
import {taskList} from "../index";

export function clearTaskList() {
    document.getElementById("tasks-list").innerHTML = "";
}

// Displays a message indicating that there are no tasks
function displayEmptyListMessage() {
    const emptyListMessage = document.createElement("p");
    emptyListMessage.classList.add("no-tasks-message");
    emptyListMessage.innerText = "Looks like there is no tasks you need to do. Time to make plans for future.";
    document.querySelector("#tasks-list").appendChild(emptyListMessage);
}

// Task title
function drawTaskTitle(title) {
    const taskTitle = document.createElement("h3");
    taskTitle.innerText = capitalizeFirstLetter(title);
    taskTitle.classList.add("task__title");
    return taskTitle;
}

// Group
function drawTaskGroup(group) {
    const taskGroup = document.createElement("p");
    taskGroup.innerText = group;
    taskGroup.classList.add("group");
    return taskGroup;
}

// Status
function drawTaskStatus() {
    const taskStatus = document.createElement("select");
    taskStatus.classList.add("group", "task-status");
    taskStatus.innerHTML = "<option value=0>Not started</option><option value=1>In progress</option><option value=2>Done</option>";
    return taskStatus;
}

function drawTaskDate(date) {
    const taskDate = document.createElement("p");
    taskDate.innerText = date.year + "/" + date.month + "/" + date.day;
    taskDate.classList.add("task__date");
    return taskDate;
}

// Task info section
function drawTaskInfo(content, group, date) {
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task__info");

    // Task title
    taskInfo.appendChild(drawTaskTitle(content));

    // Task group and status
    const taskGroups = document.createElement("div");
    taskGroups.classList.add("task__groups");

    // Group
    taskGroups.appendChild(drawTaskGroup(group));

    // Status
    taskGroups.appendChild(drawTaskStatus());
    taskInfo.appendChild(taskGroups);

    // Task date
    taskInfo.appendChild(drawTaskDate(date));

    return taskInfo;
}

// Edit button
function drawTaskButton(id, taskClass, taskLabel, taskIcon, taskIconAlt) {
    const editButton = document.createElement("button");
    editButton.classList.add("task__button", taskClass, "no-outline-no-border");
    editButton.setAttribute("data-id", id);
    editButton.setAttribute("aria-label", taskLabel);

    const editIcon = document.createElement("img");
    editIcon.classList.add("task__icon");
    editIcon.setAttribute("src", taskIcon);
    editIcon.setAttribute("alt", taskIconAlt);
    editButton.appendChild(editIcon);

    return editButton;
}

// Task options
function drawTaskOptions(id) {
    const taskOptionsContainer = document.createElement("div");
    taskOptionsContainer.classList.add("task__options");
    // Edit button
    taskOptionsContainer.appendChild(drawTaskButton(
        id,
        "edit-btn",
        "Edit task",
        "src/icons/edit-tools.png",
        "edit"));
    // Delete button
    taskOptionsContainer.appendChild(drawTaskButton(
        id,
        "delete-btn",
        "Delete task",
        "src/icons/edit-tools.png",
        "edit"));
    return taskOptionsContainer;
}

function drawTask(task) {
    // Container for a single task
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task", "flex");

    // Task info section
    taskContainer.appendChild(drawTaskInfo(task.content, task.group, task.date));

    // Task options
    taskContainer.appendChild(drawTaskOptions(task.id));
    return taskContainer;
}

// Draws the list of tasks in the UI
// TODO: separate api call
export default function drawTaskList() {
    clearTaskList(); // Ensure the task list is cleared before rendering
    if (!taskList.tasks) {
        displayEmptyListMessage();
        return;
    }

    // Iterates over tasks and creates task elements
    taskList.tasks.forEach((task) => {
        document.querySelector("#tasks-list").append(drawTask(task));
    });
}
