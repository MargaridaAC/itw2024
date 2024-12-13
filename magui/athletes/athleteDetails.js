$(document).ready(function () {
    // Get athlete ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id');

    // Check if the ID exists
    if (athleteId) {
        $.ajax({
            url: 'http://192.168.160.58/Paris2024/api/Technical_officials/%7Bid%7D' + athleteId, // Replace with your API URL
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const athlete = data; // Athlete data
                const athleteDetailsHtml = `
                                        <div class="photo-and-info">
                                            <!-- Athlete Information Left -->
                                            <div class="info-column">
                                                <h3>${athlete.Name}</h3>
                                                <p><strong>Short Name:</strong> ${athlete.NameShort}</p>
                                                <p><strong>TV Name:</strong> ${athlete.NameTV}</p>
                                                <p><strong>Birth Date:</strong> ${new Date(athlete.BirthDate).toLocaleDateString()}</p>
                                                <p><strong>Birth Place:</strong> ${athlete.BirthPlace}</p>
                                                <p><strong>Sex:</strong> ${athlete.Sex}</p>
                                                <p><strong>Height:</strong> ${athlete.Height}</p>
                                                <p><strong>Weight:</strong> ${athlete.Weight}</p>
                                                <p><strong>Country:</strong> ${athlete.Country}</p>
                                                <p><strong>Nationality:</strong> ${athlete.Nationality_code}</p>
                                                <p><strong>Residence:</strong> ${athlete.Residence_place}, ${athlete.Residence_country}</p>
                                                <p><strong>Nickname:</strong> ${athlete.Nickname}</p>
                                                <p><strong>Occupation:</strong> ${athlete.Occupation}</p>
                                                <p><strong>Hobbies:</strong> ${athlete.Hobbies}</p>
                                                <p><strong>Influence:</strong> ${athlete.Influence}</p>
                                                <p><strong>Philosophy:</strong> ${athlete.Philosophy}</p>
                                            </div>

                                            <!-- Athlete Photo Right -->
                                            <div class="photo-column">
                                                <img src="${athlete.Photo}" alt="Photo of ${athlete.Name}" class="athlete-photo img-fluid">
                                            </div>
                                        </div>

                                        <!-- Medals -->
                                        <div class="section-title">Medals</div>
                                        <div class="section-content">
                                            <ul class="medals-list">
                                                ${athlete.Medals.map(medal => `
                                                    <li><i class="fa fa-trophy"></i><strong>Type:</strong> ${medal.Medal_Type}, <strong>Sport:</strong> ${medal.Sport_name}, <strong>Competition:</strong> ${medal.Competition_name}, <strong>Team:</strong> ${medal.Team_name}</li>
                                                `).join('')}
                                            </ul>
                                        </div>

                                        <!-- Sports -->
                                        <div class="section-title">Sports</div>
                                        <div class="section-content">
                                            <ul class="sports-list">
                                                ${athlete.Sports.map(sport => `
                                                    <li><i class="fa fa-futbol-o"></i><strong>${sport.Name}</strong></li>
                                                `).join('')}
                                            </ul>
                                        </div>

                                        <!-- Competitions -->
                                        <div class="section-title">Competitions</div>
                                        <div class="section-content">
                                            <ul class="competitions-list">
                                                ${athlete.Competitions.map(comp => `
                                                    <li><i class="fa fa-flag"></i><strong>${comp.Name}</strong> (${comp.Tag})</li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    `;
                $('#athleteDetails').html(athleteDetailsHtml);
            },
            error: function () {
                $('#athleteDetails').html('<p>Could not fetch athlete details.</p>');
            }
        });
    } else {
        $('#athleteDetails').html('<p>No athlete ID provided.</p>');
    }
});


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