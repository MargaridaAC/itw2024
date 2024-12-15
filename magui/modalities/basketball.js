
const apiURL = "http://192.168.160.58/Paris2024/api/Basketballs/Events"; // Insira aqui o link da sua API

$(document).ready(function () {
    const $dropdown = $('#eventDropdown');
    const $tableBody = $('#stagesTableBody');
    const $selectedEventName = $('#selectedEventName');

    // Carregar eventos da API
    function loadEvents() {
        $.ajax({
            url: apiURL,
            method: "GET",
            dataType: "json",
            success: function (data) {
                populateDropdown(data);
                if (data.length > 0) {
                    // Carregar os stages do primeiro evento por padrão
                    $dropdown.val(data[0].EventId);
                    loadStages(data[0].EventId, data);
                }
            },
            error: function () {
                alert("Erro ao carregar os dados da API.");
                $dropdown.html('<option value="">Failed to load events</option>');
            }
        });
    }

    // Preencher o dropdown com eventos
    function populateDropdown(events) {
        $dropdown.empty(); // Limpar dropdown
        events.forEach(event => {
            $dropdown.append(`<option value="${event.EventId}">${event.EventName}</option>`);
        });
    }

    // Carregar estágios na tabela
    function loadStages(eventId, allEvents) {
        $tableBody.empty(); // Limpar tabela

        const selectedEvent = allEvents.find(event => event.EventId === eventId);
        if (!selectedEvent) return;

        $selectedEventName.text(selectedEvent.EventName);

        selectedEvent.Stages.forEach(stage => {
            const row = `
                        <tr>
                            <td class="align-middle">${stage.StageId}</td>
                            <td class="align-middle">${stage.StageName}</td>
                            <td class="text-end">
                                <a class="btn btn-light btn-xs" href="basketballs-details.html?EventId=${eventId}&StageId=${stage.StageId}">
                                    <i class="fa fa-eye text-primary" title="View Details"></i>
                                </a>

                                <button class="btn btn-light btn-xs">
                                    <i class="fa fa-heart-o" id="favourite_${stage.StageId}" title="Add to favorites"></i>
                                </button>
                            </td>
                        </tr>
                    `;
            $tableBody.append(row);
        });
    }

    // Evento para mudança de dropdown
    $dropdown.on('change', function () {
        const selectedEventId = $(this).val();
        $.ajax({
            url: apiURL,
            method: "GET",
            dataType: "json",
            success: function (data) {
                loadStages(selectedEventId, data);
            },
            error: function () {
                alert("Erro ao carregar os stages.");
            }
        });
    });

    // Inicializar
    loadEvents();
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