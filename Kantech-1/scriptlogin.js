/*esta es la parte del login */
const url = "http://localhost:3000/usuarios";
const emailvalor = document.getElementById('email');
const passworvalor = document.getElementById('contrasena');

const btn_login = document.getElementById('submit');

btn_login.addEventListener('click', function (event) {
    event.preventDefault();
   
    
    fetch('http://localhost:3000/usuarios')
    .then((res)=>res.json())
    .then((data) => {
     let r=data.find((item)=>{
      if(item.email == emailvalor.value){
        if(item.contrasena == passworvalor.value){
          location.href='index.html';
        }
        
        
  
      }
      
     });
     
    
      
    } );
});


