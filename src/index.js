import displayController from "./display-controller";
import format from 'date-fns';

const task = (title, description, dueDate, priority) => {

    return {
        title,
        description,
        dueDate,
        priority,
    }
};

const project = (title) => {
    let tasks = [];

    function addTask(title, description, dueDate, priority) {
        tasks.push(task(title, description, dueDate, priority));
    }

    function removeTask(task) {
        const index = tasks.indexOf(task);
        if (index > -1) {
            tasks.splice(index, 1);
        }
    }

    return {
        title,
        tasks,
        addTask,
        removeTask,
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

    function addTaskToProject(title, description, date, priority, projectID) {
        getProject(projectID).addTask(title, description, date, priority);
        this.onChange();
    }


    return {
        projects,
        addProject,
        getProject,
        bindChangeCallback,
        deleteTask,
        addTaskToProject,
        deleteProject,
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

    function handleEditTask() {

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