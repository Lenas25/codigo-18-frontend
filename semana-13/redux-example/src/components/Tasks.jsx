import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../app/slices/tasksSlice";

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [inputTask, setInputTask] = useState("");
  const [emptyTask, setEmptyTask] = useState(false);

  const handleTask = (e) => {
    e.preventDefault();
    if (inputTask.trim() === "") return setEmptyTask(true);
    setEmptyTask(false);
    const task = {
      id: tasks.length + 1,
      text: inputTask,
    };
    dispatch(addTask(task));
    setInputTask("");
  };

  return (
    <>
      <div className="container-tasks">
        <form action="" onSubmit={handleTask}>
          <input
            name = "task"
            value={inputTask}
            type="text"
            onChange={(e) => setInputTask(e.target.value)}
          />
          <button className="add" type="submit">
            Add Task
          </button>
        </form>
        <div>
          <p className="title-task">List of Tasks</p>
          <div className="tasks">
            {tasks.map((task) => (
              <p className="task-item" key={task.id}>{task.id}. {task.text}</p>
            ))}
          </div>
          {emptyTask && <p className="error">Task cannot be empty</p>}
        </div>
      </div>
    </>
  );
}
