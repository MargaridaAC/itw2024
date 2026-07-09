var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    self.baseUri = ko.observable(API_URL + 'CountryMedals');
    self.displayName = 'Paris2024 CountryMedals List';
    self.error = ko.observable('');
    self.countrymedal = ko.observableArray('');

    self.activate = function () {
        console.log('CALL: getMedals...');
        const composedUri = self.baseUri();
        showLoading();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            hideLoading();
            console.log(data);
            self.countrymedal(data)
        });
    };

    function ajaxHelper(uri, method, data) {
        self.error('');
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(`AJAX Call [${uri}] Fail:`, errorThrown);
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function showLoading() {
        $("#myModal").modal('show', { backdrop: 'static', keyboard: false });
    }

    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        const params = new URLSearchParams(window.location.search);
        return params.get(sParam);
    }

    showLoading();
    self.activate();
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("Document ready!");
    ko.applyBindings(new vm());
});





document.addEventListener("DOMContentLoaded", function () {
    const countries = [
        { CountryName: "USA", GoldMedals: 39, SilverMedals: 41, BronzeMedals: 33 },
        { CountryName: "China", GoldMedals: 38, SilverMedals: 32, BronzeMedals: 18 },
        { CountryName: "Japan", GoldMedals: 27, SilverMedals: 14, BronzeMedals: 17 },
        { CountryName: "Germany", GoldMedals: 10, SilverMedals: 11, BronzeMedals: 16 },
        { CountryName: "France", GoldMedals: 10, SilverMedals: 12, BronzeMedals: 11 }
    ];

    const countryNames = countries.map(country => country.CountryName);
    const goldMedals = countries.map(country => country.GoldMedals);
    const silverMedals = countries.map(country => country.SilverMedals);
    const bronzeMedals = countries.map(country => country.BronzeMedals);

    // Configuração do gráfico
    const ctx = document.getElementById('medalsChart').getContext('2d');
    const medalsChart = new Chart(ctx, {
        type: 'bar', // Tipo do gráfico
        data: {
            labels: countryNames, // Rótulos dos países
            datasets: [{
                label: 'Gold Medals',
                data: goldMedals,
                backgroundColor: 'gold', // Cor para as medalhas de ouro
                borderColor: 'gold',
                borderWidth: 1
            }, {
                label: 'Silver Medals',
                data: silverMedals,
                backgroundColor: 'silver', // Cor para as medalhas de prata
                borderColor: 'silver',
                borderWidth: 1
            }, {
                label: 'Bronze Medals',
                data: bronzeMedals,
                backgroundColor: '#cd7f32', // Cor para as medalhas de bronze
                borderColor: '#cd7f32',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.raw + ' medals';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
