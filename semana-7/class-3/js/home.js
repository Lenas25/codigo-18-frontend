/** 
 * como podemos acceder a una variable que esta en localStorage
 * el localStorage se guarda de forma global por dominio, es decir que 
 * si guardamos un elemento en el localstorage en una pagina, podemos 
 * acceder a ese elemento en otra pagina y eso se guarda por dominio tambien
 */

const user=localStorage.getItem('user');

//OJO: cuando buscamos un elemento que no existe en localStorage
// nos retorna null

if(!user){
   location.href='http://127.0.0.1:5500/semana-7/class-3/index.html';
}

const nameUser=document.querySelector('#name');

//para convertir un string a un objeto usamos JSON.parse
const userObj=JSON.parse(user);

//ahora podemos acceder a las propiedades del objeto userObj y mostrarlas en el html
nameUser.textContent=userObj.name;

//para cerrar sesion
const btnLogout=document.querySelector('#btn-logout');

btnLogout.onclick=()=>{
    //primero mostramos una alterta para confirmar si quiere cerrar sesion
    Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out",
        showCancelButton: true,
        cancelButtonText: "No, cancel",
        confirmButtonText: "Yes, log out",
    }).then((value) => {
        if(!value.isConfirmed){
            return;
        }

        //remove item solo elimina un elemento basado en el key y clear elimina todo el localstorage
        localStorage.clear();
        location.href="http://127.0.0.1:5500/semana-7/class-3/index.html"
    });
}