const todos = ["Walk the dog", "Water the plants", "Sand the chairs"];
const done = [];

const addTodoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo-btn');
const todosList = document.getElementById('todos-list');
const doneList = document.getElementById('done-list');

for (const todo of todos) {
  todosList.append(renderTodoInRealMode(todo));
}

addTodoInput.addEventListener('input', () => {
  addTodoButton.disabled = addTodoInput.value.length < 3;
})

addTodoInput.addEventListener('keydown', ({ key }) => {
  if (key === 'Enter' && addTodoInput.value.length >= 3) {
    addTodo();
  }
})

addTodoButton.addEventListener('click', () => {
  addTodo()
})

function renderTodoInRealMode(todo) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = todo;
  span.addEventListener('dblclick', () => {
    const idx = todos.indexOf(todo);
    todosList.replaceChild(renderTodoInEditMode(todo), todosList.childNodes[idx]);
  })
  li.append(span);

  const button = document.createElement('button');
  button.textContent = 'Done';
  button.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    removeTodo(idx);
  })
  li.append(button);

  return li;
}

function renderTodoInEditMode(todo) {
  const li = document.createElement('li');

  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo;
  li.append(input);

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    todosList.replaceChild(
      renderTodoInRealMode(todo),
      todosList.childNodes[idx]
    )
  });
  li.append(cancelBtn);

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    updateTodo(idx, input.value);
  });
  li.append(saveBtn);

  return li;
}

function updateTodo(index, description) {
  todos[index] = description;
  const todo = renderTodoInRealMode(description);
  todosList.replaceChild(todo, todosList.childNodes[index]);
}

function addTodo() {
  const description = addTodoInput.value;

  if (todos.includes(description.trim())) {
    alert(`Duplicate todo "${description}"`);
    return;
  }

  todos.push(description);
  const todo = renderTodoInRealMode(description);
  todosList.append(todo);
  addTodoInput.value = '';
  addTodoButton.disabled = true;
  const utterThis = new SpeechSynthesisUtterance(description);
  speechSynthesis.speak(utterThis);
}

function removeTodo(index) {
  const [doneTodo] = todos.splice(index, 1);
  todosList.childNodes[index].remove();

  const li = document.createElement('li');
  const span = document.createElement('span');
  span.style.textDecoration = 'line-through';
  span.textContent = doneTodo;
  li.append(span);
  doneList.append(li);
}
