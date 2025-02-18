let taskList = [];

function addTasks(){
    let textBox = document.querySelector('#textBox');
    let dateBox = document.querySelector('#dateBox');

    let text = textBox.value;
    let date = dateBox.value;

    if (text && date) { // Ensure the input fields are not empty
        taskList.push({ text, date });

        textBox.value = '';
        dateBox.value = '';

        savetoLocalstorage();
        display();
    } else {
        alert("Please fill in both task and date!");
    }
}

function display(){
    let taskListContainer = document.querySelector('#taskList');
    taskListContainer.innerHTML = '';

    for(let i=0; i<taskList.length; i++){
        let newTask = document.createElement('div');
        newTask.className = 'newTaskCtn';
        newTask.innerHTML = `
            <span>
                <span class="taskName">${taskList[i].text}</span>
                <span class="taskDate">${taskList[i].date}</span>
                <button class="clsBtn" onclick="removeTask(${i});">Clear</button>
            </span>
        `;
        taskListContainer.appendChild(newTask);
    }
}

function removeTask(index){
    taskList.splice(index,1);
    savetoLocalstorage();
    display();
}

function savetoLocalstorage(){
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function loadfromLocalstorage(){
    let storedTaskList = localStorage.getItem('taskList');
    if (storedTaskList) {
        taskList = JSON.parse(storedTaskList);
    }
    // Ensure to display tasks after loading from localStorage
    display();
}

window.onload = loadfromLocalstorage;
