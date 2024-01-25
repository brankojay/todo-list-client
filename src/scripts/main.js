import '../styles/style.scss'
import { Collapse } from 'bootstrap'

async function startApplication() {

  async function getTodosFromServer() {
      try {
        const todosResponse = await fetch( "http://localhost:8080/todo" );
        const todoItems = await todosResponse.json();

        return todoItems;
      } catch ( error ) {
            console.error( error )
            return []
      }
  }

  const existingToDoList = await getTodosFromServer();

  function createToDoList() {
    const todoListContainer = document.querySelector( '#todo-list-container' );
    let todoListItems = '';

    existingToDoList.forEach( function( todo, index ) {
        todoListItems += `
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button 
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapse${index}" 
                aria-expanded="false" 
                aria-controls="collapse${index}">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">${todo.title}</label>
                </div>
              </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#todo-list-container">
              <div class="accordion-body">
                ${todo.note}
              </div>
            </div>
          </div>
        `
    } );

    todoListContainer.innerHTML = '';
    todoListContainer.insertAdjacentHTML( 'afterbegin', todoListItems );
  }

  createToDoList();

  const createToDoButton = document.querySelector( '#create-todo-button' );

  function createToDo() {
    const todoTitleInput = document.querySelector( '#todo-title' );
    const todoDateInput = document.querySelector( '#todo-due-date' );
    const todoNoteInput = document.querySelector( '#todo-note' );

    if ( todoTitleInput.validity.valid ) {
      const newTodo = {
        title: todoTitleInput.value,
        dueDate: todoDateInput.value,
        note: todoNoteInput.value,
      };
      
      existingToDoList.push( newTodo );
      createToDoList();
    } else {
      todoTitleInput.reportValidity();
    }
  }

  createToDoButton.addEventListener( 'click', createToDo );
}

document.addEventListener( 'DOMContentLoaded', startApplication );
