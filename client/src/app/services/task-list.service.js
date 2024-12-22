import {TaskService} from "./task.service";

export class TaskListService {
    constructor() {
        this.tasks = [];
    }

    getTasks() {
        return this.tasks;
    }

    addTask(task) {
        const taskToAdd = new TaskService(
            task.id,
            task.content,
            task.status,
            task.priority,
            task.date.year + "-" + task.date.month + "-" + task.date.day,
            task.group)
        this.tasks.push(taskToAdd);
    }

    clearTaskList() {
        this.tasks = [];
    }
}