const apiBaseURL = "http://192.168.160.58/Paris2024/api/Basketballs";

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('EventId');
    const stageId = urlParams.get('StageId');

    if (!eventId || !stageId) {
        alert("EventId ou StageId não encontrados!");
        return;
    }

    // Função para carregar detalhes do Stage
    function loadStageDetails(eventId, stageId) {
        const requestURL = `${apiBaseURL}?EventId=${eventId}&StageId=${stageId}`;

        $.ajax({
            url: requestURL,
            method: "GET",
            dataType: "json",
            success: function (data) {
                populateDetailsTable(data);
            },
            error: function () {
                alert("Erro ao carregar os detalhes do Stage.");
            }
        });
    }

    // Preenche a tabela com os dados recebidos
    function populateDetailsTable(details) {
        const $tableBody = $("#detailsTableBody");
        $tableBody.empty();

        if (details.length === 0) {
            $tableBody.append("<tr><td colspan='9' class='text-center'>Nenhum detalhe encontrado!</td></tr>");
            return;
        }

        $("#stageTitle").text(`Details for Stage: ${details[0].StageName}`);

        details.forEach(item => {
            const row = `
                        <tr>
                            <td>${item.Id}</td>
                            <td>${item.Name}</td>
                            <td>${item.EventName} (${item.EventId})</td>
                            <td>${item.StageName} (${item.StageId})</td>
                            <td>${item.Sex}</td>
                            <td>${item.ParticipantType}</td>
                            <td>${item.ParticipantCode}</td>
                            <td>${item.ParticipantName}</td>
                            <td>${item.CountryName} (${item.CountryCode})</td>
                        </tr>
                    `;
            $tableBody.append(row);
        });
    }

    // Botão "Back to List"
    $("#backButton").click(function () {
        window.history.back();
    });

    // Botão "More Details"
    $("#moreDetailsButton").click(function () {
        window.location.href = `BasketballMatch.html?EventId=${eventId}&StageId=${stageId}`;
    });

    // Carregar detalhes ao abrir a página
    loadStageDetails(eventId, stageId);
});


//dark mode
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