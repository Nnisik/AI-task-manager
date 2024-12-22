import {TaskService} from "../app/services/task.service";
import {updateTask, updateTaskList} from "./api";
import {taskNeedToUpdate} from "../index";

export function editTaskContent() {
    const task = new TaskService(document.getElementById("new-task__form__content").value)
    updateTaskList(taskNeedToUpdate, "PUT", {content: task.getContent()});
}

export function editTaskStatus(id) {
    console.log(id)
    const newStatus = document.getElementById("new-task__form__status").value;
    updateTask(id, newStatus)
}