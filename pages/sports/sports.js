const apiUrl = 'http://192.168.160.58/Paris2024/api/Sports';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
    })
    .then(data => {
        const sportsListContainer = document.getElementById('sports-list');

        data.forEach(sport => {
            const { Id, Name, Pictogram, Sport_url, Athletes, Coaches, Competitions, Teams, Technical_officials, Venues } = sport;

            // Criar o item de desporto
            const sportItem = document.createElement('div');
            sportItem.classList.add('sport-item');

            // Criar a imagem
            const sportImage = document.createElement('img');
            sportImage.src = Pictogram;
            sportImage.alt = Name;

            // Criar a seção de informações
            const sportInfo = document.createElement('div');
            sportInfo.classList.add('sport-info');

            // Adicionar as informações
                        sportInfo.innerHTML = `
                <strong>Name:</strong> ${Name}<br>
                <strong>Athletes:</strong> ${Athletes}<br>
                <strong>Coaches:</strong> ${Coaches}<br>
                <strong>Competitions:</strong> ${Competitions}<br>
                <strong>Teams:</strong> ${Teams}<br>
                <strong>Technical Officials:</strong> ${Technical_officials}<br>
                <strong>Venues:</strong> ${Venues}<br>
                <a href="sportsinfo.html?id=${Id}">More Details</a>
            `;



            // Adicionar a imagem e as informações ao item de desporto
            sportItem.appendChild(sportImage);
            sportItem.appendChild(sportInfo);

            // Adicionar o item à lista de desportos
            sportsListContainer.appendChild(sportItem);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar dados:', error);
        alert('Não foi possível carregar as imagens dos desportos.');
    });



// dark mode

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