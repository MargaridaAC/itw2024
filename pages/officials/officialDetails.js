$(document).ready(function () {
    // Get athlete ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id');

    // Check if the ID exists
    if (athleteId) {
        $.ajax({
            url: API_URL + `Technical_officials/${athleteId}`, // Replace with your API URL
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
