/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/display-controller.js":
/*!***********************************!*\
  !*** ./src/display-controller.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return displayController; });\n\nfunction displayController(element) {\n    const displayArea = document.getElementById(element);\n    let handleCompleteTask, handleEditTask, handleDeleteTask, handleAddTask;\n    let handleAddProject, handleDeleteProject;\n\n    let _title = document.getElementById('task-title');\n    let _description = document.getElementById('task-description');\n    let _priority = document.getElementById('task-priority');\n    let _project = document.getElementById('task-project');\n    let _date = document.getElementById('task-due');\n    let _taskButton = document.getElementById('task-button');\n\n    _date.valueAsDate = new Date();\n\n    let _projectButton = document.getElementById('project-button');\n    _projectButton.addEventListener('click', () => {\n        let title = window.prompt(\"New project name\", \"\");\n        if (title != \"\" && title != null) {\n            handleAddProject(title);\n        }\n    });\n\n    _taskButton.addEventListener('click', () => {\n        if (_title.value) {\n            handleAddTask(_title.value, _description.value, _date.value, _priority.value, _project.value);\n        }\n    });\n\n    function renderTaskForm() {\n\n    }\n\n    function renderProjects(projects) {\n        _populateProjectDropdown(projects);\n        while (displayArea.lastChild) {\n            displayArea.removeChild(displayArea.lastChild);\n        }\n        let id = 0;\n        projects.forEach((project) => {\n            let figure = document.createElement(\"figure\");\n            let figc = document.createElement(\"figcaption\");\n            figc.textContent = project.title;\n            figure.appendChild(figc);\n\n            if (id != 0) {\n                figure.appendChild(_createDeleteButton());\n            }\n            figure.appendChild(_renderTasks(project.tasks));\n            figure.dataset.project = id++;\n            displayArea.appendChild(figure);\n        });\n    }\n\n    function _populateProjectDropdown(projects) {\n        while (_project.lastChild) {\n            _project.removeChild(_project.lastChild);\n        }\n        let id = 0;\n\n        projects.forEach((project) => {\n            let option = document.createElement(\"option\");\n            option.value = id++;\n            option.textContent = project.title;\n            _project.appendChild(option);\n        })\n    }\n\n    function _createDeleteButton() {\n        let deleteButton = document.createElement(\"button\");\n        deleteButton.type = \"button\";\n        deleteButton.textContent = 'x';\n        deleteButton.classList.add('delete-button');\n        deleteButton.addEventListener('click', event => {\n            if (window.confirm(`Delete project '${event.target.previousSibling.textContent}'?`)) {\n                handleDeleteProject(parseInt(event.target.parentElement.dataset.project));\n            }\n        });\n        return deleteButton;\n    }\n\n    function _renderTasks(tasks) {\n        let list = document.createElement(\"ul\");\n        list.classList.add(\"tasks-list\");\n        tasks.forEach((task) => {\n            let li = document.createElement(\"li\");\n            li.appendChild(_renderTask(task));\n            list.appendChild(li);\n        });\n        return list;\n    }\n\n    function _createElement(element, classname, text) {\n        let ele = document.createElement(element);\n        ele.classList.add(classname);\n        ele.textContent = text;\n\n        return ele;\n    }\n\n    function _renderTask(task) {\n        let taskDiv = document.createElement(\"div\");\n        taskDiv.classList.add(\"task\");\n\n        let summary = document.createElement(\"div\");\n        summary.classList.add(\"summary\");\n        let detail = document.createElement(\"div\");\n        detail.classList.add(\"detail\");\n\n        summary.appendChild(_createElement(\"div\", \"title\", task.title));\n\n        detail.appendChild(_createElement(\"div\", \"description\", task.description));\n\n        summary.appendChild(_createElement(\"div\", \"date\", task.dueDate));\n\n        taskDiv.classList.add(`priority-${task.priority}`);\n\n        let button = document.createElement(\"button\");\n        button.type = \"button\";\n        button.textContent = \"✓\";\n        button.classList.add(\"complete\");\n\n        button.addEventListener('click', event => {\n            handleCompleteTask(task);\n        });\n\n        summary.appendChild(button);\n\n        let editButton = document.createElement(\"button\");\n        editButton.type = \"button\";\n        editButton.textContent = \"Edit\";\n        editButton.classList.add(\"button-edit\");\n\n        editButton.addEventListener('click', event => {\n            event.stopPropagation();\n            _renderEdit(event.target.closest('.task'), task);\n        });\n\n        detail.appendChild(editButton);\n\n        taskDiv.appendChild(summary);\n        taskDiv.appendChild(detail);\n\n        let expandButton = document.createElement(\"button\");\n        expandButton.type = \"button\";\n        expandButton.textContent = \"+\";\n        expandButton.classList.add(\"toggle-expand\");\n\n        expandButton.addEventListener('click', event => {\n            if (taskDiv.classList.contains(\"expanded\")) {\n                taskDiv.classList.remove(\"expanded\");\n                expandButton.textContent = \"+\";\n            } else {\n                taskDiv.classList.add(\"expanded\");\n                expandButton.textContent = \"-\";\n            }\n        });\n\n        summary.appendChild(expandButton);\n\n        return taskDiv;\n    }\n\n    function _renderEdit(node, task) {\n        while (node.lastChild) {\n            node.removeChild(node.lastChild);\n        }\n\n        node.classList.add('edit');\n\n        let title = document.createElement('input');\n        title.type = 'text';\n        title.value = task.title;\n\n        let description = document.createElement('input');\n        description.type = 'text';\n        description.value = task.description;\n\n        let priority = _priority.cloneNode(true);\n        priority.value = task.priority;\n\n        let project = _project.cloneNode(true);\n        project.value = node.closest('figure').dataset.project;\n\n        let date = _date.cloneNode(true);\n        date.value = task.dueDate;\n\n        let save = document.createElement('button');\n        save.type = 'button';\n        save.textContent = 'Save';\n\n        node.appendChild(title);\n        node.appendChild(description);\n        node.appendChild(priority);\n        node.appendChild(project);\n        node.appendChild(date);\n        node.appendChild(save);\n\n        const clickOutside = (event) => {\n            console.log(node);\n            console.log(event.target);\n            if (!node.contains(event.target) || event.target == save) {\n                handleEditTask(task, title.value, description.value, priority.value, date.value, project.value);\n                document.removeEventListener('click', clickOutside);\n            }\n        }\n\n        document.addEventListener('click', clickOutside);\n    }\n\n\n\n    function bindCompleteTask(handler) {\n        handleCompleteTask = handler;\n    }\n\n    function bindAddTask(handler) {\n        handleAddTask = handler;\n    }\n\n    function bindEditTask(handler) {\n        handleEditTask = handler;\n    }\n\n    function bindDeleteTask(handler) {\n        handleDeleteTask = handler;\n    }\n\n    function bindAddProject(handler) {\n        handleAddProject = handler;\n    }\n\n    function bindDeleteProject(handler) {\n        handleDeleteProject = handler;\n    }\n\n    return {\n        renderProjects,\n        bindCompleteTask,\n        bindAddTask,\n        bindEditTask,\n        bindDeleteTask,\n        bindAddProject,\n        bindDeleteProject,\n    }\n};\n\n//# sourceURL=webpack:///./src/display-controller.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _display_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display-controller */ \"./src/display-controller.js\");\n\n\nconst task = (title, description, dueDate, priority) => {\n\n    function update(title, description, dueDate, priority) {\n        this.title = title;\n        this.description = description;\n        this.dueDate = dueDate;\n        this.priority = priority;\n    }\n\n    return {\n        title,\n        description,\n        dueDate,\n        priority,\n        update,\n    }\n};\n\nconst project = (title) => {\n    let tasks = [];\n\n    function addTask(title, description, dueDate, priority) {\n        tasks.push(task(title, description, dueDate, priority));\n    }\n\n    function addExistingTask(task) {\n        tasks.push(task);\n    }\n\n    function removeTask(task) {\n        const index = tasks.indexOf(task);\n        if (index > -1) {\n            tasks.splice(index, 1);\n        }\n    }\n\n    function containsTask(task) {\n        return tasks.includes(task);\n    }\n\n    return {\n        title,\n        tasks,\n        addTask,\n        removeTask,\n        containsTask,\n        addExistingTask,\n    }\n};\n\nconst projectManager = () => {\n    let projects = [];\n\n    function addProject(name) {\n        projects.push(project(name));\n        this.onChange();\n    }\n\n    function deleteProject(id) {\n        projects.splice(id, 1);\n        this.onChange();\n    }\n\n    function getProject(id) {\n        return projects[id];\n    }\n\n    function bindChangeCallback(callback) {\n        this.onChange = callback;\n    }\n\n    function deleteTask(task) {\n        projects.forEach((project) => {\n            project.removeTask(task);\n        });\n        this.onChange();\n    }\n\n    function editTask(task, title, description, priority, date, projectID) {\n        let current = whichProject(task);\n        task.update(title, description, date, priority);\n\n        if (projectID != current) {\n            projects[current].removeTask(task);\n            projects[projectID].addExistingTask(task);\n        }\n\n        this.onChange();\n    }\n\n    function addTaskToProject(title, description, date, priority, projectID) {\n        getProject(projectID).addTask(title, description, date, priority);\n        this.onChange();\n    }\n\n    function whichProject(task) {\n        for (let index = 0; index < projects.length; index++) {\n            const proj = projects[index];\n            if (proj.containsTask(task)) {\n                return index;\n            }\n        }\n\n        return -1;\n    }\n\n    function saveProjects() {\n        if (storageAvailable('localStorage')) {\n            localStorage.setItem('savedProjects', JSON.stringify(projects));\n        }\n    }\n\n    function loadProjects() {\n        if (localStorage.getItem('savedProjects') != null) {\n            let projParams = JSON.parse(localStorage.getItem('savedProjects'));\n            projParams.forEach(proj => {\n                let newProj = project(proj.title);\n                proj.tasks.forEach(t => {\n                    newProj.addTask(t.title, t.description, t.dueDate, t.priority);\n                })\n                projects.push(newProj);\n            })\n        } else {\n            addProject(\"Default\");\n        }\n    }\n\n\n    return {\n        projects,\n        addProject,\n        getProject,\n        bindChangeCallback,\n        deleteTask,\n        addTaskToProject,\n        deleteProject,\n        editTask,\n        saveProjects,\n        loadProjects,\n    }\n};\n\nfunction storageAvailable(type) {\n    var storage;\n    try {\n        storage = window[type];\n        var x = '__storage_test__';\n        storage.setItem(x, x);\n        storage.removeItem(x);\n        return true;\n    }\n    catch (e) {\n        return e instanceof DOMException && (\n            // everything except Firefox\n            e.code === 22 ||\n            // Firefox\n            e.code === 1014 ||\n            // test name field too, because code might not be present\n            // everything except Firefox\n            e.name === 'QuotaExceededError' ||\n            // Firefox\n            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&\n            // acknowledge QuotaExceededError only if there's something already stored\n            (storage && storage.length !== 0);\n    }\n}\n\nconst controller = (model, view) => {\n\n    function onModelChange() {\n        view.renderProjects(model.projects);\n        model.saveProjects();\n    }\n\n    function handleDeleteTask(task) {\n        model.deleteTask(task);\n    }\n\n    function handleAddTask(title, description, priority, date, projectID) {\n        model.addTaskToProject(title, description, priority, date, projectID);\n    }\n\n    function handleEditTask(task, title, description, priority, date, projectID) {\n        model.editTask(task, title, description, priority, date, projectID);\n    }\n\n    function handleAddProject(name) {\n        model.addProject(name);\n    }\n\n    function handleDeleteProject(id) {\n        model.deleteProject(id);\n    }\n\n    model.bindChangeCallback(onModelChange);\n    view.bindCompleteTask(handleDeleteTask);\n    view.bindAddTask(handleAddTask);\n    view.bindEditTask(handleEditTask);\n    view.bindDeleteTask(handleDeleteTask);\n    view.bindAddProject(handleAddProject);\n    view.bindDeleteProject(handleDeleteProject);\n\n    model.loadProjects();\n    view.renderProjects(model.projects);\n};\n\nlet foo = controller(projectManager(), Object(_display_controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('task-area'));\nconsole.log(foo);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });