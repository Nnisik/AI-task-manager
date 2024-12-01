// Displays a message indicating that there are no tasks
export default function drawEmptyListMessage() {
    const emptyListMessage = document.createElement("p");
    emptyListMessage.classList.add("no-tasks-message");
    emptyListMessage.innerText = "Looks like there is no tasks you need to do. Time to make plans for future.";
    document.querySelector("#tasks-list").appendChild(emptyListMessage);
}

// TODO: finish setting up Wepack