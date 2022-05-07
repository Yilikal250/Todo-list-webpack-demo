export default function clear() {
  let todos = JSON.parse(localStorage.getItem('todos'));

  todos = todos.filter((item) => !item.completed);
  return todos;
}
