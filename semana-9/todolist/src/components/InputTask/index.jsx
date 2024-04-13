

export default function InputTask(props) {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const task = {
      name: props.task,
      status: 1,
      //fecha de creacion
      createdAt: new Date(),
    };

    await props.handleListTask(task);

  };

  //dentro de un componente de react se pueden crear funciones
  return (
    <>
      <form
        action=""
        id="form"
        className="flex justify-between"
        onSubmit={handleFormSubmit}>
        <input
          id="input-task"
          className="w-full border py-2 px-4 rounded-tl-lg rounded-bl-lg outline-none"
          name="input"
          type="text"
          value={props.task}
          onChange={props.handleInputTask}
          placeholder="Enter a task"
          autoComplete="off"
        />
        <button className="bg-purple-300 px-4 rounded-tr-lg rounded-br-lg">
          Create
        </button>
      </form>
    </>
  );
}
