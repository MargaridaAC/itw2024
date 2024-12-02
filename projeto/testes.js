const express = require('express');
const app = express();

// Simulação de dados
const produtos = [
    { nome: 'Televisão' },
    { nome: 'Smartphone' },
    { nome: 'Computador' },
    { nome: 'Tablet' }
];

// Rota para pesquisa
app.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const resultados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(query)
    );
    res.send(resultados); // Retorna os resultados como JSON
});

app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000');
});