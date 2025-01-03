// Display modal window by its ID
export function showModal(id) {
    document.getElementById(id).style.display = "flex";
}

// Hide modal element by its ID
export function closeModal(id) {
    document.getElementById(id).style.display = "none";
}