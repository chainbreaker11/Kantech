// Cargar los datos del archivo JSON
async function cargarInfoProductos() {
  const respuesta = await fetch('productos.json');
  const productos = await respuesta.json();
  mostrarProductos(productos);
}
  
// Mostrar los productos en cartas
function mostrarProductos(productos) {
  const gridProductos = document.querySelector('.productosGrid');
  gridProductos.innerHTML = '';

  productos.forEach(product => {
    const cartaProducto = document.createElement('div');
    cartaProducto.classList.add('cartaProducto');
    cartaProducto.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button class="agregarAlCarrito">Agregar al carrito</button>
    `;
    gridProductos.appendChild(cartaProducto);
  });
}
  
// Filtrado de los productos por categoria
function filtrarProductos(precioMin, precioMax) {
  const filtrosDeCategoria = Array.from(document.querySelectorAll('.filtrosCategoria input:checked')).map(input => input.id);

  fetch('productos.json')
    .then(respuesta => respuesta.json())
    .then(productos => {
      const productosFiltrados = productos.filter(product => {
        const coincideCategoria = !filtrosDeCategoria.length || filtrosDeCategoria.includes(product.category);
        const coincidePrecio = product.price >= precioMin && product.price <= precioMax;
        return coincideCategoria && coincidePrecio;
      });
      mostrarProductos(productosFiltrados);
    })
    .catch(error => console.error('Error al cargar los productos:', error));
}
  
// Filtrado de los productos por medio de los enlaces con precios o con el rango personalziado 
document.querySelectorAll('.filtros input').forEach(input => {
  input.addEventListener('change', () => filtrarProductos(0, 999999));
});
 
document.querySelectorAll('.filtroDePrecio').forEach(link => {
link.addEventListener('click', (event) => {
    event.preventDefault();
    const precioMin = link.dataset.min ? parseInt(link.dataset.min) : 0;
    const precioMax = link.dataset.max ? parseInt(link.dataset.max) : 999999;
    filtrarProductos(precioMin, precioMax);
  });
});
  
const BtnAplicarRangoPrecio = document.getElementById('aplicarRango');
BtnAplicarRangoPrecio.addEventListener('click', () => {
  const precioMin = document.getElementById('precioMin').value || 0;
  const precioMax = document.getElementById('precioMax').value || 999999;
  filtrarProductos(parseInt(precioMin), parseInt(precioMax));
  document.getElementById('precioMin').value = '';
  document.getElementById('precioMax').value = '';
});
  
// Cargar la info de los productos
cargarInfoProductos();