const API_BASE = '/tasks';

async function fetchTasks() {
  const res = await fetch(API_BASE);
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.innerHTML = '<p class="empty-msg">No tasks yet. Add one above!</p>';
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.title = task.completed ? 'Mark incomplete' : 'Mark complete';
    completeBtn.addEventListener('click', () => toggleTask(task.id));

    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Delete task';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(completeBtn);
    li.appendChild(title);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

async function addTask(title) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to add task');
  await fetchTasks();
}

async function toggleTask(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to update task');
  await fetchTasks();
}

async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
  await fetchTasks();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();

  const input = document.getElementById('task-input');
  const addBtn = document.getElementById('add-btn');

  async function handleAdd() {
    const title = input.value.trim();
    if (!title) return;
    input.value = '';
    await addTask(title);
  }

  addBtn.addEventListener('click', handleAdd);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAdd();
  });
});
