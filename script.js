const taskInput = document.querySelector('input');
const addBtn = document.querySelector(".ad-task-btn");
const todosList = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".delete-all-btn");

let todos = JSON.parse(localStorage.getItem('todos')) || [];

//for showing all todos
const showAllTodos = () => {
  todosList.innerHTML = "";
  todos.forEach((todo) => {
    todosList.innerHTML += `
            <li class="todo-item" data-id="${todo.id}>
                <p class="task-body">
                    ${todo.task}
                </p>
                <div class="todo-actions">
                    <button class="btn btn-succes" onclick="editTodo('${todo.id}')">
                        edit
                    </button>
                    <button class="btn btn-error" onclick="deleteTodo('${todo.id}')">
                        delt
                    </button>
                </div>
            </li>
        `;
  });
};

window.addEventListener('DOMContentLoaded', showAllTodos);

//get random unique id
const getRandomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const addToDo = (taskInput) => {
    let task = {
        id: getRandomId(),
        task: taskInput.value,
        completed: false
    }
    todos.push(task);
}

//press enter key to add your task
taskInput.addEventListener('keyup', (e) => {
    if (e.key === 13 && taskInput.value.length > 0) {
        addToDo(taskInput)
        saveToLocalStorage()
        taskInput.value = ''
        showAllTodos()
    }
})

addBtn.addEventListener('click', () => {
    if (taskInput.value === '') {
        console.log("Please enter a task")
    }   else {
        addToDo(taskInput);
        saveToLocalStorage();
        showAllTodos();
        taskInput.value = '';
        console.log('task added successfully')
    }
});

//clear all todos
const clearAllTodos = () => {
    if (todos.length > 0) {
        todos = []
        saveToLocalStorage()
        showAllTodos()
    } else {
        console.log('no todos to clear')
    }
}

deleteAllBtn.addEventListener('click', clearAllTodos);




const saveToLocalStorage = () => {
    localStorage.setItem('todos',JSON.stringify(todos));
}

//delete todo
const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id)
    saveToLocalStorage();
    showAllTodos()
}

//edit todo 
const editTodo = (id) => {
   let todoToEdit = todos.find(todo => todo.id === id);
    taskInput.value = todoToEdit.task
    todos = todos.filter(todo => todo.id !== id);
    addBtn.innerHTML = 'Edit' 
    saveToLocalStorage();
    addBtn.addEventListener('click', () => {
        addBtn.innerHTML = "Add"
        console.log('updates successfully')
    })
}