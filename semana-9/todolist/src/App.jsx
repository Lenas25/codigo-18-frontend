import { useState, useEffect } from "react";
import {
  InputTask,
  Modal,
  UpdateForm,
  DeleteForm,
  CheckForm,
} from "./components";
import { tasks, saveTaskLocalStorage } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { getTasks, createTask, updateTask, deleteTask} from "./services/httpAPI";

export default function App() {
  // Es el estado de la lista de tareas
  const [listTasks, setListTask] = useState(tasks);
  // Es el estado del input
  const [task, setTask] = useState("");
  // creamos una variable para saber a que tarea le dimos click
  const [currentTask, setCurrentTask] = useState(null);
  // se crea un estado para saber si el modal esta abierto o cerrado de todos los 3 modales que tenemos e inicializamos en false
  const [isOpen, setIsOpen] = useState({
    check: false,
    edit: false,
    delete: false,
  });

  const fetchTasks = async () => {
    //se utiliza el await para esperar la respuesta de la promesa
    const tasksData=await getTasks();
    setListTask(tasksData);
  }

  //use effect es un hook que se ejecuta cuando el componente se monta, se actualiza o se desmonta, puede ejecutar codigo asincrono y sincrono
  useEffect(() => {
    fetchTasks();
  },[]);

  // Funcion que se encarga de capturar el valor del input
  const handleInputTask = (event) => {
    setTask(event.target.value);
  };

  const handleListTask = async (task) => {
    //el id de la tarea es el id de la ultima tarea + 1, una solucion para que no se repitan los id listTasks[listTasks.length-1].id + 1
    // otra solucion es usar un uuid
    // task.id = uuidv4();
    const taskAdded = await createTask(task);
    const newTask = [...listTasks, taskAdded];
    // cuando la funcion terminar recien se va a actualizar el estado
    setListTask(newTask);
    // saveTaskLocalStorage(newTask)
    setTask("");
  };

  const handleCurrentCheckTask = (task) => {
    setCurrentTask(task);
    handleOpen("check");
  };

  const handleCurrentTask = (task) => {
    //paso 1: abrir el modal
    handleOpen("edit");
    setCurrentTask(task);
  };

  const handleCurrentDeleteTask = (task) => {
    setCurrentTask(task);
    //actualizamos el estado para colocar el modal en true
    handleOpen("delete");
  };

  const handleSaveEditedTask = async (task, editedText) => {
    //buscamos la tarea que queremos editar
    //cuando hacemos la busque el searchTask es elemento del listTasks, si altero el searchTask tambien altero el listTasks porque es una referencia a la memoria
    const searchTask = listTasks.find((element) => element.id === task.id);
    //editamos el nombre de la tarea
    searchTask.name = editedText;

    await updateTask(searchTask);
    handleOpen("edit");
  };

  const handleCheckTask = async (task) => {
    //buscamos la tarea que queremos editar
    const searchTask = listTasks.find((element) => element.id === task.id);
    //editamos el estado de la tarea
    searchTask.status = 2;
    
    await updateTask(searchTask);
    handleOpen("check");

  };

  const handleDeleteTask = async (task) => {
    const filteredTasks=listTasks.filter((t) => t.id !== task.id);
    // saveTaskLocalStorage(newTasks);
    await deleteTask(task);
    setListTask(filteredTasks);
    //actualizamos el estado para colocar el modal en false y cerrarlo
    handleOpen("delete");

  };

// en este metodo se abre y cierra los modales con el tipo pasa como propiedad y el cambio de estado se basa en el estado previo
  const handleOpen = (modalType) => {
    setIsOpen({
      ...isOpen,
      [modalType]: !isOpen[modalType],
    });
  }

  const handleTaskStatus = (task) => {
    return task.status === 2 ? (
      <>
        <h3 className="line-through font-thin text-gray-500">{task.name}</h3>
      </>
    ) : (
      <>
        <h3>{task.name}</h3>
        <div className="flex gap-5">
          <button onClick={() => handleCurrentCheckTask(task)}>✅</button>
          <button onClick={() => handleCurrentTask(task)}>📝</button>
          <button onClick={() => handleCurrentDeleteTask(task)}>🗑️</button>
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
        <Modal open={isOpen.edit} 
        handleClose={()=>handleOpen("edit")} 
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
          handleClose={()=>handleOpen("delete")}
          title="Delete Task">
          <DeleteForm
            currentTask={currentTask}
            handleDeleteTask={handleDeleteTask}
            // se cierra el modal con el boton de cancelar y el estado del is open es false de nuevo
            handleDeleteCancel={()=>handleOpen("delete")}
          />
        </Modal>
      )}
      {currentTask && (
        <Modal
          open={isOpen.check}
          handleClose={()=>handleOpen("check")}
          title="Mark Check Task">
          <CheckForm
            currentTask={currentTask}
            handleCheckTask={handleCheckTask}
            handleCheckCancel={()=>handleOpen("check")}
          />
        </Modal>
      )}
    </>
  );
}
