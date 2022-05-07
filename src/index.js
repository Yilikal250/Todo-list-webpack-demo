/** @format */

import './style.css';
import clear from './modules/clear.js';

const todoForm = document.querySelector('.todo-form');

const todoInput = document.querySelector('.todo-input');

const todoItemsList = document.querySelector('.todo-items');
let todos = [];

function renderTodos() {
  todoItemsList.innerHTML = '';
  let index = 0;
  todos.forEach((item) => {
    item.id = index;
    const li = document.createElement('li');

    li.setAttribute('class', 'item');

    li.setAttribute('data-key', item.id);

    let checked;

    if (item.completed) {
      checked = 'fa-square-check';
    } else {
      checked = 'fa-square';
    }
    li.innerHTML = `
    <div class="task-cont">
    <i class= "fa-regular ${checked}" id="${index}"></i>
    <p id="${index}" class="para">${item.name}</p> 
    <button id="${index}"  class="delete-button">  </button>    
    </div>

    `;

    todoItemsList.append(li);
    index += 1;
  });
}

function addToLocalStorage(todos) {
  renderTodos(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
}
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
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo(todoInput.value);
});

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');

  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach((item) => {
    if (item.id === id) {
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

/* const checkedBox = document.querySelectorAll(".checked"); */

document.addEventListener('click', (box) => {
  if (box.target.classList.contains('clear')) {
    todos = clear();
    addToLocalStorage(todos);
  }
  if (box.target.classList.contains('fa-regular')) {
    box.target.classList.toggle('fa-square');
    box.target.classList.toggle('fa-square-check');
    const index = box.target.id;
    todos[index].completed = !todos[index].completed;
    addToLocalStorage(todos);
  }

  if (box.target.classList.contains('delete-button')) {
    /* eslint-disable */
    const index = parseInt(box.target.id);
    deleteTodo(index);
    renderTodos(todos);
  }

  if (box.target.classList.contains('para')) {
    const editInputs = document.querySelectorAll('.para');
    editInputs.forEach((task) => {
      task.setAttribute('contenteditable', true);
      task.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          /* eslint-disable */
          const newName = task.innerHTML;
          const index = parseInt(box.target.id);
          todos[index].name = newName;
          addToLocalStorage(todos);
        }
      });
    });
  }
});
/* eslint-disable */
new Sortable(todoItemsList, { Animation: 400 });
