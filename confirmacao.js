const numeroPedido = localStorage.getItem('numeroPedido');
const campNumero = document.getElementById('numero-pedido');

campNumero.textContent = '#' + numeroPedido;