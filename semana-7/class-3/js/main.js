const form = document.querySelector('form');

/**
 * Como hacemos para poder captura el evento submit del formulario?
 * 
 * sencillo, solo debemos usar el evento onsubmit, ahora recordemos que este
 * evento es solo de los formularios
 */

form.onsubmit = function (event) {
    /**
     * Los formularios tienen la tendencia a 
     * recargar la pagina porque antiguamente al 
     * enviar un formulario se mostraba una nueva 
     * pagina con la respuesta del servidor, pero 
     * ahora con el uso de AJAX y otras tecnologias 
     * ya no es necesario recargar la pagina, por 
     * lo que debemos evitar que el formulario 
     * recargue la pagina, para evitar eso se usa 
     * la funcion preventDefault
     */

    event.preventDefault();

    /**
     * Ahora que ya evitamos que el formulario, 
     * al presionar el boton, el evento se 
     * covertira en un objeto de tipo event,
     * este objeto tiene una propiedad llamada
     * target, que es el formulario que se
     * esta enviando, por lo que podemos
     * acceder a los valores de los inputs
     * del formulario
     * 
     * Convertimos a un array los elementos, lo 
     * filtramos por los que existe y luego 
     * mapeamos para obtener el valor de cada input
     */
    const formInfo=Array.from(event.target)
    .filter((input)=>input.value)
    .map((input)=>input.value);

    /**
     * Destructuring, es una forma de obtener los 
     * valores de un array o un objeto, en este 
     * caso estamos obteniendo los valores del
     * array formInfo
     */
    const [email, password] = formInfo;

    /**
     * Debemos buscar dentro del array de usuarios la info basa en el email y el password
     */

    const result= users.find((user=> user.email===email && user.password===password));

    if(!result){
        //mostrar alerta si es que no existe el usuario
        //libreria de sweet alert
        Swal.fire({
            icon: "error",
            title: "There was an error!",
            text: "Email or password is incorrect"
        });

        return;
    } 

    //vamos a guardar al usuario en el localstorage

    /**
     * 
     * localStorage.setItem('key', 'value');
     * esto recuerden es para crear un elemento en el localstorage
     * 
     * para convertir un objeto a un string usamos JSON.stringify
     */

    localStorage.setItem('user', JSON.stringify(result));

    //redireccionar a la pagina home
    location.href="http://127.0.0.1:5500/semana-7/class-3/home.html";

}