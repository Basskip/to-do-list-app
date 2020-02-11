
export default function displayController(element) {
    const displayArea = document.getElementById(element);
    let handleCompleteTask, handleEditTask, handleDeleteTask, handleAddTask;
    let handleAddProject, handleDeleteProject;

    let _title = document.getElementById('task-title');
    let _description = document.getElementById('task-description');
    let _priority = document.getElementById('task-priority');
    let _project = document.getElementById('task-project');
    let _date = document.getElementById('task-due');
    let _taskButton = document.getElementById('task-button');

    _date.valueAsDate = new Date();

    let _projectButton = document.getElementById('project-button');
    _projectButton.addEventListener('click', () => {
        let title = window.prompt("New project name", "");
        if (title != "") {
            handleAddProject(title);
        }
    });

    _taskButton.addEventListener('click', () => {
        if (_title.value) {
            handleAddTask(_title.value, _description.value, _date.value, _priority.value, _project.value);
        }
    });

    function renderTaskForm() {

    }

    function renderProjects(projects) {
        _populateProjectDropdown(projects);
        while (displayArea.lastChild) {
            displayArea.removeChild(displayArea.lastChild);
        }
        let id = 0;
        projects.forEach((project) => {
            let figure = document.createElement("figure");
            let figc = document.createElement("figcaption");
            figc.textContent = project.title;
            figure.appendChild(figc);

            if (id != 0) {
                figure.appendChild(_createDeleteButton());
            }
            figure.appendChild(_renderTasks(project.tasks));
            figure.dataset.project = id++;
            displayArea.appendChild(figure);
        });
    }

    function _populateProjectDropdown(projects) {
        while (_project.lastChild) {
            _project.removeChild(_project.lastChild);
        }
        let id = 0;

        projects.forEach((project) => {
            let option = document.createElement("option");
            option.value = id++;
            option.textContent = project.title;
            _project.appendChild(option);
        })
    }

    function _createDeleteButton() {
        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = 'x';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', event => {
            handleDeleteProject(parseInt(event.target.parentElement.dataset.project));
        });
        return deleteButton;
    }

    function _renderTasks(tasks) {
        let list = document.createElement("ul");
        list.classList.add("tasks-list");
        tasks.forEach((task) => {
            let li = document.createElement("li");
            li.appendChild(_renderTask(task));
            list.appendChild(li);
        });
        return list;
    }

    function _createElement(element, classname, text) {
        let ele = document.createElement(element);
        ele.classList.add(classname);
        ele.textContent = text;

        return ele;
    }

    function _renderTask(task) {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        let text = document.createElement("div");
        text.classList.add("text");
        taskDiv.appendChild(text);

        text.appendChild(_createElement("div", "title", task.title));

        text.appendChild(_createElement("div", "description", task.description));

        taskDiv.appendChild(_createElement("div", "date", task.dueDate));

        taskDiv.classList.add(`priority-${task.priority}`);

        let button = document.createElement("button");
        button.type = "button";
        button.classList.add("complete");
        
        function handleEvent(task) {
            return function(e) {
                handleCompleteTask(task);
            };
        }
        button.addEventListener('click', handleEvent(task));

        taskDiv.appendChild(button);

        let editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.classList.add("button-edit");

        taskDiv.appendChild(editButton);

        return taskDiv;
    }

    function bindCompleteTask(handler) {
        handleCompleteTask = handler;
    }

    function bindAddTask(handler) {
        handleAddTask = handler;
    }

    function bindEditTask(handler) {
        handleEditTask = handler;
    }

    function bindDeleteTask(handler) {
        handleDeleteTask = handler;
    }

    function bindAddProject(handler) {
        handleAddProject = handler;
    }

    function bindDeleteProject(handler) {
        handleDeleteProject = handler;
    }

    return {
        renderProjects,
        bindCompleteTask,
        bindAddTask,
        bindEditTask,
        bindDeleteTask,
        bindAddProject,
        bindDeleteProject,
    }
};