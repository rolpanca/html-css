console.log(ScriptProcessorNode.js, carregado);
console.log(produtos);
console.log(produtos.length);

const listaCarrinho = document.getElementById('lista-carrinho-pagina');
const totalCarrinho = document.getElementById('total-carrinho-pagina');

let carrinho = [];
let total = 0;

const carrinhoSalvo = localStorage.getItem('carrinho');

    if (carrinhoSalvo) {

        carrinho = JSON.parse(carrinhoSalvo);
    };

    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');

        window.location.href = 'carrinho.html';
    }

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

                    <div class="controle-quantidade">
                        <button class="btn-menos">-</button>

                        <span>${produto.quantidade}</span>

                        <button class="btn-mais">+</button>
                    </div>
                    
                     
                    <p class="preco">
                        R$ ${produto.preco.toFixed(2).replace('.', ',')}
                    </p>  
                </div>     
            `;
            const botaoMais = item.querySelector('.btn-mais');
            const botaoMenos = item.querySelector('.btn-menos');

            botaoMais.addEventListener('click', function() {
                produto.quantidade++;

                localStorage.setItem('carrinho', JSON.stringify(carrinho));

                atualizarCarrinho();
            });
            
            botaoMenos.addEventListener('click', function() {

                if (produto.quantidade > 1) {
                    produto.quantidade--;
                }else {
                    const indice = carrinho.indexOf(produto);
                    carrinho.splice(indice, 1);
                }

                localStorage.setItem('carrinho', JSON.stringify(carrinho) );

                atualizarCarrinho();
            });

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
