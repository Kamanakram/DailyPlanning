// Fonction pour afficher la date actuelle
function displayCurrentDate() {
    const dateDisplay = document.getElementById('current-date');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString(undefined, options);
}

function loadProgress(side) {
    const task = localStorage.getItem(`task-${side}`);
    const progress = localStorage.getItem(`progress-${side}`);

    if (task) {
        const row = document.getElementById(`row-${side.toLowerCase()}`);
        row.innerHTML = `
            <td>${task}</td>
            <td style="background-color: ${getColor(progress)};">${progress}%</td>
            <td><button onclick="deleteTask('${side}')">Delete</button></td>
        `;
    }
}

function getColor(progress) {
    if (progress == 0) return 'red';
    if (progress > 0 && progress < 100) return 'yellow';
    return 'green';
}

function deleteTask(side) {
    localStorage.removeItem(`task-${side}`);
    localStorage.removeItem(`progress-${side}`);
    const row = document.getElementById(`row-${side.toLowerCase()}`);
    row.innerHTML = '';
    alert(`Task for ${side} has been deleted.`);
}

window.onload = function() {
    displayCurrentDate();  // Affiche la date actuelle
    ['Islamic', 'Job', 'Sport', 'Others'].forEach(loadProgress);
};
