/** @format */

import './style.css';

const todoForm = document.querySelector('.todo-form');

const todoInput = document.querySelector('.todo-input');

const todoItemsList = document.querySelector('.todo-items');
let todos = [];
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo(todoInput.value);
});
function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: 0,
      name: item,
      completed: false,
    };
    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = '';
  }
}

function renderTodos() {
  todoItemsList.innerHTML = '';
  let index = 0;
  todos.forEach((item) => {
    item.id = index;
    // const checked = item.completed ? 'checked' : null;
    const li = document.createElement('li');

    li.setAttribute('class', 'item');

    li.setAttribute('data-key', item.id);
    
    let checked;

    if (item.completed) {
       checked = "fa-square-check"
    } else { checked = "fa-square" }
    li.innerHTML = `
    <div class="task-cont">
    <i class= "fa-regular ${checked}" id="${index}"></i>
    <p class="para">${item.name}</p> 
    <button id="${index}"  class="delete-button">  </button>    
    </div>

    `;

    todoItemsList.append(li);
    index +=1;
  });
}
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));

  renderTodos(todos);
}
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');

  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach((item) => {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}

function deleteTodo(index) {
  todos = todos.filter((item) => item.id !== index);
  addToLocalStorage(todos);
}
getFromLocalStorage();
todoItemsList.addEventListener('click', (event) => {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

/*const checkedBox = document.querySelectorAll(".checked");*/



document.addEventListener('click', (box) => {
  if(box.target.classList.contains("clear")) {

todos = todos.filter((item) => !item.completed);
addToLocalStorage(todos);
  }
if(box.target.classList.contains("fa-regular")){
  box.target.classList.toggle("fa-square")
  box.target.classList.toggle("fa-square-check")
  let index = box.target.id;
  todos[index].completed = !todos[index].completed;
  addToLocalStorage(todos);

  }

  if(box.target.classList.contains("delete-button")){
    let index = parseInt(box.target.id);
    deleteTodo(index);
  }

  if(box.target.classList.contains("para")){
    const editInputs = document.querySelector(".para");
    editInputs.setAttribute("contenteditable",true);
  }
} )

new Sortable(todoItemsList, { Animation: 400 });
