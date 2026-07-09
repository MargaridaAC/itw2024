// Dark Mode Toggle Logic Centralized
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const navbar = document.querySelector('.navbar');

    if (!themeToggle) return; // Se a página não tiver o botão, sai da função

    // Ao carregar a página, verificar o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (navbar) {
            navbar.classList.remove('navbar-light-mode');
            navbar.classList.add('navbar-dark-mode');
        }
        themeToggle.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
    } else {
        body.classList.remove('dark-mode');
        if (navbar) {
            navbar.classList.remove('navbar-dark-mode');
            navbar.classList.add('navbar-light-mode');
        }
        themeToggle.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
    }

    // Aplica o estilo do modo escuro para a tabela ao carregar
    updateTableStyle();

    // Salvar o tema ao alterná-lo
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark'); // Salvar tema escuro
            if (navbar) {
                navbar.classList.remove('navbar-light-mode');
                navbar.classList.add('navbar-dark-mode');
            }
            themeToggle.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
        } else {
            localStorage.setItem('theme', 'light'); // Salvar tema claro
            if (navbar) {
                navbar.classList.remove('navbar-dark-mode');
                navbar.classList.add('navbar-light-mode');
            }
            themeToggle.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
        }

        // Atualiza o estilo da tabela ao alternar o tema
        updateTableStyle();
    });

    // Função para atualizar o estilo das tabelas dependendo do modo
    function updateTableStyle() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            if (body.classList.contains('dark-mode')) {
                table.classList.add('tabela-dados');  // Certifica-se de que a tabela tenha a classe "tabela-dados" no modo escuro
            } else {
                table.classList.remove('tabela-dados');  // Remove a classe para voltar ao tema claro
            }
        });
    }
});
