//variables para form e input
const form = document.querySelector("#form");
const inputTask = document.querySelector("#input-task");
const error = document.querySelector("#error");

//variables para el container
const containerTask = document.querySelector("#container-task");

const modal= document.querySelector("#modal");
const inputEditTask = document.querySelector("#input-edit-task");
const formEdit= document.querySelector("#form-edit");
//cuando iniciemos vamos a colocar la clase hidden
modal.classList.add("hidden");

//vamos a validar en funcion si existe el localstorage, si no existe retorna un null
const validateExistLocalStorage = () => localStorage.getItem("tasks");

//vamos a crear un array de objectos para guardar las tareas
let tasks = validateExistLocalStorage()
  ? [...JSON.parse(localStorage.getItem("tasks"))]
  : [];

//vamos a capturar el evento onsubmit de form
/**
 * Estados
 * 1 = creado
 * 2 = en proceso
 * 3 = finalizado
 */
form.onsubmit = (event) => {
  //vamos a evitar que el form se recargue la pagina
  event.preventDefault();

  //

  if (!validateInput()) return;

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
  renderTasks();
};

inputTask.onkeyup = () => validateInput();

function validateInput() {
  //vamos a validar que el input no este vacio
  if (inputTask.value.trim() === "") {
    inputTask.classList.add("border", "border-red-500");
    error.textContent = "El campo no puede estar vacio";
    return false;
  } else {
    inputTask.classList.remove("border", "border-red-500");
    error.textContent = "";
    return true;
  }
}

function renderInnerTask(task){
  const taskCreated= `
  <h3>${task.name}</h3>
    <div class="flex gap-5">
      <button onclick="check(${task.id})">✅</button>
      <button onclick="edit(${task.id})">📝</button>
      <button onclick="del(${task.id})">🗑️</button>
    </div>
  `

  const taskDone = `
    <h3 class="line-through font-thin text-gray-500">${task.name}</h3>
  `

  //funcion para validar si la tarea esta finalizada con estado 3 y utilizar otro template string
  return task.status === 3 ? taskDone : taskCreated;
}

function renderTasks() {
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
  });
}

function saveTaskLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//funcion para cambiar el estado de la tarea a finalizado y volvemos a renderizar las tareas
function check(id) {
  const task = tasks.find((task) => task.id === id);
  task.status = 3;
  saveTaskLocalStorage();
  //busca el container lo limpia, busca la tarea por id y llama a la funcion render inner task
  cancelEdit(id);
}

//funcion para editar la tarea, recorremos el array de tareas y si el id de la tarea es igual al id que le pasamos a la funcion, cambiamos el nombre de la tarea y volvemos a renderizar las tareas
function editWithoutModal(id) {
  //primero evaluamos que la tarea no este finalizada
  const task = tasks.find((task) => task.id === id);

  //vamos a editar de forma inline
  //variable del contenedor de la tarea
  const taskContainer = document.querySelector(`#task-${id}`);
  taskContainer.innerHTML = "";
  //ahora vamos a reemplazar ese html por uno que tenga un input y dos botones
  const html = `
  <div class="flex items-center justify-between w-full gap-4">
    <div class="flex-1">
      <input type="text" id="input-task-edit-${id}" class="outline-none w-full" placeholder="Edit Task">
    </div>
    <div class="flex items-center gap-5">
      <button onclick="saveEdit(${id})">💾</button>
      <button onclick="cancelEdit(${id})">❌</button>
    </div>
  </div>
  `;

  taskContainer.innerHTML = html;
}


function edit(id) {
  modal.classList.remove("hidden");
  //buscar a la tarea por id
  const task= tasks.find((task) => task.id === id);
  inputEditTask.value = task.name;
  inputEditTask.setAttribute("data-id", id);
  inputEditTask.focus();
}

function closeModal(){
  modal.classList.add("hidden");
}

formEdit.onsubmit = (event) => {
  event.preventDefault();
  const id= Number(inputEditTask.getAttribute("data-id"));
  const task= tasks.find((task) => task.id === id);
  task.name= inputEditTask.value;
  saveTaskLocalStorage();
  closeModal();
  cancelEdit(id);
}

//funcion para guardar editar la tarea, primero validamos que el input no este vacio, luego buscamos la tarea por el id y actualizamos el nombre de la tarea, guardamos en localstorage y volvemos a renderizar solo la tarea guardada
function saveEditWithModal(id) {
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

//funcion para cancelar la edicion de la tarea, utilizamos find para buscar la tarea que se quiere cancelar por el id, y volvemos a renderizar la tarea a su estado inicial
function cancelEdit(id) {
  //capturamos el contenedor
  const taskContainer = document.querySelector(`#task-${id}`);
  taskContainer.innerHTML = "";
  //como tenemos el id de la tarea puedo buscar el objeto en el array de tareas
  const task = tasks.find((task) => task.id === id);
  //vamos a renderizar la tarea de vuelta a su estado inicial
  taskContainer.innerHTML = renderInnerTask(task);
}

//funcion para eliminar la tarea, primero preguntamos si esta seguro de eliminar la tarea, si el id de la tarea es igual al id que le pasamos a la funcion lo eliminamos del array y volvemos a renderizar las tareas
function del(id) {
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

renderTasks();
