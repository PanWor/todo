const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-btn');

// Get todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos() {
	// Clear the existing list
	todoList.innerHTML = '';

	// Render each todo item
	todos.forEach((todo, index) => {
		const li = document.createElement('li');
		li.innerHTML = `
			<span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
			<div class="actions">
				<button class="edit" data-id="${index}">Edit</button>
			<button class="delete" data-id="${index}">Delete</button>
		</div>
	`;
	todoList.appendChild(li);
});
}

// Add todo
function addTodo() {
if (input.value.trim() === '') {
alert('Please add a todo');
return;
}
const newTodo = {
	text: input.value.trim(),
	completed: false
};

todos.push(newTodo);
localStorage.setItem('todos', JSON.stringify(todos));
renderTodos();
input.value = '';
}

// Toggle completed
function toggleCompleted(index) {
todos[index].completed = !todos[index].completed;
localStorage.setItem('todos', JSON.stringify(todos));
renderTodos();
}

// Edit todo
function editTodo() {
const index = parseInt(this.dataset.id);
const todoText = this.parentNode.previousElementSibling;
const newText = prompt('Enter new todo text', todoText.innerHTML);
if (newText !== null && newText.trim() !== '') {
todos[index].text = newText.trim();
localStorage.setItem('todos', JSON.stringify(todos));
renderTodos();
}
}

// Delete todo
function deleteTodo() {
const index = parseInt(this.dataset.id);
todos.splice(index, 1);
localStorage.setItem('todos', JSON.stringify(todos));
renderTodos();
}

// Clear all todos
function clearTodos() {
todos = [];
localStorage.setItem('todos', JSON.stringify(todos));
renderTodos();
}

// Event listeners
form.addEventListener('submit', event => {
event.preventDefault();
addTodo();
});

todoList.addEventListener('click', event => {
if (event.target.classList.contains('todo-text')) {
const index = event.target.parentNode.dataset.id;
toggleCompleted(index);
}
if (event.target.classList.contains('edit')) {
editTodo.call(event.target);
}
if (event.target.classList.contains('delete')) {
deleteTodo.call(event.target);
}
});

clearBtn.addEventListener('click', clearTodos);

renderTodos();