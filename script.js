// Wait until the entire DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Select the "Add Task" button
  const addButton = document.getElementById('add-task-btn');

  // Select the input field where the user types a task
  const taskInput = document.getElementById('task-input');

  // Select the <ul> element where tasks will be added
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
    // Get the text from the input field and trim any extra whitespace
    const taskText = taskInput.value.trim();

    // If the input is empty, show an alert and stop the function
    if (taskText === "") {
      alert('Enter a task');
      return;
    }

    // Create a new list item element for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a "Remove" button for the task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Add a click event to the remove button to delete the task
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Add the remove button to the list item
    li.appendChild(removeBtn);

    // Add the list item to the task list
    taskList.appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = "";
  }

  // Event listener for the "Add Task" button click
  addButton.addEventListener('click', addTask);

  // Event listener for pressing "Enter" inside the input field
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
