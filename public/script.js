const taskInput = document.getElementById('taskInput')
const addTaskBtn = document.getElementById('addTaskBtn')
const taskContainer = document.getElementById('taskContainer')

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
    
    // CREATES LIST ITEM AND DELETE BUTTON, APPENDS TO TASK CONTAINER, AND RESETS INPUT FIELD
    const listItem = document.createElement('li')
    const delBtn = document.createElement('button')
    delBtn.className = 'delBtn';
    listItem.textContent = taskInputValue
    delBtn.textContent = '❌'
    listItem.appendChild(delBtn);
    taskContainer.appendChild(listItem);
    document.getElementById('taskInput').value = ""
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
    li.remove();
    if(taskContainer.children.length === 1) {
        const heading = document.getElementById('taskHeading')
        heading.remove()
    }
})
