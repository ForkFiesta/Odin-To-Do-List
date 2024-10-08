import { taskManagement, createTask } from "./taskManagement";
import { projectManagement, createProject } from "./projectManagement";

const addTaskElement = document.querySelector(".addItem");
const MODAL = document.querySelector("#modal");
const closeModalButton = document.querySelector("#closeModalBtn");

//project and task form elements

// Project Form
const addNewProjectBtn = document.querySelector("#addNewProjectBtn");
const newProjectForm = document.querySelector("#newProjectForm");
const projectList = document.querySelector(".project-groups");

//Task Form
const projectDropdown = document.querySelector("#taskProject");


//project select the button and dropdown menu
const toggleDropdown = document.querySelector("#toggleDropdown");
const dropdownMenu = document.querySelector("#dropdownMenu");


//task container
const taskContainer = document.querySelector(".flex-container");


const taskManager = taskManagement();
const projectManager = projectManagement();

function addProjectsToDropdown(){
    projectDropdown.innerHTML = "";
    let projectArray = projectManager.getProjects();
    projectArray.forEach(project => {

        const option = document.createElement("option");
        option.value = project.name;
        option.textContent = project.name;
        projectDropdown.appendChild(option);

        
    });
    
}

function setupDropdownToggle(){
    toggleDropdown.addEventListener("click", ()=>{
        dropdownMenu.classList.toggle("show");
    });

}

function initializeProjectForm(){

    addNewProjectBtn.addEventListener("click", () =>{
        newProjectForm.classList.toggle("show");
        newProjectForm.classList.remove("hidden");
    });

    newProjectForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        const newProjectName = document.querySelector("#newProjectName").value.trim();
    
        if (newProjectName){
            const newProject = createProject(newProjectName);
            projectManager.addProject(newProject);
            updateProjectLists(newProject)
            addProjectsToDropdown();
            newProjectForm.classList.add("hidden");
            document.querySelector("#newProjectName").value = "";

           
            
            

        }


    });
}

function updateProjectLists(){
    //Create new list item
    const newProjectItem = document.createElement("li");
            newProjectItem.classList.add("clickable");
            newProjectItem.textContent = newProjectName.value;

            //Append new item to the project list
            projectList.appendChild(newProjectItem);

            document.querySelector("#newProjectName").value = "";
            newProjectForm.classList.add("hidden");

}

function readTasks(){
    const tasksArray = taskManager.getTasks();
    taskContainer.innerHTML = "";

    tasksArray.forEach(element => {

        const newTaskContainer = document.createElement("div");
        newTaskContainer.classList.add("task");
        newTaskContainer.id = element.taskName;

        const newTaskName = document.createElement("div");
        newTaskName.innerHTML = element.taskName;
        newTaskContainer.appendChild(newTaskName);

        const newTaskDescription = document.createElement("div");
        newTaskDescription.innerHTML = element.taskDescription;
        newTaskContainer.appendChild(newTaskDescription);

        const newTaskDueDate = document.createElement("div");
        newTaskDueDate.innerHTML = element.taskDueDate;
        newTaskContainer.appendChild(newTaskDueDate);

        const newTaskProject = document.createElement("div");
        newTaskProject.innerHTML = element.taskProject;
        newTaskContainer.appendChild(newTaskProject);

        const newTaskCompleted = document.createElement("input");
        newTaskCompleted.type = "checkbox";
        newTaskCompleted.checked = element.completed || false;
        newTaskCompleted.id = `${element.taskName}-completed`;
        newTaskCompleted.classList.add("task-completed-checkbox");
        

        newTaskCompleted.addEventListener("change", (event)=>{
            element.completed = event.target.checked;
        });
        const newTaskCompletedLabel = document.createElement("label");
        newTaskCompletedLabel.htmlFor = newTaskCompleted.id;
        newTaskCompletedLabel.innerText = "Completed";

        // Append the checkbox and label to the task container
        newTaskContainer.appendChild(newTaskCompletedLabel);
        newTaskContainer.appendChild(newTaskCompleted);

        const newTaskRemoveButton = document.createElement('button');
        newTaskRemoveButton.innerHTML = "X";

        

        newTaskContainer.appendChild(newTaskRemoveButton);

        taskContainer.appendChild(newTaskContainer);

    })
}

function openModal(){
    addProjectsToDropdown();
    MODAL.style.display = "block";
    const form = document.querySelector("#taskForm");
    form.onsubmit = (event)=>{
        event.preventDefault();
        // alert("Task Submitted");
        const taskName = document.querySelector("#taskName").value;
        const description = document.querySelector("#taskDescription").value;
        const taskDueDate = document.querySelector("#taskDueDate").value;
        const taskProject = document.querySelector("#taskProject").value;
        
        
        let newTask = taskManager.addTask(createTask(taskName, description, taskDueDate, taskProject));
        

        if (projectManager.searchForProject(taskProject)){
            projectManager.addTaskToProject(taskProject, newTask);
        }
        form.reset();
        MODAL.style.display = "none";

        readTasks();
        
    }

    checkForModalClose(form);

    
};

function checkForModalClose(form){
    closeModalButton.addEventListener("click", ()=>{
        form.reset();
        MODAL.style.display = "none";
    });

    window.onclick = function(event){
        if (event.target == MODAL) {
            form.reset();
            MODAL.style.display = "none";
        }
    };
}

export function initializeDOM(){
    setupDropdownToggle();
    initializeProjectForm();
    readTasks();
    addTaskElement.onclick = openModal;
}
