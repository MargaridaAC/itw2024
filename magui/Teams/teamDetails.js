$(document).ready(function () {
    // Get team ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('id');

    // Check if the ID exists
    if (teamId) {
        $.ajax({
            url: 'http://192.168.160.58/Paris2024/api/Teams/%7Bid%7D' + teamId, // Replace with your API URL
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const team = data[0]; // Assuming the data is an array and we are working with the first team
                const teamDetailsHtml = `
                    <div class="team-info">
                        <!-- Team Information -->
                        <div class="info-column">
                            <h3>${team.Name}</h3>
                            <p><strong>Sex:</strong> ${team.Sex}</p>
                            <p><strong>Number of Athletes:</strong> ${team.Num_athletes}</p>
                            <p><strong>Number of Coaches:</strong> ${team.Num_coaches}</p>
                            <p><strong>NOC:</strong> ${team.NOC.Name}</p>
                            <p><strong>Sport:</strong> ${team.Sport.Name}</p>
                        </div>
                    </div>

                    <!-- Athletes -->
                    <div class="section-title">Athletes</div>
                    <div class="section-content">
                        <ul class="athletes-list">
                            ${team.Athletes.map(athlete => `
                                <li><strong>${athlete.Name}</strong> (ID: ${athlete.Id})</li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- Coaches -->
                    <div class="section-title">Coaches</div>
                    <div class="section-content">
                        <ul class="coaches-list">
                            ${team.Coaches.map(coach => `
                                <li><strong>${coach.Name}</strong> (ID: ${coach.Id})</li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- Medals -->
                    <div class="section-title">Medals</div>
                    <div class="section-content">
                        <ul class="medals-list">
                            ${team.Medals.map(medal => `
                                <li><i class="fa fa-trophy"></i><strong>Type:</strong> ${medal.Medal_Type}, <strong>Sport:</strong> ${medal.Sport_name}, <strong>Competition:</strong> ${medal.Competition_name}, <strong>Team:</strong> ${medal.Team_name}</li>
                            `).join('')}
                        </ul>
                    </div>
                `;
                $('#teamDetails').html(teamDetailsHtml);
            },
            error: function () {
                $('#teamDetails').html('<p>Could not fetch team details.</p>');
            }
        });
    } else {
        $('#teamDetails').html('<p>No team ID provided.</p>');
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