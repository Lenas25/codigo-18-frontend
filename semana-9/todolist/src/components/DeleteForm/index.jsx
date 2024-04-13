
export default function DeleteForm(props) {
  return (
    <>
      <form action="" id="form-edit">
        <h2 className="my-5 text-center">
          Esta seguro de eliminar la tarea <b>{props.currentTask?.name}</b>?
        </h2>
        <div className="flex items-center gap-5 justify-between">
          <button
            id="save-edit-task"
            type="button"
            className="bg-red-300 px-3 py-1 rounded-md flex-1"
            onClick={props.handleDeleteCancel}>
            No, estoy seguro
          </button>
          <button
            id="save-edit-task"
            type="button"
            className="bg-green-300 px-3 py-1 rounded-md flex-1"
            onClick={async () => await props.handleDeleteTask(props.currentTask)}>
            Si, estoy seguro
          </button>
        </div>
      </form>
    </>
  );
}
