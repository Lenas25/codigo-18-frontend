export default function CheckForm(props) {
    return (
        <>
          <form action="" id="form-edit">
            <h2 className="my-5 text-center">
              Desear marcar como terminado la tarea <b>{props.currentTask?.name}</b>?
            </h2>
            <div className="flex items-center gap-5 justify-between">
              <button
                id="save-edit-task"
                type="button"
                className="bg-red-300 px-3 py-1 rounded-md flex-1"
                onClick={props.handleCheckCancel}>
                No, aun no
              </button>
              <button
                id="save-edit-task"
                type="button"
                className="bg-green-300 px-3 py-1 rounded-md flex-1"
                onClick={async () => 
                await props.handleCheckTask(props.currentTask)}>
                Si, esta terminado
              </button>
            </div>
          </form>
        </>
      );
}