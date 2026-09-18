let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = document.getElementById("task-list");

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  taskList.innerHTML = "";

  savedTasks.forEach(function (task, index) {
    let li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;

    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", function () {
  let text = taskInput.value.trim();
  if (text === "") return;

  savedTasks.push({ text: text, completed: false });

  saveAndRefresh();
  taskInput.value = "";
});

function toggleTask(index) {
  savedTasks[index].completed = !savedTasks[index].completed;
  saveAndRefresh();
}

function deleteTask(index) {
  savedTasks.splice(index, 1);
  saveAndRefresh();
}

function saveAndRefresh() {
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
  displayTasks();
}

displayTasks();
