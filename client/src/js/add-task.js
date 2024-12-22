import {createNewTask} from "./api";
import {TaskService} from "../app/services/task.service";

export function addTask() {
    const newTask = new TaskService(document.getElementById("new-task__form__content").value)
    createNewTask(newTask);
}