import {drawGroupedTasks, drawTaskList} from "./gallery";

export function w3_open() {
    document.querySelector(".w3-sidebar").style.width = "50%";
    document.querySelector(".w3-sidebar").style.display = "block";
}

export function w3_close() {
    document.querySelector(".w3-sidebar").style.display = "none";
}

document.getElementById("all").addEventListener("click", () => {
    drawTaskList()
});

document.getElementById("personal").addEventListener("click", () => {
    drawGroupedTasks("personal");
});

document.getElementById("work").addEventListener("click", () => {
    drawGroupedTasks("work");
});

document.getElementById("study").addEventListener("click", () => {
    drawGroupedTasks("study");
});

document.getElementById("other").addEventListener("click", () => {
    drawGroupedTasks("other");
});
