import { BASE_URL } from "./config";

//funcion asincrona y se llama asi ya que se va a hacer una peticion a una api y se va a esperar la respuesta a veces puede demorar
//es una function get con fetch que es un metodo de get en http
export const getTasks = async () => {
  //fetch es una funcion que recibe una url y retorna una promesa, la promesa es un objeto que tiene un metodo then que recibe una funcion que se ejecuta cuando la promesa se resuelve y un metodo catch que recibe una funcion que se ejecuta cuando la promesa se rechaza
  const response = await fetch(BASE_URL);
  //response.json() retorna una promesa en formato json, extraer la informacion del servidor, como response es un objeto pero ninguno del sus propiedades te da la data por eso se usa el metodo json para acceder a la data
  const tasks = await response.json();
  return tasks;
}

export const createTask = async (task) => {
  const response = await fetch (BASE_URL, {
    //pasa otro parametro que es un objeto que tiene un metodo method que es el metodo http que se va a utilizar
    method: "POST", 
    //el body es la informacion que se va a enviar al servidor, se envia en formato json
    body: JSON.stringify(task),
    //se envia el tipo de contenido
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json();
  return data;
}

export const updateTask = async (task) => {
  const responde = await fetch(`${BASE_URL}/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await responde.json();
  return data;
}


export const deleteTask = async (task) => {
  const responde = await fetch(`${BASE_URL}/${task.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await responde.json();
  return data;
}