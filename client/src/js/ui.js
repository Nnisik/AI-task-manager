// Clears the displayed task list by emptying the task list container
import capitalizeFirstLetter from "../app/utils/capitalize-first-letter";

export function clearTaskList() {
    document.getElementById("tasks-list").innerHTML = "";
}

// Draws the list of tasks in the UI
// TODO: separate all createElement to own functions
// TODO: separate api call
export default function drawTaskList() {
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
