const inputTask = document.getElementById('input-task');
const form = document.querySelector('form');
const taskList = document.getElementById('task-list');
const filter = document.getElementById('filter-tasks');

let tasks = [];

function createTask(taskText, completed = false) {
    const task = document.createElement('li');
    task.className = 'list-group-item d-flex justify-content-between align-items-center';
    if (completed) task.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = taskText;
    task.appendChild(span);

    const btnGroup = document.createElement('div');

    const btn_completed = document.createElement('button');
    btn_completed.innerHTML = '<i class="fas fa-check-circle"></i>';
    btn_completed.classList.add('text-success', 'me-2');
    btn_completed.addEventListener('click', () => {
        const index = tasks.findIndex(t => t.text === taskText);
        if (index !== -1) {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });

    const btn_delete = document.createElement('button');
    btn_delete.innerHTML = '<i class="fas fa-trash-alt"></i>';
    btn_delete.classList.add('text-danger');
    btn_delete.addEventListener('click', () => {
        tasks = tasks.filter(t => t.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    });

    btnGroup.appendChild(btn_completed);
    btnGroup.appendChild(btn_delete);
    task.appendChild(btnGroup);
    taskList.appendChild(task);
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const filterValue = filter.value;

        if (
            filterValue === 'all' ||
            (filterValue === 'completed' && task.completed) ||
            (filterValue === 'pending' && !task.completed)
        ) {
            createTask(task.text, task.completed);
        }
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = inputTask.value.trim();
    if (taskText === "") return;

    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    inputTask.value = '';
});

const savedTasks = JSON.parse(localStorage.getItem('tasks'));
if (savedTasks) {
    tasks = savedTasks;
    renderTasks();
}

filter.addEventListener('change', renderTasks);