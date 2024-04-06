export const validateExistLocalStorage = () => localStorage.getItem("tasks");

export let tasks = validateExistLocalStorage()
  ? [...JSON.parse(localStorage.getItem("tasks"))]
  : [];

export function saveTaskLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
