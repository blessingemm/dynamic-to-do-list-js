// Run everything after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // Don't save again to avoid duplication
  }

  // Save tasks array to local storage
  function saveTasksToLocalStorage(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  // Add a new task (taskText: string, save: boolean)
  function addTask(taskText, save = true) {
    if (!taskText || taskText.trim() === "") {
      alert("Enter a task");
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    // Task removal handler
    removeBtn.onclick = function () {
      taskList.removeChild(li);

      // Remove from Local Storage
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = tasks.filter((task) => task !== taskText);
      saveTasksToLocalStorage(updatedTasks);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = "";

    // Save to Local Storage
    if (save) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(taskText);
      saveTasksToLocalStorage(tasks);
    }
  }

  // Add button click
  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
  });

  // Enter key press
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      addTask(taskText);
    }
  });

  // Initial load of tasks from local storage
  loadTasks();
});
