    // Load tasks from localStorage on page load
    function loadTasks() {
      var doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];
      for (var i = 0; i < doneTasks.length; i++) {
        createTaskElement(doneTasks[i], true);
      }
    }

    // Save "Done" tasks to localStorage
    function saveTasks() {
      var taskList = document.getElementById('taskList');
      var doneTasks = [];
      var tasks = taskList.getElementsByClassName('done');
      for (var i = 0; i < tasks.length; i++) {
        var taskTextElement = tasks[i].getElementsByTagName('span')[0];
        if (taskTextElement) {
          doneTasks.push(taskTextElement.innerText);
        }
      }
      localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }

    // Create a task element
    function createTaskElement(taskText, isDone) {
      var taskList = document.getElementById('taskList');

      var taskDiv = document.createElement('div');
      taskDiv.className = 'task';
      if (isDone) {
        taskDiv.classList.add('done');
      }

      var taskTextElement = document.createElement('span');
      taskTextElement.innerText = taskText;

      var editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.onclick = function () {
        if (!taskDiv.classList.contains('done')) {
          editTask(taskDiv, taskTextElement, editButton, deleteButton, doneButton);
        }
      };

      var deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.onclick = function () {
        taskDiv.remove();
        saveTasks();
      };

      var doneButton = document.createElement('button');
      doneButton.innerText = 'Done';
      doneButton.onclick = function () {
        taskDiv.classList.add('done');
        saveTasks();
      };

      taskDiv.appendChild(taskTextElement);
      taskDiv.appendChild(editButton);
      taskDiv.appendChild(deleteButton);
      taskDiv.appendChild(doneButton);
      taskList.appendChild(taskDiv);
    }

    // Add a new task
    function addTask() {
      var taskInput = document.getElementById('taskInput');
      if (taskInput.value=== '') {
        alert('Add Your Activity!');
        return;
      }

      createTaskElement(taskInput.value, false);
      taskInput.value = ''; // Clear input field
    }

    // Edit a task
    function editTask(taskDiv, taskTextElement, editButton, deleteButton, doneButton) {
      var currentText = taskTextElement.innerText;

      // Hide text and buttons
      taskTextElement.style.display = 'none';
      editButton.style.display = 'none';
      deleteButton.style.display = 'none';
      doneButton.style.display = 'none';

      // Add input field for editing
      var editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = currentText;

      var updateButton = document.createElement('button');
      updateButton.innerText = 'Update';
      updateButton.onclick = function () {
        if (editInput.value=== '') {
          alert('Task cannot be empty!');
          return;
        }

        // Update text
        taskTextElement.innerText = editInput.value;

        // Restore original state
        taskTextElement.style.display = 'inline';
        editButton.style.display = 'inline';
        deleteButton.style.display = 'inline';
        doneButton.style.display = 'inline';

        // Remove editing elements
        editInput.remove();
        updateButton.remove();
      };

      taskDiv.appendChild(editInput);
      taskDiv.appendChild(updateButton);
    }

    // Load "Done" tasks on page load
    window.onload = loadTasks;
  