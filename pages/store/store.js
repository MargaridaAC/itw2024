// DARK MODE

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

// CARRINHO

$('document').ready(function () {
    const carousel = new bootstrap.Carousel('#myCarousel', {
        interval: 5000
    });
})

let inputPrecoTotal = document.getElementById("total");
let inputQtdTotal = document.getElementById("quantidades");
let precoTotal = 0;
let qtdTotal = 0;


function addProduct(number) {
    let quantidadeProdutoSelecionado = document.getElementById("qty" + number);
    quantidadeProdutoSelecionado.value++;
    calculate();
}

function calculate() {
    let precAtual, qtdAtual;
    precoTotal = 0;
    qtdTotal = 0;

    for (let i = 1; i <= 6; i++) {
        precAtual = parseFloat(document.getElementById('price' + i).value);
        qtdAtual = parseFloat(document.getElementById('qty' + i).value);
        precoTotal += precAtual * qtdAtual;
        qtdTotal += qtdAtual;
    }

    inputQtdTotal.innerText = qtdTotal;
    inputPrecoTotal.innerText = precoTotal.toFixed(2);
}

function valid() {
    // Verifica a quantidade total de itens no carrinho
    var totalQuantity = parseInt(document.getElementById('quantidades').innerText);

    // Se não houver itens, mostra um alerta e bloqueia o envio do formulário
    if (totalQuantity === 0) {
        alert("O carrinho está vazio. Adicione itens antes de continuar.");
        return false;  // Impede o redirecionamento para a página de pagamento
    }

    // Se houver itens, permite o envio para o pagamento
    return true;
}


function clean() {
    for (let i = 1; i <= 6; i++) {
        qtdAtual = document.getElementById('qty' + i).value = 0;
    }
    precoTotal = 0;
    qtdTotal = 0;
    inputPrecoTotal.innerText = "0.00";
    inputQtdTotal.innerText = 0;
}
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    body.style.paddingTop = navbar.offsetHeight + 'px';
});

function addProduct(productId) {
    // Atualiza a quantidade do produto
    var qtyField = document.getElementById('qty' + productId);
    var quantity = parseInt(qtyField.value) + 1;  // Incrementa a quantidade
    qtyField.value = quantity;

    // Atualiza o preço total
    var price = parseFloat(document.getElementById('price' + productId).value);
    var totalField = document.getElementById('total');
    var currentTotal = parseFloat(totalField.innerText);  // Total atual do carrinho
    currentTotal += price;  // Adiciona o preço do novo item
    totalField.innerText = currentTotal.toFixed(2);  // Atualiza o total com duas casas decimais

    // Atualiza a quantidade total de itens no carrinho
    var quantityField = document.getElementById('quantidades');
    var totalQuantity = 0;

    // Soma as quantidades de todos os produtos no carrinho
    for (var i = 1; i <= 6; i++) {
        totalQuantity += parseInt(document.getElementById('qty' + i).value);
    }

    quantityField.innerText = totalQuantity;  // Atualiza a quantidade total no carrinho

    // Exibe o toast de "Item adicionado ao carrinho"
    var toast = new bootstrap.Toast(document.getElementById('cartToast'));
    toast.show();
}

