document.addEventListener("DOMContentLoaded", () => {
  // Obtener el nombre del archivo HTML sin la extensión
  const currentHtmlFile = window.location.pathname
    .split("/")
    .pop()
    .split(".")[0];

  // Extraer el número del nombre del archivo HTML, asumiendo formato "producto1", "producto2", etc.
  const productId = parseInt(currentHtmlFile.replace("producto", ""));

  // Obtener el archivo JSON
  fetch("everyproduct.json")
    .then((response) => response.json())
    .then((data) => {
      // Encontrar el producto con el ID correspondiente
      const producto = data.productos.find((p) => p.id === productId);

      // Si se encuentra el producto, actualizar el HTML con sus datos
      if (producto) {
        const imgElement = document.querySelector(".product-image img");
        const titleElement = document.querySelector(".product-title h1");
        const priceElement = document.querySelector(".product-price span");
        const descriptionElement = document.querySelector(
          ".product-description p"
        );
        const currencySelect = document.getElementById("moneda");

        imgElement.src = producto.imagen;
        titleElement.textContent = producto.titulo;
        descriptionElement.textContent = producto.descripcion;

        // Función para actualizar el precio según la moneda seleccionada
        const updatePrice = () => {
          const selectedCurrency = currencySelect.value;
          let precio;
          let monedaValor;

          if (selectedCurrency === "mxn") {
            precio = producto.costos.MXN;
            monedaValor = "MXN";
          } else if (selectedCurrency === "eur") {
            precio = producto.costos.EU;
            monedaValor = "€";
          } else if (selectedCurrency === "usd") {
            precio = producto.costos.USD;
            monedaValor = "USD";
          }

          priceElement.textContent = `${precio} ${monedaValor}`;
        };

        // Actualizar el precio al cargar la página
        updatePrice();

        // Actualizar el precio cuando se cambia la moneda
        currencySelect.addEventListener("change", updatePrice);
      } else {
        console.error("Producto no encontrado");
      }
    })
    .catch((error) => console.error("Error al cargar el archivo JSON:", error));
});
