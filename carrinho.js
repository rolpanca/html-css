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

            total += produto.preco * produto.quantidade;

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

            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.classList.add('btn-remover');

            item.appendChild(botaoRemover);

            botaoRemover.addEventListener('click', function(){
                const indice = carrinho.indexOf(produto);
                carrinho.splice(indice, 1);

                localStorage.setItem('carrinho', JSON.stringify(carrinho));

                atualizarCarrinho();

            });


            listaCarrinho.appendChild(item);
        });

        totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');

    };
    atualizarCarrinho();
