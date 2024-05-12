import { useState } from "react";
import {
  InputTask,
  Modal,
  UpdateForm,
  DeleteForm,
  CheckForm,
} from "../../components";
// import { v4 as uuidv4 } from "uuid";
import {
  createTask,
  updateTask,
  deleteTask,
} from "../../services/httpAPI";
import useGetTasks from "../../hooks/useGetTasks";
import useOpenModals from "../../hooks/useOpenModals";

export default function Home() {
  // Es el estado de la lista de tareas con custom hook
  const { listTasks, setListTask } = useGetTasks();
  // Es el estado del input
  const [task, setTask] = useState("");
  // creamos una variable para saber a que tarea le dimos click
  const [currentTask, setCurrentTask] = useState(null);
  const { isOpen, handleOpen } = useOpenModals();



  // Funcion que se encarga de capturar el valor del input
  const handleInputTask = (event) => {
    setTask(event.target.value);
  };

  // Funcion que se encarga de abrir el modal y guardar la tarea a la que le dimos click
  const handleCurrentTask = (task, modalType) => {
    //paso 1: abrir el modal
    handleOpen(modalType);
    setCurrentTask(task);
  };

  //crear una tarea
  const handleListTask = async (task) => {
    // otra solucion es usar un uuid
    // task.id = uuidv4();
    const taskAdded = await createTask(task);
    const newTask = [...listTasks, taskAdded];
    // cuando la funcion terminar recien se va a actualizar el estado
    setListTask(newTask);
    // saveTaskLocalStorage(newTask)
    setTask("");
  };

  //editar una tarea
  const handleSaveEditedTask = async (task, editedText) => {
    //buscamos la tarea que queremos editar
    //cuando hacemos la busque el searchTask es elemento del listTasks, si altero el searchTask tambien altero el listTasks porque es una referencia a la memoria
    const searchTask = listTasks.find((element) => element.id === task.id);
    //editamos el nombre de la tarea
    searchTask.name = editedText;

    await updateTask(searchTask);
    handleOpen("edit");
  };

  //marcar una tarea como completada
  const handleCheckTask = async (task) => {
    //buscamos la tarea que queremos editar
    const searchTask = listTasks.find((element) => element.id === task.id);
    //editamos el estado de la tarea
    searchTask.status = 2;

    await updateTask(searchTask);
    handleOpen("check");
  };

  //eliminar una tarea
  const handleDeleteTask = async (task) => {
    const filteredTasks = listTasks.filter((t) => t.id !== task.id);
    // saveTaskLocalStorage(newTasks);
    await deleteTask(task);
    setListTask(filteredTasks);
    //actualizamos el estado para colocar el modal en false y cerrarlo
    handleOpen("delete");
  };

  //funcion que se encarga de renderizar la tarea segun el estado
  const handleTaskStatus = (task) => {
    return task.status === 2 ? (
      <>
        <h3 className="line-through font-thin text-gray-500">{task.name}</h3>
      </>
    ) : (
      <>
        <h3>{task.name}</h3>
        <div className="flex gap-5">
          <button onClick={() => handleCurrentTask(task, "check")}>✅</button>
          <button onClick={() => handleCurrentTask(task, "edit")}>📝</button>
          <button onClick={() => handleCurrentTask(task, "delete")}>🗑️</button>
        </div>
      </>
    );
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
              className="flex justify-between items-center px-4 py-3 bg-white rounded-lg border border-purple-500 shadow-md">
              {handleTaskStatus(task)}
            </div>
          ))}
        </section>
      </main>
      {/* si currentTask existe entonces se renderiza el modal */}
      {currentTask && (
        <Modal
          open={isOpen.edit}
          handleClose={() => handleOpen("edit")}
          title="Edit Task">
          <UpdateForm
            currentTask={currentTask}
            handleSaveEditedTask={handleSaveEditedTask}
          />
        </Modal>
      )}
      {currentTask && (
        <Modal
          // si isOpen.delete es true entonces se renderiza el modal
          open={isOpen.delete}
          // se cierra el modal con la X
          handleClose={() => handleOpen("delete")}
          title="Delete Task">
          <DeleteForm
            currentTask={currentTask}
            handleDeleteTask={handleDeleteTask}
            // se cierra el modal con el boton de cancelar y el estado del is open es false de nuevo
            handleDeleteCancel={() => handleOpen("delete")}
          />
        </Modal>
      )}
      {currentTask && (
        <Modal
          open={isOpen.check}
          handleClose={() => handleOpen("check")}
          title="Mark Check Task">
          <CheckForm
            currentTask={currentTask}
            handleCheckTask={handleCheckTask}
            handleCheckCancel={() => handleOpen("check")}
          />
        </Modal>
      )}
    </>
  );
}
