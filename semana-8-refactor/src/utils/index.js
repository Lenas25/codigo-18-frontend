import { tasks, saveTaskLocalStorage } from "../mock";
import { renderTasks,renderInnerTask } from "../render";
import { openModal } from "../modal";

export function validateInput(input) {
    //vamos a validar que el input no este vacio
    if (input.value.trim() === "") {
      input.classList.add("error");
      error.textContent = "Input can't be empty";
      return false;
    } else {
      input.classList.remove("error");
      error.textContent = "";
      return true;
    }
}

export function check(id) {
  const task = tasks.find((task) => task.id === id);
  task.status = 3;
  saveTaskLocalStorage();
  //busca el container lo limpia, busca la tarea por id y llama a la funcion render inner task
  cancelEdit(id);
}

//funcion para cancelar la edicion de la tarea, utilizamos find para buscar la tarea que se quiere cancelar por el id, y volvemos a renderizar la tarea a su estado inicial
export function cancelEdit(id) {
  //capturamos el contenedor
  const taskContainer = document.querySelector(`#task-${id}`);
  taskContainer.innerHTML = "";
  //como tenemos el id de la tarea puedo buscar el objeto en el array de tareas
  const task = tasks.find((task) => task.id === id);
  //vamos a renderizar la tarea de vuelta a su estado inicial
  taskContainer.innerHTML = renderInnerTask(task);
}


//funcion para eliminar la tarea, primero preguntamos si esta seguro de eliminar la tarea, si el id de la tarea es igual al id que le pasamos a la funcion lo eliminamos del array y volvemos a renderizar las tareas
export function del(id) {
  Swal.fire({
    title: "Do you want to delete the task?",
    showDenyButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't delete`,
  }).then((result) => {
    if (result.isConfirmed) {
      //se filtra el array principal por el id que le pasamos a la funcion y lo guardamos en el mismo array de tareas actualizandolo
      tasks = tasks.filter((task) => task.id !== id);
      saveTaskLocalStorage();
      renderTasks();
    } else if (result.isDenied) {
      Swal.fire("Task don't delete");
    }
  });
}

//funcion para guardar editar la tarea, primero validamos que el input no este vacio, luego buscamos la tarea por el id y actualizamos el nombre de la tarea, guardamos en localstorage y volvemos a renderizar solo la tarea guardada
export function saveEdit(id) {
  //capturamos el contenedor y el input
  const editInput = document.querySelector(`#input-task-edit-${id}`);

  if (editInput.value.trim() === "") return;

  //como tenemos el id de la tarea puedo buscar el objeto en el array de tareas
  const task = tasks.find((task) => task.id === id);
  //vamos a actualizar el nombre de la tarea
  task.name = editInput.value;
  saveTaskLocalStorage();

  //vamos a renderizar solo la tarea que se edito para ahorrar recursos
  cancelEdit(id);
}

export function edit(id) {
  const modalEdit = document.querySelector("#modal");
  openModal(modalEdit);
  //buscar a la tarea por id
  const inputEditTask = document.querySelector("#input-edit-task");
  const task= tasks.find((task) => task.id === id);
  inputEditTask.value = task.name;
  inputEditTask.setAttribute("data-id", id);
  inputEditTask.focus();
}