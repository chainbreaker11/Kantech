const pathname = window.location.pathname;
let ruta = "";

if (pathname.includes("Mainpage.html")) {
  ruta = "TodoLoDeProductos/everyproduct.json";
} else {
  ruta = "../TodoLoDeProductos/everyproduct.json";
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(ruta)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const products = data.productos;
      const searchInput = document.getElementById("search-input");
      const suggestionsContainer = document.getElementById("suggestions");

      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        suggestionsContainer.innerHTML = "";
        if (query.length > 0) {
          const filteredProducts = products.filter((product) =>
            product.titulo.toLowerCase().includes(query)
          );
          filteredProducts.forEach((product) => {
            const suggestionDiv = document.createElement("div");
            suggestionDiv.textContent = product.titulo;
            suggestionDiv.addEventListener("click", () => {
              if (pathname.includes("Mainpage.html")) {
                window.location.href = `TodoLoDeProductos/${product.enlace}`;
              } else {
                window.location.href = product.enlace;
              } 
            });
            suggestionsContainer.appendChild(suggestionDiv);
          });
        }
      });
    })
    .catch((error) => console.error("Error fetching the products:", error));
});
