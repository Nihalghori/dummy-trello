const inputBoxes = document.getElementsByClassName("taskInput");
const listContainers = document.getElementsByClassName("listContainer");


window.addEventListener("load", loadTasks);

function addTask() {
  for (let i = 0; i < inputBoxes.length; i++) {
    let inputBox = inputBoxes[i];
    let listContainer = listContainers[i];

    if (inputBox.value === "") {
    } else {
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      li.draggable = true;
      li.addEventListener("dragstart", dragStart);
      listContainer.appendChild(li);

    
      if (!li.querySelector(".deleteButton")) {
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("deleteButton");
        li.appendChild(deleteButton);
      }
    }
    inputBox.value = "";
  }

  attachDeleteButtonListeners();
  
  // Save tasks to local storage
  saveTasks();
}

function attachDeleteButtonListeners() {
  let deleteButtons = document.getElementsByClassName("deleteButton");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteTask);
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function dragStart(event) {
  event.dataTransfer.effectAllowed = "move"; 
  event.dataTransfer.setData("text/plain", event.target.innerHTML);
  event.target.id = "draggedElement";

  
  let deleteButton = event.target.querySelector(".deleteButton");
  if (deleteButton) {
    deleteButton.remove();
  }
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text/plain");

  
  let existingList = event.target.closest(".listContainer");
  if (existingList) {
    let li = document.createElement("li");
    li.innerHTML = data;
    li.draggable = true;
    li.addEventListener("dragstart", dragStart);

    
    if (!li.querySelector(".deleteButton")) {
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.classList.add("deleteButton");
      li.appendChild(deleteButton);
    }

    existingList.appendChild(li);
  }


  let originalElement = document.getElementById("draggedElement");
  if (originalElement) {
    originalElement.remove();
  }

  attachDeleteButtonListeners();
  
  
  saveTasks();
}

function deleteTask(event) {
  let listItem = event.target.parentNode;
  listItem.remove();
  

  saveTasks();
}

function saveTasks() {
  let tasks = [];
  for (let i = 0; i < listContainers.length; i++) {
    let listItems = listContainers[i].getElementsByTagName("li");
    let taskList = [];
    for (let j = 0; j < listItems.length; j++) {
      taskList.push(listItems[j].innerHTML);
    }
    tasks.push(taskList);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    tasks = JSON.parse(tasks);
    for (let i = 0; i < tasks.length; i++) {
      let taskList = tasks[i];
      let listContainer = listContainers[i];
      for (let j = 0; j < taskList.length; j++) {
        let li = document.createElement("li");
        li.innerHTML = taskList[j];
        li.draggable = true;
        li.addEventListener("dragstart", dragStart);

      
        if (!li.querySelector(".deleteButton")) {
          let deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.classList.add("deleteButton");
          li.appendChild(deleteButton);
        }

        listContainer.appendChild(li);
      }
    }
    attachDeleteButtonListeners();
  }
}













