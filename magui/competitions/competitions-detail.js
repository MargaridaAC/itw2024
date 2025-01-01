async function fetchCompetitionDetails() {
    try {
        // Get the SportId from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const sportId = urlParams.get('id');

        // Check if sportId is provided in the URL
        if (!sportId) {
            throw new Error('SportId not found in the URL');
        }

        // Build the API URL, replacing {sportId} and {name} with the correct values
        const apiUrl = `http://192.168.160.58/Paris2024/api/Competitions?sportId=${sportId}&name=`;

        // Make the API request
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Error loading competition data');
        }

        // Convert the response to JSON
        const competition = await response.json();

        // Check if the returned data is in the expected format
        if (!competition || !competition.Name || !competition.Tag) {
            throw new Error('Invalid data received');
        }

        // Display the competition details
        document.getElementById('competition-name').innerText = competition.Name;
        document.getElementById('competition-tag').innerText = competition.Tag;
        document.getElementById('competition-photo').src = competition.Photo;
        document.getElementById('sport-info').innerText = `${competition.SportInfo.Name} (ID: ${competition.SportInfo.Id})`;

        // Display the list of athletes
        const athletesList = document.getElementById('athletes-list');
        athletesList.innerHTML = '';
        competition.Athletes.forEach(athlete => {
            const athleteItem = document.createElement('div');
            athleteItem.className = 'athlete-item';
            athleteItem.innerHTML = `<strong>${athlete.Name}</strong> (ID: ${athlete.Id})`;
            athletesList.appendChild(athleteItem);
        });

    } catch (error) {
        console.error(error);
        // Display an error message on the page
        document.getElementById('competition-name').innerText = 'Error loading data';
        document.getElementById('athletes-list').innerHTML = 'Unable to load competition data.';
    }
}

// Load the data as soon as the page is loaded
window.onload = fetchCompetitionDetails;



// dark mode

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navbar = document.querySelector('.navbar');

// Ao carregar a página, verificar o tema salvo no localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        navbar.classList.remove('navbar-light-mode');
        navbar.classList.add('navbar-dark-mode');
        themeToggle.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
    } else {
        body.classList.remove('dark-mode');
        navbar.classList.remove('navbar-dark-mode');
        navbar.classList.add('navbar-light-mode');
        themeToggle.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
    }
});

// Salvar o tema ao alterná-lo
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark'); // Salvar tema escuro
        navbar.classList.remove('navbar-light-mode');
        navbar.classList.add('navbar-dark-mode');
        themeToggle.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
    } else {
        localStorage.setItem('theme', 'light'); // Salvar tema claro
        navbar.classList.remove('navbar-dark-mode');
        navbar.classList.add('navbar-light-mode');
        themeToggle.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
    }
});