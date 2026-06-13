const botoes = document.querySelectorAll('.btn-comprar');

botoes.forEach(function(botao) {
    botao.addEventListener('click', function() {

        const Produto = botao.parentElement;
        const nome = Produto.querySelector('h2').textContent;

        alert(nome + ' adicionado ao carrinho');
    });
});