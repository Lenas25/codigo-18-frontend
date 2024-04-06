import { useState, useEffect } from "react";
export default function Modal(props) {
  // cuando se carga la vista por defecto se coloca el valor, pero la primera ves vale undefined porque se cargaba el Modal aun asi no se haga ningun click
  const [editedTask, setEditedTask] = useState(props.currentTask?.name);

  const handleEditTask = (event) => {
    setEditedTask(event.target.value);
  }

  // ejecuta una funcion si el valor es diferente
  useEffect(() => {
    setEditedTask(props.currentTask?.name);
    //es una dependencia que se ejecuta cuando cambia el valor de la tarea
  },[props.currentTask?.name]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    // se ejecuta la funcion que se le pasa por props
    props.handleSaveEditedTask(props.currentTask, editedTask);
  };


  return (
    <>
      <div id="modal" className={`relative z-50 ${props.open ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/30"></div>
        <div className="border fixed inset-0 w-screen p-6 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md mx-auto w-full max-w-md">
            <div id="modal-content">
              <h2 className="text-center text-lg font-semibold">
                Edit your task
              </h2>
              <form action="" id="form-edit" onSubmit={handleSubmitForm}>
                <input
                  type="text"
                  id="input-edit-task"
                  className="outline-none w-full border py-2 px-4 rounded-lg mt-3 focus:ring-2 focus:ring-purple-300"
                  placeholder="Edit Task" 
                  // se coloca el ? para que no de error si no existe la propiedad
                  value={editedTask} 
                  onChange={handleEditTask}
                />
                <div className="my-4 block">
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex gap-2">
                      <input
                        id="input-edit-create"
                        type="radio"
                        name="status"
                      />
                      Created
                    </div>
                    <div className="flex gap-2">
                      <input id="input-edit-done" type="radio" name="status" />
                      Finished
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-5 justify-between">
                  <button
                    id="save-edit-task"
                    type="submit"
                    className="bg-green-300 flex-1 py-1 rounded-md">
                    Save 💾
                  </button>
                  <button
                    id="cancel-edit-task" 
                    onClick={() => props.setOpenModal(false)} 
                    type="button"
                    className="bg-red-300 flex-1 py-1 rounded-md">
                    Cancel ❌
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
