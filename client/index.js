// TODO: sorting by name function
// TODO: sorting by date function


// draws a message of task's list is currently empty
// FIXME: writes "</br>"
function drawEmptyListMessage() {
    const emptyListMessage = document.createElement("p");
    emptyListMessage.classList.add("no-tasks-message");
    emptyListMessage.innerText = "Looks like there is no tasks you need to do. Time to make plans for future.";
    document.querySelector("#tasks-list").appendChild(emptyListMessage);
}

// TODO: separate different object elements creation into different folders
function drawTaskList(taskList) {
    // If the gallery element exists, append the posts
    if (document.querySelector("#tasks-list")) {
        // Iterate over and append the corresponding post element to the fragment
        taskList.forEach((task) => {
            // task container
            const taskContainer = document.createElement("div");
            taskContainer.classList.add("task");

            // task info section
            const taskInfo = document.createElement("div");
            taskInfo.classList.add("task__info");
            // task content
            const taskHeader = document.createElement("h3");
            taskHeader.innerText = task["content"];
            taskInfo.appendChild(taskHeader);
            // task's creation date
            // FIXME: rework returning date value from full date to "day/month"
            const taskCreationDate = document.createElement("p");
            taskCreationDate.innerText = task["date"];
            taskInfo.appendChild(taskCreationDate);
            taskContainer.append(taskInfo);

            // task buttons sections
            const taskOptions = document.createElement("div");
            taskOptions.classList.add("task__options");
            // task edit button
            const editButton = document.createElement("a");
            editButton.classList.add("task__button");editButton.href = `http://localhost:5000/api/update/${task["id"]}`;
            const editBtnImg = document.createElement("img");
            editBtnImg.src = "./src/icons/edit-tools.png";
            editButton.appendChild(editBtnImg);
            //delete button
            const deleteButton = document.createElement("a");
            deleteButton.classList.add("task__button");
            deleteButton.href = `http://localhost:5000/api/delete/${task["id"]}`;
            const deleteBtnImg = document.createElement("img");
            deleteBtnImg.src = "./src/icons/loschen.png";
            deleteButton.appendChild(deleteBtnImg);

            taskOptions.append(editButton);
            taskOptions.append(deleteButton);

            taskContainer.append(taskOptions);
            document.querySelector("#tasks-list").append(taskContainer);
        });
    }
}

// API connection and drawing all currently stored in database tasks
function getTasks() {
    try {
        // Fetch the post data from the JSON file
        fetch("http://127.0.0.1:5000/api/get_tasks")
            .then((response) => {
                // Check if the response is successful (status 200)
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                // Parse the JSON response
                return response.json();
            })
            .then((json) => {
                return json;
            })

    } catch (error) {
        // Log any errors that occur during the fetch or rendering process
        console.error("Error fetching posts:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let  taskList = getTasks();
    if (!taskList) {
        drawEmptyListMessage();
    }
    else {
        drawTaskList();
    }

    document.getElementById("add-task-btn").addEventListener("click", () => {
        document.getElementById("add-task").style.display = "flex";
    });
    console.log("Building something that's not sucks ✨");
});