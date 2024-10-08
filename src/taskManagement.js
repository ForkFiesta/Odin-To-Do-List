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
    const tasks = [];

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