import displayController from "./display-controller";
import format from 'date-fns';

const task = (title, description, dueDate, priority) => {

    function update(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    return {
        title,
        description,
        dueDate,
        priority,
        update,
    }
};

const project = (title) => {
    let tasks = [];

    function addTask(title, description, dueDate, priority) {
        tasks.push(task(title, description, dueDate, priority));
    }

    function addExistingTask(task) {
        tasks.push(task);
    }

    function removeTask(task) {
        const index = tasks.indexOf(task);
        if (index > -1) {
            tasks.splice(index, 1);
        }
    }

    function containsTask(task) {
        return tasks.includes(task);
    }

    return {
        title,
        tasks,
        addTask,
        removeTask,
        containsTask,
        addExistingTask,
    }
};

const projectManager = () => {
    let projects = [];

    function addProject(name) {
        projects.push(project(name));
        this.onChange();
    }

    function deleteProject(id) {
        projects.splice(id, 1);
        this.onChange();
    }

    function getProject(id) {
        return projects[id];
    }

    function bindChangeCallback(callback) {
        this.onChange = callback;
    }

    function deleteTask(task) {
        projects.forEach((project) => {
            project.removeTask(task);
        });
        this.onChange();
    }

    function editTask(task, title, description, priority, date, projectID) {
        let current = whichProject(task);
        task.update(title, description, date, priority);

        if (projectID != current) {
            projects[current].removeTask(task);
            projects[projectID].addExistingTask(task);
        }

        this.onChange();
    }

    function addTaskToProject(title, description, date, priority, projectID) {
        getProject(projectID).addTask(title, description, date, priority);
        this.onChange();
    }

    function whichProject(task) {
        for (let index = 0; index < projects.length; index++) {
            const proj = projects[index];    
            if (proj.containsTask(task)) {
                return index;
            }
        }

        return -1;
    }


    return {
        projects,
        addProject,
        getProject,
        bindChangeCallback,
        deleteTask,
        addTaskToProject,
        deleteProject,
        editTask,
    }
};

const controller = (model, view) => {

    function onModelChange() {
        view.renderProjects(model.projects);
    }
    
    function handleDeleteTask(task) {
        model.deleteTask(task);
    }

    function handleAddTask(title, description, priority, date, projectID) {
        model.addTaskToProject(title, description, priority, date, projectID);
    }

    function handleEditTask(task, title, description, priority, date, projectID) {
        model.editTask(task, title, description, priority, date, projectID);
    }

    function handleAddProject(name) {
        model.addProject(name);
    }

    function handleDeleteProject(id) {
        model.deleteProject(id);
    }

    model.bindChangeCallback(onModelChange);
    view.bindCompleteTask(handleDeleteTask);
    view.bindAddTask(handleAddTask);
    view.bindEditTask(handleEditTask);
    view.bindDeleteTask(handleDeleteTask);
    view.bindAddProject(handleAddProject);
    view.bindDeleteProject(handleDeleteProject);

    model.addProject("Default");

    model.addTaskToProject("Do your JavaScript course", "Keep improving to get a job", "Today", "high", 0);
    model.addTaskToProject("Play some dota", "Have fun", "Tonight", "low", 0);
    view.renderProjects(model.projects);
};

let foo = controller(projectManager(), displayController('task-area'));
console.log(foo);