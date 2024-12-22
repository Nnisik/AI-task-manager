import {createNewTask} from "./api";
import {TaskService} from "../app/services/task.service";

// TODO: get info about current user
export function addTask() {
    const newTask = new TaskService(document.getElementById("new-task__form__content").value)
    createNewTask(newTask);
}