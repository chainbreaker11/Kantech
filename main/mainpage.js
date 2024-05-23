// Variable que mantiene el estado visible del carrito
let carritoVisible = false;

// Esperamos que todos los elementos de la página carguen para ejecutar el script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Agregamos funcionalidad a los botones eliminar del carrito
    const botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        const button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Agregamos funcionalidad al botón sumar cantidad
    const botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        const button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Agregamos funcionalidad al botón restar cantidad
    const botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        const button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Agregamos funcionalidad al botón Agregar al carrito
    const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        const button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

// Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
    alert("Gracias por la compra");
    // Elimino todos los elementos del carrito
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

// Función que controla el botón clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
    const button = event.target;
    const item = button.parentElement.parentElement;
    const titulo = item.getElementsByClassName('product-title')[0].innerText;
    const precio = item.getElementsByClassName('precio-item')[0].innerText;
    const imagenSrc = item.parentElement.getElementsByClassName('product-image')[0].getElementsByTagName('img')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

// Función que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    const carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    const items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

// Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const item = document.createElement('div');
    item.classList.add = ('item');
    const itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Controlamos que el item que intenta ingresar no se encuentre en el carrito
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

    // Agregamos la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // Agregamos la funcionalidad restar cantidad del nuevo item
    const botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    // Agregamos la funcionalidad sumar cantidad del nuevo item
    const botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // Actualizamos total
    actualizarTotalCarrito();
}

// Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

// Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    // Actualizamos el total del carrito
    actualizarTotalCarrito();

    // La siguiente función controla si hay elementos en el carrito
    // Si no hay elimino el carrito
    ocultarCarrito();
}

// Función que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
        const carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        const items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

// Actualizamos el total del Carrito
function actualizarTotalCarrito() {
    const carritoItems = document.getElementsByClassName('carrito-item');
    let total = 0;

    for (let i = 0; i < carritoItems.length; i++) {
        const item = carritoItems[i];
        const precioElemento = item.querySelector('.carrito-item-precio');
        const precio = parseFloat(precioElemento.innerText.replace(/[^\d.]/g, '')); // Eliminar símbolos no numéricos
        const cantidadItem = item.querySelector('.carrito-item-cantidad');
        const cantidad = parseInt(cantidadItem.value);

        if (!isNaN(precio) && !isNaN(cantidad)) {
            total += precio * cantidad;
        }
    }

    const totalCarritoElemento = document.getElementById('total-carrito');
    totalCarritoElemento.innerText = '$' + total.toLocaleString("es", { minimumFractionDigits: 2 }) + ",00";
}
