const apiBaseURL = "http://192.168.160.58/Paris2024/api/Cycling_Tracks";

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('EventId');
    const stageId = urlParams.get('StageId');

    if (!eventId || !stageId) {
        alert("EventId ou StageId não encontrados!");
        return;
    }

    // Função para buscar os detalhes do evento
    function loadEventDetails(eventId, stageId) {
        const requestURL = `${apiBaseURL}/Details?EventId=${eventId}&StageId=${stageId}`;

        $.ajax({
            url: requestURL,
            method: "GET",
            dataType: "json",
            success: function (data) {
                populateEventDetailsList(data);
                populateParticipantsTable(data);
            },
            error: function () {
                alert("Erro ao carregar os detalhes do evento.");
            }
        });
    }

    // Função para preencher a lista de detalhes do evento
    function populateEventDetailsList(details) {
        const $list = $("#eventDetailsList");
        $list.empty(); // Limpar lista

        if (!details || details.length === 0) {
            $list.append("<li class='list-group-item text-center'>Nenhum detalhe encontrado!</li>");
            return;
        }

        const eventDetails = details[0]; // Supondo que o retorno da API seja um array

        // Exibir o título do evento
        $("#eventTitle").text(`${eventDetails.EventName} - Stage: ${eventDetails.StageName}`);

        const detailsMap = {
            "Event Name": eventDetails.EventName,
            "Stage Name": eventDetails.StageName,
            "Sex": eventDetails.Sex,
            "Date": new Date(eventDetails.Date).toLocaleString(),
            "Venue": eventDetails.Venue
        };

        // Criar a lista de detalhes
        Object.entries(detailsMap).forEach(([key, value]) => {
            const listItem = `
    <li class="list-group-item d-flex justify-content-between">
        <strong>${key}:</strong> <span>${value || "N/A"}</span>
    </li>
    `;
            $list.append(listItem);
        });
    }

    // Função para preencher a tabela de participantes
    function populateParticipantsTable(details) {
        const tableBody = $("#participantsTable tbody");
        tableBody.empty(); // Limpar tabela

        if (!details || details.length === 0) {
            tableBody.append("<tr><td colspan='7' class='text-center'>Nenhum participante encontrado!</td></tr>");
            return;
        }

        details.forEach(participant => {
            const row = `
    <tr>
        <td>${participant.ParticipantName}</td>
        <td>${participant.CountryName}</td>
        <td>${participant.Sex}</td>
        <td>${participant.ParticipantType}</td>
        <td>${participant.ParticipantCode}</td>
        <td>${participant.Rank || "N/A"}</td>
        <td>${participant.Result || "N/A"}</td>
    </tr>
    `;
            tableBody.append(row);
        });
    }

    // Botão "Back to Stage Details"
    $("#backButton").click(function () {
        window.history.back();
    });

    // Carregar os detalhes ao abrir a página
    loadEventDetails(eventId, stageId);
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