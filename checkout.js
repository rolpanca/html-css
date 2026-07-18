const listaCheckout = document.getElementById('lista-checkout');
const totalCheckout = document.getElementById('total-checkout');
const btnFinalizar = document.getElementById('btn-finalizar');

const pagamento = document.querySelectorAll('input[nome="pagamento"]');


console.log(pagamento);
console.log(pagamento.length);


const nome = document.getElementById('name');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');

const cep = document.getElementById('cep');
const rua = document.getElementById('rua');
const numero = document.getElementById('numero');
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');

let carrinho = [];

function atualizarCheckout(){

    listaCheckout.innerHTML = '';
    let total = 0;

    carrinho.forEach(function(produto){

        total += produto.preco * produto.quantidade;

        const item = document.createElement('div');

        item.classList.add('item-checkout');

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="info-checkout">
                <h3>${produto.nome}</h3>
                <p>Quantidade: ${produto.quantidade}</p>
            </div>

            <span>
                R$ ${(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')}
            </span>    
        `;
        listaCheckout.appendChild(item);
    });

    totalCheckout.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
};

const carrinhoSalvo = localStorage.getItem('carrinho');

    if(carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    };
    atualizarCheckout();

    btnFinalizar.addEventListener('click', function() {
        
        if (
            nome.value === '' ||
            email.value === '' ||
            telefone.value === '' ||
            cep.value === '' ||
            rua.value === '' ||
            numero.value === '' ||
            bairro.value === '' ||
            cidade.value === '' ||
            estado.value === '' 
        ) {
            alert('Preencha todos os campos obrigatóros!');
            return;
        }

        let pagamentoSelecionado = false;

        pagamento.forEach(function(opcao) {
            if (opcao.checkoud) {
                pagamentoSelecionado = true;
            }
        });

        if (!pagamentoSelecionado) {
            alert('Selecione um forma de pagamento!');

            return;
        }

        btnFinalizar.disabled = true;
        btnFinalizar.textContent = 'Processando...';

        localStorage.removeItem('carrinho');

        carrinho = [];

        setTimeout(function() {
            window.location.href = 'confirmacao.html';
        }, 2000);

        
    });