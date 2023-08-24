const todoL = [{
    name: 'make dinner',
    dueDate: '2023-6-16'
},
{
    name: 'make lunch',
    dueDate: '2023-6-16'
}];

renderTodoL();

function renderTodoL () {
    let todoLHTML = '';

    for (let i = 0; i < todoL.length; i++) {
        const todoObj = todoL[i];
        const { name, dueDate } = todoObj;
        const html = `
            <div>${name}</div> 
            <div>${dueDate}</div>
            <button class="del-btn" onclick="
            todoL.splice(${i}, 1);
            renderTodoL();
            ">Delete</button>
            `;
        todoLHTML += html; 
    }

    document.querySelector('.task-fod').innerHTML = todoLHTML;
}

function addTask () {
    const inputElement = document.querySelector('.task-name');
    const name = inputElement.value;
    const dateElement = document.getElementById('duedate');
    const dueDate = dateElement.value;
    todoL.push({
        name: name,
        dueDate: dueDate
    
    });
    console.log(todoL);
    inputElement.value = '';

    renderTodoL();
}

