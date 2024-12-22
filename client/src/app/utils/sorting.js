import {getTasks} from "../../js/api";
import {TaskListService} from "../services/task-list.service";
import {taskList} from "../../index";
import drawTaskList from "../../js/ui";

export function sortTasksByName() {
    const newTaskList = new TaskListService();
    getTasks(newTaskList)
    // TODO: sorting for elements in task list by name
    /*
    return tasks.sort((a, b) => {
        a.content.localeCompare(b.content);
    })
    */
    taskList.tasks = newTaskList.tasks;
    drawTaskList();
}

// TODO: sorting for elements in task list by date
export function sortTasksByDate(tasks) {
    return tasks.sort((a, b) => {
        a.date.localeCompare(b.date);
    })
}

// TODO: sorting for elements in task list by group
// TODO: sorting for elements in task list by status
