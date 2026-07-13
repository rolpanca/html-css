const modal = document.querySelector('.modal');
const botoesDetalhes = document.querySelectorAll('.btn-detalhes');
const botaoFechar = document.querySelector('.fechar');
const listaCarrinho = document.getElementById('lista-carrinho');
const botoesComprar = document.querySelectorAll('.btn-comprar');

let total = 0;

const totalCarrinho = document.querySelector('.total');

let carrinho = [];



botoesComprar.forEach(function(botao){

    botao.addEventListener('click', function(event) {

        event.preventDefault();

        const produto = botao.closest('.produto');

        console.log(produto);

        const nome = produto.querySelector('h2').textContent;
        const preco = produto.querySelector('.preco').textContent;
        const imagem = produto.querySelector('img').src;


        const valor = Number(preco.replace('R$', '').replace(',', '.'));

        const produtoExistente = carrinho.find(function(item) {
            return item.nome === nome;
        });

        console.log('Nome clicado:', nome);
        console.log('produto encontrado:', produtoExistente);

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

        console.log(carrinho);

        total += valor;
        totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2).replace('.' ,',');

        /*
        const item = document.createElement('li');

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';

        item.textContent = nome + ' - ' + preco;*/

        // item.appendChild(botaoRemover);
        
        // botaoRemover.addEventListener('click', function(){

        //     total -= valor;

        //     listaCarrinho.removeChild(item);
        //     totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');

        //     if(listaCarrinho.children.length === 0){
        //         listaCarrinho.innerHTML = '<li>Seu carrinho está vazio</li>';
        //     }

        // });


        // if(listaCarrinho.textContent.includes("Seu carrinho está vazio")){
        //     listaCarrinho.innerHTML = '';
        // };
      
        // listaCarrinho.appendChild(item);

        console.log(listaCarrinho);
       
        console.log("clique no botão Comprar");
    });
    
});



botoesDetalhes.forEach(function(botao) {
    botao.addEventListener('click', function() {        
        const produto = botao.closest('.produto');
        const nome = produto.querySelector('h2').textContent;
        const imagem = produto.querySelector('img').src;
        const preco = produto.querySelector('.preco').textContent
        const descricao = produto.querySelector('p:last-of-type').textContent;
        

        console.log(produto);
        console.log(nome);

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

const slides = document.querySelectorAll('.slide');
let index = 0;

function trocarBanner() {
    slides[index].classList.remove('ativo');
    console.log(index);

    index++;

    if (index >= slides.length) {
        index = 0;
    }

    slides[index].classList.add('ativo');    
}
setInterval(trocarBanner, 3000);

function atualizarCarrinho() {
    total = 0;
    listaCarrinho.innerHTML = '';   

    carrinho.forEach(function(produto){

        total += produto.preco * produto.quantidade;

        const item = document.createElement('li');

        item.innerHTML = `
        ${produto.nome} - R$ ${produto.preco.toFixed(2).replace('.', ',')}
        <strong>x${produto.quantidade}</strong>
        `;

     const botaoRemover = document.createElement('button');
     botaoRemover.textContent = 'Remover';

     item.appendChild(botaoRemover);

     botaoRemover.addEventListener('click', function(){
        const indice = carrinho.indexOf(produto);

        // total -= produto.preco * produto.quantidade;

        carrinho.splice(indice, 1);

        atualizarCarrinho();

        salvarCarrinho();
        
        totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
    });
  
    listaCarrinho.appendChild(item);
    });
    totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
};


function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

const carrinhoSalvo = localStorage.getItem('carrinho');

    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);

        atualizarCarrinho();
    };




