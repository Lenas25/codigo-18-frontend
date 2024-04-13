import { useState, useEffect } from "react";
export default function UpdateForm(props) {
  // cuando se carga la vista por defecto se coloca el valor, pero la primera ves vale undefined porque se cargaba el Modal aun asi no se haga ningun click
  const [editedTask, setEditedTask] = useState(props.currentTask?.name);

  const handleEditTask = (event) => {
    setEditedTask(event.target.value);
  };

  // ejecuta una funcion si el valor es diferente
  useEffect(() => {
    setEditedTask(props.currentTask?.name);
    //es una dependencia que se ejecuta cuando cambia el valor de la tarea
  }, [props.currentTask?.name]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    // se ejecuta la funcion que se le pasa por props
    await props.handleSaveEditedTask(props.currentTask, editedTask);
  };

  return (
    <>
      <form action="" id="form-edit" onSubmit={handleSubmitForm}>
        <input
          type="text"
          id="input-edit-task"
          className="outline-none w-full border py-2 px-4 rounded-lg mt-3 focus:ring-2 focus:ring-purple-300 mb-5"
          placeholder="Edit Task"
          // se coloca el ? para que no de error si no existe la propiedad
          value={editedTask}
          onChange={handleEditTask}
        />
        <div className="flex items-center gap-5 justify-end w-full">
          <button
            id="save-edit-task"
            type="submit"
            className="bg-green-300 px-3 py-1 rounded-md">
            Save 💾
          </button>
        </div>
      </form>
    </>
  );
}
