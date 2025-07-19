const inputTask = document.getElementById('input-task');
const form = document.querySelector('form');
const taskList = document.getElementById('task-list');
const filter = document.getElementById('filter-tasks');

let tasks = [];

function createTask(task) {
    const taskItem = document.createElement('li');
    taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    if (task.completed) taskItem.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;
    taskItem.appendChild(span);

    const btnGroup = document.createElement('div');

    const btnCompleted = document.createElement('button');
    btnCompleted.innerHTML = '<i class="fas fa-check-circle"></i>';
    btnCompleted.classList.add('text-success', 'me-2');
    btnCompleted.setAttribute('data-id', task.id);
    btnCompleted.addEventListener('click', () => {
        const id = Number(btnCompleted.getAttribute('data-id'));
        const index = tasks.findIndex(t => t.id === id);
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    });

    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
    btnDelete.classList.add('text-danger');
    btnDelete.setAttribute('data-id', task.id);
    btnDelete.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
            tasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });

    btnGroup.appendChild(btnCompleted);
    btnGroup.appendChild(btnDelete);
    taskItem.appendChild(btnGroup);
    taskList.appendChild(taskItem);
}

function renderTasks() {
    taskList.innerHTML = '';
    const filterValue = filter.value;
    const filteredTasks = tasks.filter(task =>
        filterValue === 'all' ||
        (filterValue === 'completed' && task.completed) ||
        (filterValue === 'pending' && !task.completed)
    );

    if (filteredTasks.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'text-center text-muted my-3';
        emptyMsg.textContent = 'Nenhuma tarefa encontrada.';
        taskList.appendChild(emptyMsg);
    } else {
        filteredTasks.forEach(task => createTask(task));
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = inputTask.value.trim();

    if (taskText === "") return;

    if (tasks.some(t => t.text.toLowerCase() === taskText.toLowerCase())) {
        alert("Essa tarefa já existe!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    inputTask.value = '';
});

filter.addEventListener('change', renderTasks);

const savedTasks = JSON.parse(localStorage.getItem('tasks'));
if (savedTasks) {
    tasks = savedTasks;
    renderTasks();
}
