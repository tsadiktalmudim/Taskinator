var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");

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
    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskE1
    createTaskE1(taskDataObj);
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
    console.log(event.target);
    if (event.target.matches(".delete-btn")) {
        //get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}
pageContentE1.addEventListener("click", taskButtonHandler);
formE1.addEventListener("submit", taskFormHandler);
console.log(taskFormHandler);