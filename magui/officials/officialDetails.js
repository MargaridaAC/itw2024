$(document).ready(function () {
    // Get athlete ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id');

    // Check if the ID exists
    if (athleteId) {
        $.ajax({
            url: `http://192.168.160.58/Paris2024/api/Technical_officials/${athleteId}`, // Replace with your API URL
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const athlete = data; // Athlete data

                // Fill in the athlete details in the table
                $('#athleteName').text(athlete.Name);
                $('#athleteCategory').text(athlete.Category);
                $('#athleteFunction').text(athlete.Function);
                $('#athleteBirthDate').text(new Date(athlete.BirthDate).toLocaleDateString());
                $('#athleteSex').text(athlete.Sex);
                $('#athleteOrganisation').text(athlete.Organisation);
                $('#athleteOrganisationCode').text(athlete.OrganisationCode);
                $('#athleteWebsite').html(`<a href="${athlete.Url}" target="_blank">${athlete.Url}</a>`);
                $('#athletePhoto').html(`<img src="${athlete.Photo}" alt="Photo of ${athlete.Name}" class="img-fluid" style="max-width: 200px;">`);

                // Fill in the sports list
                const sportsListHtml = athlete.Sports.map(sport => `
                    <tr>
                        <td>${sport.Name}</td>
                        <td><a href="${sport.Sport_url}" target="_blank">More Info</a></td>
                    </tr>
                `).join('');
                $('#sportsList').html(sportsListHtml);
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