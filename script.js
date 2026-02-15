const taskInput = document.getElementById('taskInput')
const addTaskBtn = document.getElementById('addTaskBtn')
const taskContainer = document.getElementById('taskContainer')

const addTask = () => {
    taskInputValue = taskInput.value
    if (!taskInputValue) {
        return;
    }
    if(taskContainer.children.length === 0) {
        const heading = document.createElement('h1')
        heading.id = 'taskHeading'
        heading.textContent = 'Tasks'
        heading.className = 'text-2xl text-center underline'
        taskContainer.appendChild(heading)
    }
    const listItem = document.createElement('li')
    const delBtn = document.createElement('button')
    delBtn.className = 'delBtn';
    listItem.textContent = taskInputValue
    delBtn.textContent = '❌'
    listItem.appendChild(delBtn);
    taskContainer.appendChild(listItem);
    document.getElementById('taskInput').value = ""
}

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask()
    }
})

addTaskBtn.addEventListener('click', addTask)

taskContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if(!btn) {
        return;
    }

    const li = btn.closest('li');
    li.remove();
    if(taskContainer.children.length === 1) {
        const heading = document.getElementById('taskHeading')
        heading.remove()
    }
})
