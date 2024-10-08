

export function createProject(name){

    return {
        name,
        tasks:[]
    };

}


export function projectManagement(){
    const projects = [{name:"Personal 🏠", tasks:[]}];

    const addProject = (project)=>{
        projects.push(project);
    };

    const removeProject = (project)=>{
        let index = projects.indexOf(project);
        if(index>-1){
            projects.splice(index,1);
        }
    }

    const getProjects = () => projects;

    const addTaskToProject = (projectName, task) => {
        const project = projects.find(proj => proj.projectName === projectName);

        if (project) {
            project.tasks.push(task);
        } else {
            console.warn(`Project "${projectName}" not found`);
        }
    };

    const getTasksByProject = (projectName) => {
        const project = projects.find(proj => proj.projectName === projectName);
        return project ? project.tasks : [];
        
    };

    const searchForProject = (projectName) => {
        const project = projects.find(proj => proj.projectName ===projectName);
        return project;
    }

    return{
        addProject,
        removeProject,
        getProjects,
        addTaskToProject,
        getTasksByProject,
        searchForProject
    };

}