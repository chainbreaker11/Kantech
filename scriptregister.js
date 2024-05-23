const btn_registro = document.getElementById('submit');
const login_form= document.getElementById('login-form');
const url='http://localhost:3000/usuarios';

const guardardatos = () => {
    const datos = new FormData(login_form);
    const datosProcesados = Object.fromEntries(datos.entries());
    login_form.reset();
    return datosProcesados;
  };

const postdatos = async () => {
    const nuevousuario = guardardatos();
    try{
        const response = await fetch("http://localhost:3000/usuarios", {
            method: 'POST',
          /*especifica el tipo de informacion (JSON)*/
          headers: {'Content-Type': 'application/json'},
          /*coloca la informacion en el formato JSON */
          body: JSON.stringify(nuevousuario)
          });
      
          if (response.ok) {
            const jsonrespuesta = await response.json();
            const { nombre, email,  contrasena } = jsonrespuesta;
          }

    }catch(error){
        console.log(error);
    }
}

btn_registro.addEventListener('click',(event)=>{
    event.preventDefault();
    const pass=document.getElementById('contrasena').value;
    const repass=document.getElementById('recontrasena').value;

    console.log(pass);
    if(pass==repass&& pass.length !=0){
        postdatos();
        Swal.fire({
            title:"Usuario Registrado",
            icon:"success"
        })
    }else{
        Swal.fire({
            title:"Ahi algun error en los datos Ingresados ",
            icon:"warning"
        })
    }
    login_form.reset
})
