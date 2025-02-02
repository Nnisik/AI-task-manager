import {clearTaskList, drawGroupedTasks, drawTaskList} from "./js/gallery";
import {closeModal, displayLogInMessage, lockUI, showModal} from "./js/ui";
import {createNewTask} from "./js/new-task";
import {w3_close, w3_open} from "./js/mobile";
// import {checkActiveUser} from "./js/user";


const queryString = window.location.search;
export const urlParams = new URLSearchParams(queryString);

window.onload = () => {
    drawTaskList();
    // document.getElementById(checkActiveUser()).style.display = "none";
    if (!urlParams.has("id")) {
        lockUI();
        displayLogInMessage();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 1000) {
        document.getElementById("open-side-bar-btn").style.display = "none";
    }
    else {
        document.getElementById("open-side-bar-btn").style.display = "block";
        w3_close();
    }
});

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

document.getElementById("sign-in-btn").addEventListener("click", () => {});

document.getElementById("open-side-bar-btn").addEventListener("click", () => {
    if (document.getElementById("open-side-bar-btn").classList.contains("normal")) {
        document.getElementById("open-side-bar-btn").innerText = "<";
        w3_open();
    }
    else {
        document.getElementById("open-side-bar-btn").innerText = ">";
        w3_close();
    }
    document.getElementById("open-side-bar-btn").classList.toggle("normal")
    document.getElementById("open-side-bar-btn").classList.toggle("normal")
})