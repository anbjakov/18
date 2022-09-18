'use strict'

const bootstrapClasses = {
    task: ["list-group-item","form-control","animate__animated","animate__fadeIn"],
    btnDelete: ['btn', 'btn-primary','w-100','border','animate__animated','animate__fadeIn'],
    tskDescription: ["border-danger","animate__animated","animate__shakeX"],
    inputGroupWrap: ["input-group", "mb-3"],
    inputGroupText: ["input-group-text"],
    checkTask: ["form-check-input", "mt-0"],
};

const deleteIcon  = '<i class="bi bi-trash pointerEvents"></i>';
const taskManageForm = document.forms.tasks;

taskManageForm.onsubmit = (event)=>{
    event.preventDefault();
    if (taskDescription.value.trim()==="") {
        taskDescription.classList.add(...bootstrapClasses.tskDescription);
        taskDescription.addEventListener('animationend', () => {
            taskDescription.classList.remove("animate__animated", "animate__shakeX")
        });
    }
    else{
        taskList.append(addTask(taskDescription.value));
        taskDescription.value = "";
    }
}
const {taskDescription} = taskManageForm;
const taskList = document.getElementById('list');

taskList.onclick = handleTask;


function createCol(colSize) {
    const column = document.createElement('div');
    column.classList.add(`col-${colSize}`)
    return column;
}
function addTask(taskContent) {
    const taskRow = document.createElement('div');
    taskRow.classList.add('row');
    const contentCol = createCol(10);
    const manageCol = createCol(2);
    const task = document.createElement('li');
    const deleteButton = document.createElement('button');
    const inputGroupWrap = document.createElement('div');
    const inputGroupText = document.createElement('div');
    const checkTask = document.createElement("input");

    inputGroupWrap.classList.add(...bootstrapClasses.inputGroupWrap);
    inputGroupText.classList.add(...bootstrapClasses.inputGroupText);

    checkTask.classList.add(...bootstrapClasses.checkTask);
    checkTask.type = "checkbox";
    checkTask.name = "checkTask";

    deleteButton.name="deleteTask";
    deleteButton.innerHTML = `${deleteIcon} Delete`;
    deleteButton.classList.add(...bootstrapClasses.btnDelete)

    task.innerHTML = taskContent;
    task.classList.add(...bootstrapClasses.task);

    inputGroupText.append(checkTask);
    inputGroupWrap.append(inputGroupText,task);
    manageCol.append(deleteButton);
    contentCol.append(inputGroupWrap);
    taskRow.append(contentCol,manageCol);
    return taskRow
}
function handleTask (event){
    const targetTask = event.target;
    switch (targetTask.name) {
        case "deleteTask":
            targetTask.closest('.row').classList.toggle("animate__fadeOut");
            targetTask.closest('.row').addEventListener('animationend', () =>{
                targetTask.closest('.row').remove();
            })
        case "checkTask":
             targetTask.disabled = true;
             const taskRow = targetTask.closest('.row');
             const taskContent = taskRow.querySelector('li');
             taskContent.innerHTML = `<del>${taskContent.innerHTML}</del>`;
             const deleteButton = taskRow.querySelector('button');
             deleteButton.disabled = true;
    }
}
taskDescription.oninput = ()=>{
    taskDescription.classList.remove("border-danger");
}

