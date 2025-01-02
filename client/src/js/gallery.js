// Task title
import {capitalizeFirstLetter} from "./utils/capitelize-first-letter";

function drawTask(task) {
    function drawTaskTitle(content) {
        const taskTitle = document.createElement("h3");
        taskTitle.innerText = capitalizeFirstLetter(content);
        taskTitle.classList.add("task__title");
        return taskTitle;
    }

    // Task group
    function drawTaskGroup(group) {
        const taskGroup = document.createElement("p");
        taskGroup.innerText = capitalizeFirstLetter(group);
        taskGroup.classList.add("group");
        return taskGroup;
    }

    // Task status
    function drawTaskStatus(status) {
        const taskStatus = document.createElement("select");
        taskStatus.classList.add("group", "task-status");
        taskStatus.innerHTML = "<option value=0>Not started</option><option value=1>In progress</option><option value=2>Done</option>";
        return taskStatus;
    }

    // Task date
    function drawTaskDate(date) {
        const taskDate = document.createElement("p");
        taskDate.innerText = date.year + "/" + date.month + "/" + date.day;
        taskDate.classList.add("task__date");
        return taskDate;
    }

    // Edit button
    function drawTaskButton(id, taskClass, taskLabel, taskIcon, taskIconAlt) {
        const button = document.createElement("button");
        button.classList.add("task__button", taskClass, "no-outline-no-border");
        button.setAttribute("data-id", id);
        button.setAttribute("aria-label", taskLabel);

        const icon = document.createElement("img");
        icon.classList.add("task__icon");
        icon.setAttribute("src", taskIcon);
        icon.setAttribute("alt", taskIconAlt);
        button.appendChild(icon);

        return button;
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
            "src/icons/loschen.png",
            "delete"));

        return taskOptionsContainer;
    }

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task", "flex");

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task__info");

    // Task title
    taskInfo.appendChild(drawTaskTitle(task.content));

    // Task group and status
    const taskGroups = document.createElement("div");
    taskGroups.classList.add("task__groups");

    // Group
    taskGroups.appendChild(drawTaskGroup(task.group));

    // Status
    taskGroups.appendChild(drawTaskStatus(task.status));
    taskInfo.appendChild(taskGroups);

    // Task date
    taskInfo.appendChild(drawTaskDate(task.date));

    taskContainer.appendChild(taskInfo);
    taskContainer.appendChild(drawTaskOptions(task.id));
    document.getElementById("tasks-list").appendChild(taskContainer);
}

function drawEmptyListMessage() {
    document.getElementById("tasks-list").innerText = "No tasks found";
}

export function drawTaskList() {
    fetch('http://localhost:5000/api/tasks')
        .then(response => response.json())
        .then(data => {
            if (!data) {
                drawEmptyListMessage();
                return
            }
            data.forEach(task => {
                drawTask(task);
            })
        })
        .catch(err => console.log(err));
}

export function clearTaskList() {
    document.getElementById("tasks-list").innerHTML = "";
}

export function drawGroupedTasks(group) {
    let counter = 0;
    fetch('http://localhost:5000/api/tasks')
        .then(response => response.json())
        .then(data => {
            data.forEach(task => {
                if (task.group === group) {
                    counter++;
                    drawTask(task);
                }
            })
            if (counter === 0) {
                drawEmptyListMessage();
            }
        })
        .catch(err => console.log(err));
}