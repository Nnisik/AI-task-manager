import {clearTaskList, drawGroupedTasks, drawTaskList} from "./js/gallery";
import {closeModal, showModal} from "./js/ui";
import {createNewTask} from "./js/new-task";

window.onload = () => {
    drawTaskList();
}

document.querySelectorAll(".group-item").forEach(item => {
    item.addEventListener("click", () => {
        clearTaskList();
    })
})

document.getElementById("items-all").addEventListener("click", () => {
    drawTaskList()
});

document.getElementById("items-personal").addEventListener("click", () => {
    drawGroupedTasks("personal");
});

document.getElementById("items-work").addEventListener("click", () => {
    drawGroupedTasks("work");
});

document.getElementById("items-study").addEventListener("click", () => {
    drawGroupedTasks("study");
});

document.getElementById("items-other").addEventListener("click", () => {
    drawGroupedTasks("other");
});

document.getElementById("add-task-btn").addEventListener("click", () => {
    showModal("add-task");
});

document.getElementById("close-add").addEventListener("click", () => {
    closeModal("add-task");
});

document.getElementById("new-task__btn").addEventListener("click", () => {
    const newTask = document.getElementById("new-task__form__content").value;
    createNewTask(newTask);
    closeModal("add-task");
});