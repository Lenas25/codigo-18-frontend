import { useState } from "react";
import { InputTask, Modal } from "./components";
import { tasks, saveTaskLocalStorage } from "../utils";

export default function App() {
  // Es el estado de la lista de tareas
  const [listTasks, setListTask] = useState(tasks);
  // Es el estado del input
  const [task, setTask] = useState("");
  // Es el estado del modal
  const [openModal, setOpenModal] = useState(false);
  // creamos una variable para saber a que tarea le dimos click
  const [currentTask, setCurrentTask] = useState(null);

  // Funcion que se encarga de capturar el valor del input
  const handleInputTask = (event) => {
    setTask(event.target.value);
  };

  const handleListTask = (task) => {
    task.id = listTasks.length + 1;
    const newTask = [...listTasks, task];
    // cuando la funcion terminar recien se va a actualizar el estado
    setListTask(newTask);
    saveTaskLocalStorage(newTask);
    setTask("");
  };

  const handleCurrentTask = (task) => {
    //paso 1: abrir el modal
    setOpenModal(true);
    setCurrentTask(task);
  };

  const handleSaveEditedTask = (task, editedText) => {
    //buscamos la tarea que queremos editar
    //cuando hacemos la busque el searchTask es elemento del listTasks, si altero el searchTask tambien altero el listTasks porque es una referencia a la memoria
    const searchTask = listTasks.find((element) => element.id === task.id);
    //editamos el nombre de la tarea
    searchTask.name = editedText;

    //guardamos en localstorage
    saveTaskLocalStorage(listTasks);
    setOpenModal(false);
  };

  const handleCheckTask = (task) => {
    //buscamos la tarea que queremos editar
    const searchTask = listTasks.find((element) => element.id === task.id);
    //editamos el nombre de la tarea
    searchTask.status = 3;

    //guardamos en localstorage
    saveTaskLocalStorage(listTasks);
    //para volver a renderizar la vista
    //se renderiza la vista ya que se cambio el estado y cuando se cambia un estado se renderiza la vista
    setListTask([...listTasks]);
  };

  const handleTaskStatus = (task) => {
    return task.status === 3 ? (
      <>
        <h3 className="line-through font-thin text-gray-500">
          {task.name}
        </h3>
      </>
    ) : (
      <>
        <h3>{task.name}</h3>
        <div className="flex gap-5">
          <button onClick={() => handleCheckTask(task)}>✅</button>
          <button onClick={() => handleCurrentTask(task)}>📝</button>
          <button>🗑️</button>
        </div>
      </>
    )
};

  return (
    <>
      <main className="max-w-md mx-auto p-6">
        <InputTask
          task={task}
          handleInputTask={handleInputTask}
          handleListTask={handleListTask}
        />
        <span
          id="error"
          className="text-xs text-red-500 mt-2 font-semibold"></span>
        <section id="container-task" className="mt-10 flex flex-col gap-5">
          {/* es para recorrer la lista de tareas y renderizarlas  */}
          {listTasks.map((task) => (
            <div
              key={task.id}
              id="task-${task.id}"
              className="flex justify-between items-center px-4 py-3 bg-white rounded-lg border border-purple-500">
              {handleTaskStatus(task)}
            </div>
          ))}
        </section>
      </main>
      {/* si currentTask existe entonces se renderiza el modal */}
      {currentTask && (
        <Modal
          open={openModal}
          setOpenModal={setOpenModal}
          currentTask={currentTask}
          handleSaveEditedTask={handleSaveEditedTask}
        />
      )}
    </>
  );
}
