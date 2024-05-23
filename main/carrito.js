const currencyRates = {
    mxn: 1,
    usd: 0.052,
    eur: 0.048
  };
  
  let cart = [];
  let currentCurrency = 'mxn';
  let itemToDelete = null;
  
  // Función para cargar el carrito desde el Local Storage al cargar la página
  function loadCartFromLocalStorage() {
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      cart = JSON.parse(cartFromStorage);
      renderCart(); // Renderizar el carrito después de cargarlo desde el almacenamiento local
    }
  }
  
  // Llama a loadCartFromLocalStorage() cuando se carga la página para cargar el carrito desde el almacenamiento local
  document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);
  
  function addToCart(productName, price, imageUrl) {
    console.log('Adding to cart:', productName, price, imageUrl); // Debugging line
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name: productName, price: price, quantity: 1, image: imageUrl });
    }
    renderCart();
    showNotification('Producto añadido al carrito');
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartOffcanvas.show();
    updateLocalStorage(); // Actualizar el Local Storage después de modificar el carrito
  }
  
  function confirmDelete(productName) {
    itemToDelete = productName;
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    confirmModal.show();
  }
  
  document.getElementById('confirmDelete').addEventListener('click', () => {
    removeFromCart(itemToDelete);
    const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
    confirmModal.hide();
  });
  
  function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    renderCart();
    updateLocalStorage(); // Actualizar el Local Storage después de modificar el carrito
  }
  
  function emptyCart() {
    cart = [];
    renderCart();
    updateLocalStorage(); // Actualizar el Local Storage después de modificar el carrito
  }
  
  function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function changeCurrency() {
    currentCurrency = document.getElementById('moneda').value;
    const priceElement = document.getElementById('product-price');
    const basePrice = parseFloat(priceElement.getAttribute('data-price-mxn'));
    const convertedPrice = (basePrice * currencyRates[currentCurrency]).toFixed(2);
    const currencySymbol = getCurrencySymbol(currentCurrency);
    priceElement.textContent = `${currencySymbol}${convertedPrice} ${currentCurrency.toUpperCase()}`;
    renderCart();
  }
  
  function getCurrencySymbol(currency) {
    switch (currency) {
      case 'usd':
        return '$';
      case 'eur':
        return '€';
      default:
        return '$';
    }
  }
  
  function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach(item => {
      const convertedPrice = (item.price * currencyRates[currentCurrency]).toFixed(2);
      const currencySymbol = getCurrencySymbol(currentCurrency);
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      listItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
        ${item.name} - ${currencySymbol}${convertedPrice} ${currentCurrency.toUpperCase()} x ${item.quantity}
        <button class="btn btn-danger btn-sm" onclick="confirmDelete('${item.name}')">Eliminar</button>
      `;
      cartItems.appendChild(listItem);
    });
  }
  
  function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }
  
  function checkout() {
    alert('Compra realizada con éxito.');
    cart = [];
    renderCart();
    updateLocalStorage(); // Limpiar el Local Storage después de realizar la compra
  }
  function checkout() {
    if (cart.length === 0) {
      showNotification('No se puede realizar la compra. El carrito está vacío.');
      return;
    }
    alert('Compra realizada con éxito.');
    cart = [];
    renderCart();
    updateLocalStorage(); // Limpiar el Local Storage después de realizar la compra
  }
  document.querySelector('.ri-shopping-cart-line').addEventListener('click', () => {
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartOffcanvas.show();
  });