document.addEventListener('DOMContentLoaded', function() {
    let carritoVisible = false;

    const carritoIcon = document.getElementById('carrito-icon');
    const carrito = document.getElementById('carrito');
    const btnPagar = document.getElementsByClassName('btn-pagar')[0];

    carritoIcon.addEventListener('click', function() {
        toggleCarrito();
    });

    const botonesAgregarAlCarrito = document.getElementsByClassName('add-to-cart-btn');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        const button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    btnPagar.addEventListener('click', pagarClicked);
});

function agregarAlCarritoClicked(event) {
    const button = event.target;
    const item = button.parentElement;
    const titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    const precio = item.getElementsByClassName('precio-item')[0].innerText;
    const imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    const itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    const nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText === titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    const itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    const btnEliminar = item.getElementsByClassName('btn-eliminar')[0];
    const btnRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    const btnSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];

    btnEliminar.addEventListener('click', eliminarItemCarrito);
    btnRestarCantidad.addEventListener('click', restarCantidad);
    btnSumarCantidad.addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();
}

function hacerVisibleCarrito() {
    carritoVisible = true;
    const carrito = document.getElementById('carrito');
    carrito.classList.add('visible');
    carrito.classList.remove('oculto');
}

function pagarClicked() {
    alert("Gracias por la compra");
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

function ocultarCarrito() {
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
        const carrito = document.getElementById('carrito');
        carrito.classList.add('oculto');
        carrito.classList.remove('visible');
        carritoVisible = false;
    }
}

function actualizarTotalCarrito() {
    const carritoItems = document.getElementsByClassName('carrito-item');
    let total = 0;
    for (let i = 0; i < carritoItems.length; i++) {
        const item = carritoItems[i];
        const precioElemento = item.querySelector('.carrito-item-precio');
        const precio = parseFloat(precioElemento.innerText.replace(/[^\d.]/g, ''));
        const cantidadItem = item.querySelector('.carrito-item-cantidad');
        const cantidad = parseInt(cantidadItem.value);

        if (!isNaN(precio) && !isNaN(cantidad)) {
            total += precio * cantidad;
        }
    }
    const totalCarritoElemento = document.getElementById('total-carrito');
    totalCarritoElemento.innerText = '$' + total.toLocaleString("es", { minimumFractionDigits: 2 });
}

function sumarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

function restarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}
