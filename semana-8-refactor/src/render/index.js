import { tasks } from "../mock";
import { check, del, edit } from "../utils";

export function renderTasks(containerTask) {
  //limpiar el container para no duplicar
  //innerHTML sirve para agregar contenido html pero text content sirve para agregar texto
  containerTask.innerHTML = "";

  //iterar al array de tareas
  tasks.forEach((task) => {
    containerTask.innerHTML += `
          <div
          id="task-${task.id}"
          class="flex justify-between items-center px-4 py-3 bg-white rounded-lg border border-purple-500">
            ${renderInnerTask(task)}
          </div>
          `;
    if (task.status !== 3) {
      document.querySelector(`#task-${task.id} .check`).onclick = () =>
        check(task.id);
      document.querySelector(`#task-${task.id} .delete`).onclick = () =>
        del(task.id);
      document.querySelector(`#task-${task.id} .edit`).onclick = () =>
        edit(task.id);
    }
  });
}

export function renderInnerTask(task) {
  const taskCreated = `
    <h3>${task.name}</h3>
      <div class="flex gap-5">
        <button class="check">✅</button>
        <button data-id="${task.id}" class="edit">📝</button>
        <button class="delete">🗑️</button>
      </div>
    `;

  const taskDone = `
      <h3 class="line-through font-thin text-gray-500">${task.name}</h3>
    `;

  //funcion para validar si la tarea esta finalizada con estado 3 y utilizar otro template string
  return task.status === 3 ? taskDone : taskCreated;
}
