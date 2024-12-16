// Função para buscar parâmetros da URL
function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
return urlParams.get(name);
    }

// Função para voltar à página anterior
function goBack() {
    window.history.back();
    }

$(document).ready(function () {
        const sportId = getUrlParameter('id'); // Obtém o SportId da URL

if (!sportId) {
    $("#competition-details").html("<p class='text-danger'>Sport ID not provided.</p>");
return;
        }

// Requisição à API (exemplo de endpoint, altere para a URL real)
    const apiUrl = `http://192.168.160.58/Paris2024/api/Competitions?sportId={sportId}&name={name}`;
$.ajax({
    url: apiUrl,
method: "GET",
success: function (data) {
    // Preenche o nome, tag e imagem da competição
    $("#competition-name").text(data.Name);
$("#competition-tag").text(data.Tag);
$("#competition-photo").attr("src", data.Photo);

// Preenche a informação do esporte
$("#sport-name").text(data.SportInfo.Name);

                // Preenche a tabela de atletas
                const athletesHtml = data.Athletes.map((athlete, index) => {
                    return `
<tr>
    <td>${index + 1}</td>
    <td>${athlete.Name}</td>
</tr>
`;
                }).join('');
$("#athletes-table").html(athletesHtml);
            },
error: function () {
    $("#competition-details").html("<p class='text-danger'>Failed to load data. Please try again.</p>");
            }
        });
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