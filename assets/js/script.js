var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");
var tasksInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // check if input values are null
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to complete the task form!");
        return false;
    }
    formE1.reset();
    var isEdit = formE1.hasAttribute("data-task-id");
    if (isEdit) {
        var taskId = formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskE1(taskDataObj);
    }
};

var createTaskE1 = function(taskDataObj) {
    // create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    // add task id as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    // Give it a class name
    taskInfoE1.className = "task-info";
    // Create new HTML for div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class='task-type'>" + taskDataObj.type + "</span>";
    listItemE1.appendChild(taskInfoE1);

    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskActionsE1);

    // add entire list item to list
    tasksToDoE1.appendChild(listItemE1);

    //increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";

    // create buttons to go inside the div
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);
    // append button to div
    actionContainerE1.appendChild(editButtonE1);

    //create delete button
    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);
    // append button to div
    actionContainerE1.appendChild(deleteButtonE1);

    //create <select> dropdowns
    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);
    // append to div
    actionContainerE1.appendChild(statusSelectE1);

    //for loop to create options in <select>
    var statusChoices = ["To-Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionE1 = document.createElement("option");
        statusOptionE1.textContent = statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);
        //append to <select>
        statusSelectE1.appendChild(statusOptionE1);
    }
    return actionContainerE1;
};


var taskButtonHandler = function(event) {
    // get target element from event
    var targetE1 = event.target;

    // edit button is clicked
    if (targetE1.matches(".edit.btn")) {
        var taskId = targetE1.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button is clicked
    else if (targetE1.matches(".delete-btn")) {
        //get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var completeEditTask = function(taskName, taskType, taskId) {
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //assign values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task updated!")

    // reset button textback to normal
    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var editTask = function(taskId) {
    console.log(taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    // write values of the taskName and taskType to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    //set data attribute to the form with a value of the task's id so it knows which one is being edited
    formE1.setAttribute("data-task-id", taskId);
    // update button to reflect editing rather than adding a new task
    formE1.querySelector("#save-task").textContent = "Save Task";

};


var deleteTask = function(taskId) {
    // find task with correct taskId and remove it
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var taskStatusChangeHandler = function(event) {
    //get task id
    var taskId = event.target.getAttribute("data-task-id");
    // get the current selection value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    // find parent task item based on id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoE1.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressE1.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedE1.appendChild(taskSelected);
    }
};
// create new task
formE1.addEventListener("submit", taskFormHandler);
// edit and delete tasks
pageContentE1.addEventListener("click", taskButtonHandler);
// change task status
pageContentE1.addEventListener("change", taskStatusChangeHandler);