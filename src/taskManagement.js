export function createTask(taskName, taskDescription, taskDueDate, taskProject = '', completed=false){
    return {
        taskName,
        taskDescription,
        taskDueDate,
        taskProject,
        completed

    };
};

export const taskManagement = (task)=>{
    const tasks = [{taskName:"Go Shopping", taskDescription: "Go to mall to buy some clothes for party", taskDueDate:"Oct 24, 2024", taskProject: "Personal 🏠"}];

    const removeTask = (task)=>{
        let index = tasks.indexOf(task);
        if (index > -1){
            tasks.splice(index, 1);
        }
    };

    const addTask = (task)=>{
        tasks.push(task);
        return task;
    }

    const getTasks = () => tasks;


    return{
        removeTask,
        addTask,
        getTasks
    };


};