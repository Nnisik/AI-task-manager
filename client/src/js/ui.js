// Display modal window by its ID
export function showModal(id) {
    document.getElementById(id).style.display = "flex";
}

// Hide modal element by its ID
export function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

export function lockUI() {
    document.getElementById("add-task-btn").disabled = true;
}

export function displayLogInMessage() {
    document.getElementById("tasks-list").innerText = "To view and create new task log in."
}