import { taskManagement, createTask } from "./taskManagement";
import { projectManagement, createProject } from "./projectManagement";

const addTaskElement = document.querySelector(".addItem");
const MODAL = document.querySelector("#modal");
const closeModalButton = document.querySelector("#closeModalBtn");

//project and task form elements

// Project Form
const defaultProject = document.querySelector("#personal");
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

function addProjectsToDropdown() {
  projectDropdown.innerHTML = "";
  let projectArray = projectManager.getProjects();
  projectArray.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectDropdown.appendChild(option);
  });
}

// function initializeListeningOnProjects(){
//     defaultProject.addEventListener("click",()=>{
//         readTasks(taskManager.getTasksByCategory(defaultProject.innerHTML));
//     });
// };

function setupDropdownToggle() {
  toggleDropdown.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });
}

function initializeProjectForm() {
  addNewProjectBtn.addEventListener("click", () => {
    newProjectForm.classList.toggle("show");
    newProjectForm.classList.remove("hidden");
  });

  newProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newProjectName = document
      .querySelector("#newProjectName")
      .value.trim();

    if (newProjectName) {
      const newProject = createProject(newProjectName);
      projectManager.addProject(newProject);
      addProjectsToDropdown();
      readProjects();
      newProjectForm.classList.add("hidden");
      document.querySelector("#newProjectName").value = "";
    }
  });
}

function readProjects(projectArray = projectManager.getProjects()) {
  //Create new list item
  projectList.innerHTML = "";
  projectArray.forEach((element) => {
    const projectItem = document.createElement("li");
    projectItem.classList.add("clickable");
    projectItem.textContent = element.name;

    const newProjectRemoveButton = document.createElement("button");
    newProjectRemoveButton.innerHTML = "X";

    newProjectRemoveButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (taskManager.getTasksByCategory(element.name).length > 0) {
        alert(
          "You must delete all items in a project before deleting the project."
        );
      } else {
        projectManager.removeProject(element);
        readProjects();
        readTasks();
      }
    });
    projectItem.addEventListener("click", () => {
      const filteredTasks = taskManager.getTasksByCategory(element.name);
      readTasks(filteredTasks);
    });

    projectItem.appendChild(newProjectRemoveButton);

    //Append new item to the project list
    projectList.appendChild(projectItem);
  });

  document.querySelector("#newProjectName").value = "";
  newProjectForm.classList.add("hidden");
}

function readTasks(tasksArray = taskManager.getTasks()) {
  // Clear the container to avoid duplicating tasks on each render
  taskContainer.innerHTML = "";

  // Sort tasks so completed ones appear at the bottom
  tasksArray.sort((a, b) => a.completed - b.completed);

  tasksArray.forEach((element) => {
    // Create task container
    const newTaskContainer = document.createElement("div");
    newTaskContainer.classList.add("task");
    newTaskContainer.id = element.taskName;

    // Apply a "completed" style if the task is marked as completed
    if (element.completed) {
      newTaskContainer.classList.add("task-completed");
    }

    // Task Name
    const newTaskName = document.createElement("div");
    newTaskName.innerHTML = element.taskName;
    newTaskContainer.appendChild(newTaskName);

    // Task Description
    const newTaskDescription = document.createElement("div");
    newTaskDescription.innerHTML = element.taskDescription;
    newTaskContainer.appendChild(newTaskDescription);

    // Task Due Date
    const newTaskDueDate = document.createElement("div");
    newTaskDueDate.innerHTML = element.taskDueDate;
    newTaskContainer.appendChild(newTaskDueDate);

    // Task Project
    const newTaskProject = document.createElement("div");
    newTaskProject.innerHTML = element.taskProject;
    newTaskContainer.appendChild(newTaskProject);

    // Task Completed Checkbox
    const newTaskCompleted = document.createElement("input");
    newTaskCompleted.type = "checkbox";
    newTaskCompleted.checked = element.completed || false;
    newTaskCompleted.classList.add("task-completed-checkbox");

    newTaskCompleted.addEventListener("change", (event) => {
      element.completed = event.target.checked;
      // Update styles based on completed status
      if (element.completed) {
        newTaskContainer.classList.add("task-completed");
      } else {
        newTaskContainer.classList.remove("task-completed");
      }
      readTasks(); // Re-render tasks to move completed ones to the bottom
    });

    const newTaskCompletedLabel = document.createElement("label");
    newTaskCompletedLabel.innerText = "Completed";

    // Append the checkbox and label to the task container
    newTaskContainer.appendChild(newTaskCompletedLabel);
    newTaskContainer.appendChild(newTaskCompleted);

    // Remove Button
    const newTaskRemoveButton = document.createElement("button");
    newTaskRemoveButton.innerHTML = "X";
    newTaskRemoveButton.classList.add("remove-task-button");

    newTaskRemoveButton.addEventListener("click", () => {
      taskManager.removeTask(element); // Remove from task manager
      readTasks(); // Re-render tasks to reflect removal
    });

    newTaskContainer.appendChild(newTaskRemoveButton);

    // Append the task container to the parent container
    taskContainer.appendChild(newTaskContainer);
  });
}

function openModal() {
  addProjectsToDropdown();
  MODAL.style.display = "block";
  const form = document.querySelector("#taskForm");
  form.onsubmit = (event) => {
    event.preventDefault();
    // alert("Task Submitted");
    const taskName = document.querySelector("#taskName").value;
    const description = document.querySelector("#taskDescription").value;
    const taskDueDate = document.querySelector("#taskDueDate").value;
    const taskProject = document.querySelector("#taskProject").value;

    let newTask = taskManager.addTask(
      createTask(taskName, description, taskDueDate, taskProject)
    );

    if (projectManager.searchForProject(taskProject)) {
      projectManager.addTaskToProject(taskProject, newTask);
    }
    form.reset();
    MODAL.style.display = "none";

    readTasks();
  };

  checkForModalClose(form);
}

function checkForModalClose(form) {
  closeModalButton.addEventListener("click", () => {
    form.reset();
    MODAL.style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target == MODAL) {
      form.reset();
      MODAL.style.display = "none";
    }
  };
}

export function initializeDOM() {
  // initializeListeningOnProjects();
  setupDropdownToggle();
  initializeProjectForm();
  readTasks();
  readProjects();
  addTaskElement.onclick = openModal;
}
