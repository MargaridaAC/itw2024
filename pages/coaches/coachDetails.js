$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const coachId = urlParams.get('id');

    // Verifica se o ID foi fornecido
    if (coachId) {
        $.ajax({
            url: API_URL + `Coaches/${coachId}`, // URL da API para coaches
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const coach = data; // Dados do coach recebidos da API

                // Caminho padrão para imagem
                const defaultPhotoUrl = "../../assets/images/PersonNotFound.png";
                const photoUrl = coach.Photo || defaultPhotoUrl;

                const coachDetailsHtml = `
                    <div class="photo-and-info">
                        <!-- Informações do Coach à esquerda -->
                        <div class="info-column">
                            <h3>${coach.Name}</h3>
                            <p><strong>Sex:</strong> ${coach.Sex}</p>
                            <p><strong>Birth Date:</strong> ${new Date(coach.BirthDate).toLocaleDateString()}</p>
                            <p><strong>Function:</strong> ${coach.Function}</p>
                            <p><strong>Country:</strong> ${coach.Country}</p>
                            <p><strong>Country Code:</strong> ${coach.Country_code}</p>
                        </div>

                        <!-- Foto do Coach à direita -->
                        <div class="photo-column">
                            <img src="${photoUrl}" alt="Photo of ${coach.Name}" class="coach-photo img-fluid">
                        </div>
                    </div>

                    <!-- Esportes -->
                    <div class="section-title">Sports</div>
                    <div class="section-content">
                        <ul class="sports-list">
                            ${coach.Sports.map(sport => `
                                <li><i class="fa fa-futbol-o"></i><strong>${sport.Name}</strong></li>
                            `).join('')}
                        </ul>
                    </div>
                `;
                $('#coachDetails').html(coachDetailsHtml);
            },
            error: function () {
                $('#coachDetails').html('<p>Could not fetch coach details.</p>');
            }
        });
    } else {
        $('#coachDetails').html('<p>No coach ID provided.</p>');
    }
});



// dark mode
