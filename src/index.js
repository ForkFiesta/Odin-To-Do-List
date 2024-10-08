import "./styles.css"
const ADD_TASK_ELEMENT = document.querySelector(".addItem");
const SEARCH_ELEMENT = document.querySelector(".searchItem");
const INBOX_ELEMENT = document.querySelector(".inboxItem");
const CALENDAR_ELEMENT = document.querySelector(".calendarItem");
const SETTINGS_ELEMENT = document.querySelector(".settingItem");
const MODAL = document.querySelector("#modal");
const CLOSE_MODAL_BUTTON = document.querySelector("#closeModalBtn")



function domInteraction(){
   

    ADD_TASK_ELEMENT.onclick = ()=>{
        openModal();

    }
}


function createTask(taskName, taskDescription, taskDueDate){
    return {
        taskName,
        taskDescription,
        taskDueDate,
    };
};

const taskManagement = (task)=>{
    const tasks = [];

    const removeTask = (task)=>{
        let index = tasks.indexOf(task);
        if (index > -1){
            tasks.splice(index, 1);
        }
    };

    const addTask = (task)=>{
        tasks.push(task);
    }

    const getTasks = () => tasks;


    return{
        removeTask,
        addTask,
        getTasks
    };


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


const taskManager = taskManagement();
domInteraction();

