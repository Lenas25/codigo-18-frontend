import './styles.css'
import { createTask, inputEmpty } from './src/form'
import { renderTasks } from './src/render'
import { closeModal } from './src/modal'
import { saveEdit } from './src/utils'

document.querySelector('#app').innerHTML = `
  <main class="max-w-md mx-auto p-6">
  <form action="" id="form" class="flex justify-between">
    <input
      id="input-task"
      class="w-full border py-2 px-4 rounded-tl-lg rounded-bl-lg outline-none"
      name="input"
      type="text"
      placeholder="Enter a task"
      autocomplete="off" />
    <button class="bg-purple-300 px-4 rounded-tr-lg rounded-br-lg">
      Create
    </button>
  </form>
  <span id="error" class="text-xs text-red-500 mt-2 font-semibold"></span>
  <section id="container-task" class="mt-10 flex flex-col gap-5"></section>
  </main>

  <div id="modal" class="relative z-50 hidden">
      <div class="fixed inset-0 bg-black/30"></div>
      <div
        class="border fixed inset-0 w-screen p-6 flex items-center justify-center">
        <div class="bg-white p-5 rounded-md mx-auto w-full max-w-md">
          <div id="modal-content">
            <h2 class="text-center text-lg font-semibold">Edit your task</h2>
            <form action="" id="form-edit">
              <input
                type="text"
                id="input-edit-task"
                class="outline-none w-full border py-2 px-4 rounded-lg mt-3 focus:ring-2 focus:ring-purple-300"
                placeholder="Edit Task" />
              <div class="my-4 block">
                <div class="flex flex-col gap-3 mt-4">
                  <div>
                    <input 
                    id="input-edit-create"
                    type="radio" 
                    name="status">
                    Created
                  </div>
                  <div>
                    <input 
                    id="input-edit-done"
                    type="radio" 
                    name="status">
                    Finished
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-5 justify-between">
                <button id="save-edit-task" type="submit" class="bg-green-300 flex-1 py-1 rounded-md">Save 💾</button>
                <button id="cancel-edit-task" type="button" class="bg-red-300 flex-1 py-1 rounded-md">Cancel ❌</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
`

createTask(
document.querySelector('#form'), 
document.querySelector("#input-task"),
document.querySelector("#container-task"));


renderTasks(document.querySelector("#container-task"));

inputEmpty(document.querySelector("#input-task"));

document.querySelector("#cancel-edit-task").onclick = () => closeModal(document.querySelector("#modal"));
document.querySelector("#save-edit-task").onclick = () => saveEdit(document.querySelector("#modal"));

