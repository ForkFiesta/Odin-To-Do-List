import { taskManagement, createTask } from "./taskManagement";

const ADD_TASK_ELEMENT = document.querySelector(".addItem");
const MODAL = document.querySelector("#modal");
const CLOSE_MODAL_BUTTON = document.querySelector("#closeModalBtn")


const taskManager = taskManagement();

export function domInteraction(){
   

    ADD_TASK_ELEMENT.onclick = ()=>{
        openModal();

    }
};

function openModal(){
    MODAL.style.display = "block";
    const form = document.querySelector("#taskForm");
    form.onsubmit = (event)=>{
        event.preventDefault();
        // alert("Task Submitted");
        const taskName = document.querySelector("#taskName").value;
        const description = document.querySelector("#taskDescription").value;
        const taskDueDate = document.querySelector("#taskDueDate").value;
        form.reset();
        MODAL.style.display = "none";
        taskManager.addTask(createTask(taskName, description, taskDueDate));
        console.log(taskManager.getTasks());
    }
    checkForModalClose();

    
};

function checkForModalClose(){
    CLOSE_MODAL_BUTTON.addEventListener("click", ()=>{
        MODAL.style.display = "none";
    });

    window.onclick = function(event){
        if (event.target == MODAL) {
            MODAL.style.display = "none";
        }
    };
}
