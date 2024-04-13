import { useState, useEffect } from "react";
import { getTasks } from "../services/httpAPI";

export default function useGetTasks() {
  // Es el estado de la lista de tareas
  const [listTasks, setListTask] = useState([]);
  const fetchTasks = async () => {
    //se utiliza el await para esperar la respuesta de la promesa
    const tasksData = await getTasks();
    setListTask(tasksData);
  };

  //use effect es un hook que se ejecuta cuando el componente se monta, se actualiza o se desmonta, puede ejecutar codigo asincrono y sincrono
  useEffect(() => {
    fetchTasks();
  }, []);
  return { listTasks, setListTask };
}
