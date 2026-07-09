$(document).ready(function () {
    // Get team ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('id');

    // Check if the ID exists
    if (teamId) {
        $.ajax({
            url: API_URL + `Teams/${teamId}`, // Corrected API URL
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const team = data; // Assuming API returns a single object
                const medalTypes = { 1: 'Gold', 2: 'Silver', 3: 'Bronze' };
                const teamDetailsHtml = `
                    <div class="team-info">
                        <div class="info-column">
                            <h3>${team.Name}</h3>
                            <p><strong>Sex:</strong> ${team.Sex}</p>
                            <p><strong>Number of Athletes:</strong> ${team.Num_athletes}</p>
                            <p><strong>Number of Coaches:</strong> ${team.Num_coaches}</p>
                            <p><strong>NOC:</strong> ${team.NOC.Name}</p>
                            <p><strong>Sport:</strong> ${team.Sport.Name}</p>
                        </div>
                    </div>
                    <div class="section-title">Athletes</div>
                    <div class="section-content">
                        <ul class="athletes-list">
                            ${team.Athletes.map(athlete => `
                                <li>
                                    <a href="../athletes/athleteDetails.html?id=${athlete.Id}">
                                        <strong>${athlete.Name}</strong>
                                    </a> (ID: ${athlete.Id})
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="section-title">Coaches</div>
                    <div class="section-content">
                        <ul class="coaches-list">
                            ${team.Coaches.map(coach => `
                                <li>
                                    <a href="../coaches/coachDetails.html?id=${coach.Id}">
                                        <strong>${coach.Name}</strong>
                                    </a> (ID: ${coach.Id})
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="section-title">Medals</div>
                    <div class="section-content">
                        <ul class="medals-list">
                            ${team.Medals.map(medal => `
                                <li>
                                    <i class="fa fa-trophy"></i>
                                    <strong>Type:</strong> ${medalTypes[medal.Medal_Type]}, 
                                    <strong>Sport:</strong> ${medal.Sport_name}, 
                                    <strong>Competition:</strong> ${medal.Competition_name}, 
                                    <strong>Team:</strong> ${medal.Team_name}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
                $('#teamDetails').html(teamDetailsHtml);
            },
            error: function (xhr, status, error) {
                console.error('API error:', error);
                $('#teamDetails').html('<p>Could not fetch team details.</p>');
            }
        });
    } else {
        $('#teamDetails').html('<p>No team ID provided.</p>');
    }
});



// dark mode
