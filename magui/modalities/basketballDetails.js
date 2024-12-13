$(document).ready(function () {
    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Check if the ID exists
    if (id) {
        $.ajax({
            url: 'http://192.168.160.58/Paris2024/api/Technical_officials/%7Bid%7D' + id, // Replace with your API URL
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const details = data; // Response data
                const detailsHtml = `
                    <div class="details-container">
                        <!-- Event Information -->
                        <div class="info-section">
                            <h3>${details.Name}</h3>
                            <p><strong>Date:</strong> ${new Date(details.Date).toLocaleDateString()}</p>
                            <p><strong>Event:</strong> ${details.EventName} (${details.EventId})</p>
                            <p><strong>Stage:</strong> ${details.StageName} (${details.StageId})</p>
                            <p><strong>Sex:</strong> ${details.Sex}</p>
                            <p><strong>Venue:</strong> ${details.Venue}</p>
                        </div>

                        <!-- Participant Information -->
                        <div class="participant-section">
                            <p><strong>Participant Type:</strong> ${details.ParticipantType}</p>
                            <p><strong>Code:</strong> ${details.ParticipantCode}</p>
                            <p><strong>Name:</strong> ${details.ParticipantName}</p>
                            <p><strong>Country:</strong> ${details.CountryName} (${details.CountryCode})</p>
                            <img src="${details.CountryFlag}" alt="${details.CountryName} Flag" class="flag-image">
                        </div>

                        <!-- Results Information -->
                        <div class="results-section">
                            <p><strong>Rank:</strong> ${details.Rank}</p>
                            <p><strong>Result:</strong> ${details.Result}</p>
                            <p><strong>Result Type:</strong> ${details.ResultType}</p>
                            <p><strong>Result IRM:</strong> ${details.ResultIRM}</p>
                            <p><strong>Result Difference:</strong> ${details.ResultDiff}</p>
                            <p><strong>WLT:</strong> ${details.ResultWLT}</p>
                            <p><strong>Qualification Mark:</strong> ${details.QualificationMark}</p>
                            <p><strong>Start Order:</strong> ${details.StartOrder}</p>
                            <p><strong>Bib:</strong> ${details.Bib}</p>
                        </div>
                    </div>
                `;
                $('#detailsContainer').html(detailsHtml);
            },
            error: function () {
                $('#detailsContainer').html('<p>Could not fetch details.</p>');
            }
        });
    } else {
        $('#detailsContainer').html('<p>No ID provided.</p>');
    }
});
