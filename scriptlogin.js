/*esta es la parte del login */
const url = "http://localhost:3000/usuarios";
const emailvalor = document.getElementById("email");
const passworvalor = document.getElementById("contrasena");

const btn_login = document.getElementById("submit");

btn_login.addEventListener("click", function (event) {
  event.preventDefault();

  fetch("http://localhost:3000/usuarios")
    .then((response) => response.json())
    .then((data) => {

      console.log(data);
      let user = data.find((item) => item.email === email.value);
      let pasword = data.find(
        (item) => item.password === passworvalor.value
      );

      if (user.email == email.value) {
        console.log("entro en email");
        if (pasword.password == passworvalor.value) {
          console.log("entro en pasword");
          location.href = "index.html";
        }
      } else {
      }
    })
    .catch((error) => {
      console.log(error);
      // Manejar el caso en que hay un error al fetch o parsear el JSON
    });
});

