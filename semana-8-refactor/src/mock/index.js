//vamos a validar en funcion si existe el localstorage, si no existe retorna un null
let validateExistLocalStorage = () => localStorage.getItem("tasks");

//vamos a crear un array de objectos para guardar las tareas
export let tasks = validateExistLocalStorage()
  ? [...JSON.parse(localStorage.getItem("tasks"))]
  : [];

export function saveTaskLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
