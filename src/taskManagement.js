export function createTask(taskName, taskDescription, taskDueDate){
    return {
        taskName,
        taskDescription,
        taskDueDate,
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
    }

    const getTasks = () => tasks;


    return{
        removeTask,
        addTask,
        getTasks
    };


};