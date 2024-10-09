export function createProject(name) {
  return {
    name,
    tasks: [],
  };
}

export function projectManagement() {
  const projects = [{ name: "Default", tasks: [] }];

  const addProject = (project) => {
    projects.push(project);
    console.log(`added ${project.name} to project array`);
  };

  const removeProject = (project) => {
    let tempProjObj = project;
    let index = projects.indexOf(project);
    if (index > -1) {
      projects.splice(index, 1);
    }
    console.log(`${tempProjObj.name} was removed`);
  };

  const getProjects = () => projects;

  const addTaskToProject = (projectName, task) => {
    const project = projects.find((proj) => proj.name === projectName);

    if (project) {
      project.tasks.push(task);
    } else {
      console.warn(`Project "${projectName}" not found`);
    }
  };

  const getTasksByProject = (projectName) => {
    const project = projects.find((proj) => proj.name === projectName);
    return project ? project.tasks : [];
  };

  const searchForProject = (projectName) => {
    const project = projects.find((proj) => proj.name === projectName);
    return project;
  };

  const projectExists = (projectName) => {
    let projExists = false;
    for (const element of projects) {
      if (element.name === projectName) {
        projExists = true;
        break;
      }
    }
    return projExists;
  };

  return {
    addProject,
    removeProject,
    getProjects,
    addTaskToProject,
    getTasksByProject,
    searchForProject,
    projectExists,
  };
}
