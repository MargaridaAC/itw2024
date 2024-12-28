// Inicializando o mapa
const map = L.map('map').setView([46.603354, 1.888334], 6); // Coordenadas iniciais (França)

// Adicionando camada de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// URL da nova API
const apiUrl = 'http://192.168.160.58/Paris2024/api/Torch_route'; // Substitua com a URL correta da nova API

// Ícone customizado
const customIcon = L.icon({
    iconUrl: '../1images/tocha.png', // Caminho relativo ao local onde está o HTML ou JS
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Array para armazenar as coordenadas da tocha
let routeCoordinates = [];

// Fetch dos dados da nova API e adição de marcadores e linha ao mapa
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(location => {
            const { Lat, Lon, Title, City, Date_start, Date_end, Tag, Url, Stage_number } = location;

            // Converter Lat e Lon para números
            const lat = parseFloat(Lat);
            const lon = parseFloat(Lon);

            // Verificar se as coordenadas são válidas
            if (!isNaN(lat) && !isNaN(lon)) {
                // Adicionar coordenadas à lista
                routeCoordinates.push([lat, lon]);

                // Criar marcador para cada localização
                const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

                // Formatar datas
                const formattedStartDate = new Date(Date_start).toLocaleString();
                const formattedEndDate = new Date(Date_end).toLocaleString();

                // Definir o conteúdo do popup
                const popupContent = `
                    <b>${Title}</b><br>
                    <strong>City:</strong> ${City}<br>
                    <strong>Tag:</strong> ${Tag}<br>
                    <strong>Stage Number:</strong> ${Stage_number}<br>
                    <strong>Start Date:</strong> ${formattedStartDate}<br>
                    <strong>End Date:</strong> ${formattedEndDate}<br>
                    <a href="${Url}" target="_blank">Official Site</a>
                `;
                // Adicionar popup ao marcador
                marker.bindPopup(popupContent);
            }
        });

        // Adicionar uma linha (polyline) ligando todos os pontos
        if (routeCoordinates.length > 1) {
            L.polyline(routeCoordinates, { color: 'grey', weight: 4 }).addTo(map);
        }

        // Ajustar o mapa para a área coberta pela linha
        map.fitBounds(L.latLngBounds(routeCoordinates));
    })
    .catch(error => {
        console.error('Erro ao carregar dados:', error);
        alert('Não foi possível carregar as localizações.');
    });

// Função para formatar as datas de forma legível
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(); // Retorna a data formatada
}

// Fetch dos dados da nova API e adição das linhas na tabela
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById('torchRouteTable');

        data.forEach((event) => {
            const { Date_start, City, Stage_number, Tag, Url } = event;

            const row = document.createElement('tr');

            // Adicionando células à linha
            row.innerHTML = `
                <td>${formatDate(Date_start)}</td>
                <td>${City}</td>
                <td>${Stage_number}</td>
                <td>${Tag}</td>
                <td><a href="${Url}" target="_blank">Link</a></td>
            `;

            // Adiciona a linha à tabela
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar dados:', error);
        alert('Não foi possível carregar a ordem cronológica da tocha.');
    });

// Dark mode
$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
});

// Tema
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
