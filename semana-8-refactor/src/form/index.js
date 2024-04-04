import { validateInput } from "../utils";
import { tasks, saveTaskLocalStorage } from "../mock";
import { renderTasks } from "../render";

/**
 * Si queremos usar esta funcion en otro archivo requerimos exportar dicha funcion
 */
export function createTask(element, inputTask, containerTask) {
  element.onsubmit = function (event) {
    event.preventDefault();
    if (!validateInput(inputTask)) return;

    //vamos a crear el objeto de tarea
    const task = {
      id: tasks.length + 1,
      name: inputTask.value.trim(),
      status: 1,
      //fecha de creacion
      createdAt: new Date(),
    };

    tasks.push(task);
    inputTask.value = "";
    //guardar en localstorage
    saveTaskLocalStorage();
    //vamos a renderizar las tareas
    renderTasks(containerTask);
  };
}

export function inputEmpty(inputTask){
    inputTask.onkeyup = () => validateInput(inputTask);
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