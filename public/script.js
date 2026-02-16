const taskInput = document.getElementById('taskInput')
const addTaskBtn = document.getElementById('addTaskBtn')
const taskContainer = document.getElementById('taskContainer')

document.addEventListener('DOMContentLoaded', () => {
    const storedTasksArr = []
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (!storedTasks) {
        return;
    }
    storedTasksArr.push(...storedTasks);
    storedTasksArr.forEach(task => {
        const listItem = document.createElement('li')
        const delBtn = document.createElement('button')
        delBtn.className = 'delBtn';
        listItem.textContent = task.task
        delBtn.textContent = '❌'
        if (!task.task) {
            return;
        } else {
            listItem.appendChild(delBtn);
            taskContainer.appendChild(listItem);
        }
    })
})


// ADD TASK FUNCTION STATEMENT
const addTask = () => {
    // GETS VALUE OF INPUT FIELD
    taskInputValue = taskInput.value

    // EXITS FUNCTION IF INPUT IS EMPTY
    if (!taskInputValue) {
        return;
    }

    // IF THERE ARE NO TASKS, ADD HEADING
    if(taskContainer.children.length === 0) {
        const heading = document.createElement('h1')
        heading.id = 'taskHeading'
        heading.textContent = 'Tasks'
        heading.className = 'text-2xl text-center underline'
        taskContainer.appendChild(heading)
    }

    const taskArray = JSON.parse(localStorage.getItem('tasks')) || [];

    // CREATES LIST ITEM AND DELETE BUTTON, APPENDS TO TASK CONTAINER, AND RESETS INPUT FIELD
    const listItem = document.createElement('li')
    const delBtn = document.createElement('button')
    const id = document.createAttribute('data-id')
    id.value = Date.now()
    delBtn.setAttributeNode(id)
    delBtn.className = 'delBtn';
    listItem.textContent = taskInputValue
    delBtn.textContent = '❌'

    const newTask = {
        id: id.value,
        task: taskInputValue,
        completed: false
    }

    taskArray.push(newTask)
    
    // STORES TASKS IN LOCAL STORAGE
    localStorage.setItem('tasks', JSON.stringify(taskArray))

    // APPENDING ITEMS TO DOM
    listItem.appendChild(delBtn);
    taskContainer.appendChild(listItem);
    document.getElementById('taskInput').value = "";
}

// EVENT LISTENERS
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask()
    }
})
addTaskBtn.addEventListener('click', addTask)

// DELETE TASK FUNCTIONALITY USING EVENT DELEGATION
taskContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button')
    if(!btn) {
        return;
    }

    // REMOVES THE TASK AND HEADING IF THERE ARE NO MORE TASKS
    const li = btn.closest('li');
    const taskId = btn.getAttribute('data-id');
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = storedTasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    li.remove();
    if(taskContainer.children.length === 1) {
        const heading = document.getElementById('taskHeading')
        heading.remove()
    }
})