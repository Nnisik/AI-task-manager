import {updateTask} from "../../js/api";

export class TaskService {
    #id;
    #content;
    #status;
    #priority;
    #date;
    #group;
    // TODO: include userID property

    constructor(id, content, status, priority, date, group) {
        this.#id = id;
        this.#content = content;
        this.#status = status;
        this.#priority = priority;
        this.#date = date;
        this.#group = group;
    }

    getContent() {
        return this.#content;
    }

    setStatus(status) {
        this.#status = status;
        updateTask(this.#id, this.#status);
    }
}