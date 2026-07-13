const listaCarrinho = document.getElementById('lista-carrinho-pagina');
const totalCarrinho = document.getElementById('total-carrinho-pagina');

let carrinho = [];
let total = 0;

const carrinhoSalvo = localStorage.getItem('carrinho');

    if (carrinhoSalvo) {

        carrinho = JSON.parse(carrinhoSalvo);
    };

    function atualizarCarrinho() {
        total = 0;

        listaCarrinho.innerHTML = '';

        carrinho.forEach(function(produto) {

            const item = document.createElement('div');

            item.classList.add('item-carrinho');

            item.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">

                <div class="info-carrinho">
                    <h3>${produto.nome}</h3>
                    <p>Quantidade: ${produto.quantidade}</p>
                    <p class="preco">
                        R$ ${produto.preco.toFixed(2).replace('.', ',')}
                    </p>  
                </div>      

            `;
            listaCarrinho.appendChild(item);
        });
    };
    atualizarCarrinho();
