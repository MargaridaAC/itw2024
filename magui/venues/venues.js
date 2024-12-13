const map = L.map('map').setView([46.603354, 1.888334], 6); // Coordenadas iniciais (Nova York)

// Adicionando camada de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// URL da API
const apiUrl = 'http://192.168.160.58/Paris2024/api/Venues';  // Substitua com a URL real da API

// Novo ícone customizado
const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25613.png', // Caminho para nova imagem do ícone
    iconSize: [40, 40], // Novo tamanho do ícone
    iconAnchor: [20, 40], // Posição do ícone
    popupAnchor: [0, -40] // Posição do popup
});

// Fetch dos dados da API e adição de marcadores ao mapa
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(location => {
            const { Lat, Lon, Name, DateStart, DateEnd, NumSports } = location;

            // Converter Lat e Lon para números
            const lat = parseFloat(Lat);
            const lon = parseFloat(Lon);

            // Criar um marcador apenas se Lat e Lon forem válidos
            if (!isNaN(lat) && !isNaN(lon)) {
                const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

                // Formatar datas
                const formattedStartDate = new Date(DateStart).toLocaleString();
                const formattedEndDate = new Date(DateEnd).toLocaleString();

                // Definir o conteúdo do popup
                const popupContent = `
                    <b>${Name}</b><br>
                    <strong>Number of Sports:</strong> ${NumSports}<br>
                    <strong>Start Date:</strong> ${formattedStartDate}<br>
                    <strong>End Date:</strong> ${formattedEndDate}
                `;

                // Adicionar evento de click com popup
                marker.bindPopup(popupContent);
            }
        });
    })
    .catch(error => {
        console.error('Erro ao carregar dados:', error);
        alert('Não foi possível carregar as localizações.');
    });




// dark mode
$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})





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