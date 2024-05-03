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
    if(inputTask.trim() === "") return setEmptyTask(true);
    setEmptyTask(false);
    const task ={
        id: tasks.length + 1,
        text: inputTask,
    }
    dispatch(addTask(task));
    setInputTask("");   
  }

  return (
    <>
      <form action="" onSubmit={handleTask}>
        <input value={inputTask} type="text" onChange={(e)=>setInputTask(e.target.value)} />
        <button className="add" type="submit" >
          Add Task
        </button>
      </form>
      <p>List of Tasks</p>
      <div className="tasks">
        {tasks.map((task) => (
          <p key={task.id}>{task.text}</p>
        ))}
      </div>
      {emptyTask && <p className="error">Task cannot be empty</p>}
    </>
  );
}
