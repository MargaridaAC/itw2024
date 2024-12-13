$(document).ready(function () {
    // Get athlete ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id');

    // Check if the ID exists
    if (athleteId) {
        $.ajax({
            url: 'http://192.168.160.58/Paris2024/API/athletes/' + athleteId, // Replace with your API URL
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const athlete = data; // Athlete data
                const athleteDetailsHtml = `
                    <div class="photo-and-info">
                        <!-- Athlete Information Left -->
                        <div class="info-column">
                            <h3>${athlete.Name}</h3>
                            <p><strong>Category:</strong> ${athlete.Category}</p>
                            <p><strong>Function:</strong> ${athlete.Function}</p>
                            <p><strong>Birth Date:</strong> ${new Date(athlete.BirthDate).toLocaleDateString()}</p>
                            <p><strong>Sex:</strong> ${athlete.Sex}</p>
                            <p><strong>Organisation:</strong> ${athlete.Organisation}</p>
                            <p><strong>Organisation Code:</strong> ${athlete.OrganisationCode}</p>
                            <p><strong>Website:</strong> <a href="${athlete.Url}" target="_blank">${athlete.Url}</a></p>
                        </div>

                        <!-- Athlete Photo Right -->
                        <div class="photo-column">
                            <img src="${athlete.Photo}" alt="Photo of ${athlete.Name}" class="athlete-photo img-fluid">
                        </div>
                    </div>

                    <!-- Sports -->
                    <div class="section-title">Sports</div>
                    <div class="section-content">
                        <ul class="sports-list">
                            ${athlete.Sports.map(sport => `
                                <li>
                                    <i class="fa fa-futbol-o"></i>
                                    <strong>${sport.Name}</strong> 
                                    <a href="${sport.Sport_url}" target="_blank">More Info</a>
                                </li>
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
