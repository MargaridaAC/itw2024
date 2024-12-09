document.addEventListener('DOMContentLoaded', function () {
    const sportsDropdown = document.getElementById('sports-dropdown');
    const teamsDropdown = document.getElementById('olympic-teams-dropdown');
    sportsDropdown.style.display = 'none';
    teamsDropdown.style.display = 'none';

    const sportsLink = document.getElementById('sports-link');
    const teamsLink = document.getElementById('olympic-teams-link');

    sportsLink.addEventListener('click', function (e) {
        e.preventDefault();
        const isVisible = sportsDropdown.style.display === 'block';
        sportsDropdown.style.display = isVisible ? 'none' : 'block';
    });

    teamsLink.addEventListener('click', function (e) {
        e.preventDefault();
        const isVisible = teamsDropdown.style.display === 'block';
        teamsDropdown.style.display = isVisible ? 'none' : 'block';
    });

    document.addEventListener('click', function (e) {
        if (!sportsLink.contains(e.target) && !sportsDropdown.contains(e.target)) {
            sportsDropdown.style.display = 'none';
        }
        if (!teamsLink.contains(e.target) && !teamsDropdown.contains(e.target)) {
            teamsDropdown.style.display = 'none';
        }
    });
});
