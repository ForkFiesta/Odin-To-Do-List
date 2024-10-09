import { projectManagement } from "./projectManagement";

const projectManager = projectManagement();

export function createTask(
  taskName,
  taskDescription,
  taskDueDate,
  taskProject,
  completed = false
) {
  return {
    taskName,
    taskDescription,
    taskDueDate,
    taskProject,
    completed,
  };
}

export const taskManagement = (task) => {
  const tasks = [
    {
      taskName: "Go Shopping",
      taskDescription: "Go to mall to buy some clothes for party",
      taskDueDate: "Oct 24, 2024",
      taskProject: "Personal 🏠",
    },
  ];

  const removeTask = (task) => {
    let tempTaskObk = task;
    let index = tasks.indexOf(task);
    if (index > -1) {
      tasks.splice(index, 1);
    }
    console.log(`${tempTaskObk.taskName} was removed`);
  };

  const addTask = (task) => {
    tasks.push(task);
    console.log(`${task.taskName} was added to task array`);
    return task;
  };

  const getTasks = () => {
    const cleanTasks = tasks.filter((element) =>
      projectManager.projectExists(element.taskProject)
    );
    return cleanTasks;
  };

  const getTasksByCategory = (category) => {
    console.log(`Getting all tasks with category ${category}`);
    const filteredTasks = tasks.filter(
      (element) => element.taskProject == category
    );
    return filteredTasks;
  };

  return {
    removeTask,
    addTask,
    getTasks,
    getTasksByCategory,
  };
};
