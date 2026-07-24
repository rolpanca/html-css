//=======================================================
//ELEMENTOS DA PAGINA
//=========================================================
const modal = document.querySelector('.modal');
const botoesDetalhes = document.querySelectorAll('.btn-detalhes');
const botaoFechar = document.querySelector('.fechar');


const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.querySelector('.total');

const botoesComprar = document.querySelectorAll('.btn-comprar');


const pesquisa = document.getElementById('pesquisa');
const produtos = document.querySelectorAll('.produto');


const slides = document.querySelectorAll('.slide');
const contador = document.getElementById('contador-carrinho');

//======================================================================================
//VARIÁVEIS
//======================================================================================
let carrinho = [];
let total = 0;
let index = 0;

//=======================================================================================
//PESQUISA DE produtos
//=======================================================================================
 //  Código de pesquisa
 

pesquisa.addEventListener('keyup', function(){

    const textoPesquisa = pesquisa.value.toLowerCase();   

    produtos.forEach(function(produto){

        const nomeProduto = produto.querySelector('h2').textContent.toLowerCase();


        console.log(nomeProduto, textoPesquisa);      

        if (nomeProduto.includes(textoPesquisa)) {

            console.log("Mostrar:", nomeProduto);

            produto.style.display = '';
        }else {
            produto.style.display = 'none';
        }        

    });

});

//==============================================================================================
//BOTÕES COMPRAR
//==============================================================================================

botoesComprar.forEach(function(botao){

    botao.addEventListener('click', function(event) {

        event.preventDefault();        

        const produto = botao.closest('.produto');       

        const nome = produto.querySelector('h2').textContent;
        const preco = produto.querySelector('.preco').textContent;
        const imagem = produto.querySelector('img').src;


        const valor = Number(preco.replace('R$', '').replace(',', '.'));

        const produtoExistente = carrinho.find(function(item) {
            return item.nome === nome;
        });

       

        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            carrinho.push({
                nome: nome,
                preco: valor,
                quantidade: 1,
                imagem: imagem
            });
        };
        atualizarCarrinho(); 
        salvarCarrinho();    
                              
    });
    
});

//=============================================================================================
//MODAL DOS PRODUTOS
//================================================================================================

botoesDetalhes.forEach(function(botao) {
    botao.addEventListener('click', function() {        
        const produto = botao.closest('.produto');
        const nome = produto.querySelector('h2').textContent;
        const imagem = produto.querySelector('img').src;
        const preco = produto.querySelector('.preco').textContent
        const descricao = produto.querySelector('p:last-of-type').textContent;             

        modal.querySelector('.modal-nome').textContent = nome;
        modal.querySelector('.modal-img').src = imagem;
        modal.querySelector('.modal-preco').textContent = preco;
        modal.querySelector('.modal-descricao').textContent = descricao;

        modal.style.display = 'flex';        

    });
});

botaoFechar.addEventListener('click', function() {
    modal.style.display = 'none';
});

modal.addEventListener('click', function(event){
    if(event.target === modal) {
        modal.style.display = 'none';
    }
});


//==================================================================================================
//BANNER AUTOMÁTICO
//===================================================================================================

function trocarBanner() {
    slides[index].classList.remove('ativo');    

    index++;

    if (index >= slides.length) {
        index = 0;
    }

    slides[index].classList.add('ativo');    
}
setInterval(trocarBanner, 3000);

//==========================================================================================
//FUNÇÕES DO CARRINHO
//=======================================================================================

function atualizarCarrinho() {
        total = 0;
        listaCarrinho.innerHTML = '';   

        carrinho.forEach(function(produto){

            total += produto.preco * produto.quantidade;

            const item = document.createElement('li');

        item.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2).replace('.', ',')}

            <button class="btn-menos">-</button>

            <strong class="quantidade">x${produto.quantidade}</strong>

            <button class="btn-mais">+</button>        
        `;
        const botaoMais = item.querySelector('.btn-mais');
        const botaoMenos = item.querySelector('.btn-menos');

        botaoMais.addEventListener('click', function() {

            produto.quantidade++;

            salvarCarrinho();
            atualizarCarrinho();
        });

        botaoMenos.addEventListener('click', function() {
            if (produto.quantidade > 1) {
                produto.quantidade--;
            }else {
                const indice = carrinho.indexOf(produto);

                carrinho.splice(indice, 1);
            }
            salvarCarrinho();
            atualizarCarrinho();
        });

        
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.classList.add('btn-remover');


        item.appendChild(botaoRemover);

        botaoRemover.addEventListener('click', function(){
            const indice = carrinho.indexOf(produto);            

            carrinho.splice(indice, 1);

            atualizarCarrinho();

            salvarCarrinho();
            
            totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
        });
    
        listaCarrinho.appendChild(item);
        });
        totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');

        atualizarContadorCarrinho();
};


function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
        if (carrinhoSalvo) {
            carrinho = JSON.parse(carrinhoSalvo);
        } else {
            carrinho = [];
        }
        atualizarCarrinho();
};


function atualizarContadorCarrinho() {

    
    let quantidadeTotal = 0;

    carrinho.forEach(function(produto){
        quantidadeTotal += produto.quantidade;
    });

    contador.textContent = quantidadeTotal;
};

carregarCarrinho();


//============================================================================================
//INICIALIZAÇÃO
//============================================================================================

// const carrinhoSalvo = localStorage.getItem('carrinho');

// if (carrinhoSalvo) {
//     carrinho = JSON.parse(carrinhoSalvo);
//     atualizarCarrinho();
// }

// window.addEventListener('focus', function () {
//     carregarCarrinho();
// });

   




