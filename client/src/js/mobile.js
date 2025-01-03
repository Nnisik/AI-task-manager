import {drawGroupedTasks, drawTaskList} from "./gallery";

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
