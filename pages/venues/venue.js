const Paris = [
    "Hôtel de Ville",
    "La Concorde",
    "Pont Alexandre III",
    "Aquatics Centre",
    "Bercy Arena",
    "Champ de Mars Arena",
    "Cerimony",
    "Porte de La Chapelle Arena",
    "Paris La Defense Arena",
    "Eiffel Tower Stadium",
    "Grand Palais",
    "Invalides",
    "Le Bourget Sport Climbing Venue",
    "La Concorde 1",
    "La Concorde 2",
    "La Concorde 3",
    "La Concorde 4",
    "North Paris Arena",
    "Parc des Princes",
    "Stade Roland-Garros",
    "South Paris Arena 1",
    "South Paris Arena 4",
    "South Paris Arena 6",
    "South Paris Arena",
    "Stade de France",
    "Trocadéro",
    "Château de Versailles"
];

const bordeaux = [
    "Bordeaux Stadium"
];

const lyon = [
    "Lyon Stadium"
];

const marseille = [
    "Marseille Marina",
    "Marseille Stadium"
];

const nantes = [
    "La Beaujoire Stadium"
];

const nice = [
    "Nice Stadium"
];

const chateauroux = [
    "Chateauroux Shooting Centre"
];

const tahiti = [
    "Teahupo'o, Tahiti"
];

const vairesSurMarne = [
    "Vaires-sur-Marne Nautical Stadium"
];


// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    // Observáveis
    self.baseUri = ko.observable(API_URL + 'Venues');
    self.displayName = 'Paris2024 Coaches List';
    self.error = ko.observable('');
    self.venue = ko.observableArray([]);

    self.Paris = ko.observable('');
    self.Lyon = ko.observable('');
    self.Marseille = ko.observable('');
    self.Bordeaux = ko.observable('');
    self.Nice = ko.observable('');
    self.Tahiti = ko.observable('');
    self.Nantes = ko.observable('');
    self.Chateauroux = ko.observable('');
    self.VairesSurMarne = ko.observable('');

    // Função para ativar a página
    self.activate = function () {
        console.log('CALL: getVenue...');
        const composedUri = `${self.baseUri()}`;
        showLoading();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading();
            const filteredData = data.filter(item => item.NumSports !== 0);
            self.Paris(filteredData.filter(stadium => Paris.includes(stadium.Name)));
            self.Lyon(filteredData.filter(stadium => lyon.includes(stadium.Name)));
            self.Marseille(filteredData.filter(stadium => marseille.includes(stadium.Name)));
            self.Bordeaux(filteredData.filter(stadium => bordeaux.includes(stadium.Name)));
            self.Nice(filteredData.filter(stadium => nice.includes(stadium.Name)));
            self.Tahiti(filteredData.filter(stadium => tahiti.includes(stadium.Name)));
            self.Nantes(filteredData.filter(stadium => nantes.includes(stadium.Name)));
            self.Chateauroux(filteredData.filter(stadium => chateauroux.includes(stadium.Name)));
            self.VairesSurMarne(filteredData.filter(stadium => vairesSurMarne.includes(stadium.Name)));
        });
    };

    // Funções para mostrar e esconder o loading
    function showLoading() {
        $("#myModal").modal('show', { backdrop: 'static', keyboard: false });
    }

    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    // Função para obter parâmetros da URL
    function getUrlParameter(sParam) {
        const params = new URLSearchParams(window.location.search);
        return params.get(sParam);
    }

    // Inicialização
    showLoading();
    self.activate();
    console.log("VM initialized!");
};

function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: "json",
        contentType: "application/json",
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
        },
    });
}

$('document').ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

const map = L.map('map').setView([46.603354, 1.888334], 6); // Coordenadas iniciais (Nova York)

// Adicionando camada de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// URL da API
const apiUrl = API_URL + 'Venues';  // Substitua com a URL real da API

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
