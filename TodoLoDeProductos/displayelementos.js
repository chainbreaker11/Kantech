// Obtener el archivo JSON
fetch('everyproduct.json')
  .then(response => response.json())
  .then(data => {
    // Detectar el nombre del archivo HTML actual
    const pathname = window.location.pathname;
    let lugar = '';

    if (pathname.includes('pc.html')) {
      lugar = 'computadora';
    } else if (pathname.includes('celulares.html')) {
      lugar = 'celular';
    } else if (pathname.includes('tablets.html')) {
      lugar = 'tablet';
    } else if (pathname.includes('perifericos.html')) {
      lugar = 'periferico';
    } else if (pathname.includes('almacenamiento.html')) {
      lugar = 'almacenamiento';
    }

    let productos = data.productos.filter(producto => producto.categoria === lugar);
    const productGrid = document.getElementById('product-grid');

    // Funciones de ordenamiento
    const sortByPrice = (order) => {
      if (order === 'price-ascending') {
        productos.sort((a, b) => a.costos.MXN - b.costos.MXN);
      } else if (order === 'price-descending') {
        productos.sort((a, b) => b.costos.MXN - a.costos.MXN);
      }
      renderProducts();
    };

    // Función de filtrado
    const filterProducts = () => {
      const categoriesFilter = Array.from(document.querySelectorAll(`input[type="checkbox"][value^='${lugar}']:checked`))
        .map(checkbox => checkbox.value.toLowerCase());
      const brandsFilter = Array.from(document.querySelectorAll('input[type="checkbox"][value^="Starforge"]:checked, input[type="checkbox"][value^="Samsung"]:checked, input[type="checkbox"][value^="Apple"]:checked, input[type="checkbox"][value^="Kingston"]:checked, input[type="checkbox"][value^="Amazon"]:checked'))
        .map(checkbox => checkbox.value.toLowerCase());

      productos = data.productos.filter(producto => {
        const categoria = producto.categoria.toLowerCase();
        const marca = producto.marca ? producto.marca.toLowerCase() : ''; // Si el campo marca existe
        return (categoriesFilter.length === 0 || categoriesFilter.includes(categoria)) &&
          (brandsFilter.length === 0 || brandsFilter.includes(marca));
      }).filter(producto => producto.categoria === lugar);

      renderProducts();
    };

    // Función para renderizar los productos
    const renderProducts = () => {
      productGrid.innerHTML = '';
      productos.forEach(producto => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-grid_item');

        const moneda = document.getElementById('moneda').value;
        let precio;
        let monedaValor;
        if (moneda === 'mxn') {
          precio = producto.costos.MXN;
          monedaValor = 'MXN';
        } else if (moneda === 'eur') {
          precio = producto.costos.EU;
          monedaValor = '€';
        } else if (moneda === 'usd'){
          precio = producto.costos.USD;
          monedaValor = 'USD';
        }

        const productCard = `
          <div class="product-card">
            <div class="product-card_image">
              <a href="${producto.enlace}">
                <img src="${producto.imagen}" alt="${producto.titulo}">
              </a>
            </div>
            <div class="product_card_description">
              <h2 class="product-card_title">
                <a class="product-card_title-link" href="${producto.enlace}">${producto.titulo}</a>
              </h2>
            </div>
            <div class="product-card_price-block card_price-block">
              <span class="card_current-price">${precio} ${monedaValor}</span>
            </div>
            <div class="product-card_buttons">
              <button class="product-form_submit primary-button">
                <span class="add-to-cart">+ Añadir al carrito</span>
              </button>
            </div>
          </div>
        `;

        productItem.innerHTML = productCard;
        productGrid.appendChild(productItem);
      });
    };

    // Renderizar los productos inicialmente
    renderProducts();

    // Evento de cambio en el select de ordenamiento
    document.getElementById('SortBy').addEventListener('change', (event) => {
      sortByPrice(event.target.value);
    });

    // Evento de cambio en los checkboxes de filtrado
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
    });

    // Evento de cambio en el select de moneda
    document.getElementById('moneda').addEventListener('change', renderProducts);
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));
