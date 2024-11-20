// TODO: api connection and drawing all currently stored in database tasks
// FIXME: returns error in console; in server shows BAD-REQUEST
// TODO: separate different object elements creation into different folders
function getTasks() {
    try {
        // Fetch the post data from the JSON file
        fetch("https://localhost:5000/api/get-tasks")
            .then((response) => {
                // Check if the response is successful (status 200)
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                // Parse the JSON response
                return response.json();
            })
            .then((json) => {
                // If the gallery element exists, append the posts
                if (document.querySelector("#tasks-list")) {
                    // Iterate over and append the corresponding post element to the fragment
                    json.forEach((task) => {
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
                        const taskCreationDate = document.createElement("p");
                        taskCreationDate.innerText = task["data_created"];
                        taskInfo.appendChild(taskCreationDate);
                        taskContainer.append(taskInfo);

                        // task buttons sections
                        const taskOptions = document.createElement("div");
                        taskOptions.classList.add("task__options");
                        // task edit button
                        const editButton = document.createElement("a");
                        editButton.classList.add("task__button");
                        editButton.href = `http://localhost:5000/api/update/${task["id"]}`;
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
                        // task delete button
                        taskOptions.append(editButton);
                        taskOptions.append(deleteButton);
                        taskContainer.append(taskOptions);

                        document.querySelector("#tasks-list").append(taskContainer);
                    });
                }
            })

    } catch (error) {
        // Log any errors that occur during the fetch or rendering process
        console.error("Error fetching posts:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getTasks();
    console.log("Building something that is not sucks ✨");
});