// Fonction pour afficher la date actuelle
function displayCurrentDate() {
    const dateDisplay = document.getElementById('current-date');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString(undefined, options);
}

// Sauvegarder les tâches et les pourcentages dans localStorage
function saveProgress(side) {
    const taskInput = document.getElementById(`task-${side.toLowerCase()}`);
    const progressInput = document.getElementById(`progress-${side.toLowerCase()}`);
    
    const task = taskInput.value;
    const progress = progressInput.value;

    if (task) {
        localStorage.setItem(`task-${side}`, task);
        localStorage.setItem(`progress-${side}`, progress);
        alert(`Task saved for ${side}: ${progress}% completed.`);
    } else {
        alert('Please enter a task before saving.');
    }
}

// Afficher les pourcentages de réalisation
function updatePercentage(side) {
    const progressInput = document.getElementById(`progress-${side}`);
    const percentageDisplay = document.getElementById(`percentage-${side}`);
    percentageDisplay.textContent = `${progressInput.value}%`;
}

// Charger les tâches enregistrées au chargement de la page
window.onload = function() {
    displayCurrentDate();  // Affiche la date actuelle
    ['Islamic', 'Job', 'Sport', 'Others'].forEach(side => {
        const task = localStorage.getItem(`task-${side}`);
        const progress = localStorage.getItem(`progress-${side}`);
        if (task) {
            document.getElementById(`task-${side.toLowerCase()}`).value = task;
            document.getElementById(`progress-${side.toLowerCase()}`).value = progress;
            updatePercentage(side.toLowerCase());
        }
    });
    startCountdown();
};

// Chronomètre pour le temps restant avant le renouvellement
function startCountdown() {
    const countdownDisplay = document.getElementById('countdown');
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeToMidnight = midnight - now;

    const hours = Math.floor((timeToMidnight % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeToMidnight % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeToMidnight % (1000 * 60)) / 1000);

    countdownDisplay.textContent = `Time left: ${hours}h ${minutes}m ${seconds}s`;

    setTimeout(startCountdown, 1000);
}

// Fonction pour réinitialiser les tâches à minuit
function resetTasksAtMidnight() {
    const now = new Date();
    const timeToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) - now;
    setTimeout(() => {
        ['Islamic', 'Job', 'Sport', 'Others'].forEach(side => {
            localStorage.removeItem(`task-${side}`);
            localStorage.removeItem(`progress-${side}`);
        });
        location.reload();
    }, timeToMidnight);
}

resetTasksAtMidnight();
