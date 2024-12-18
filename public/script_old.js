let tasks = [];
// document.addEventListener("DOMContentLoaded",() => {
//     const taskForm = document.getElementById("taskForm");
//     const submitButton = document.getElementById("submitTaskButton");
//     const clearButton = document.getElementById("clearCompletedButton");
   
//     taskForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         addTask();
//     });
//     submitButton.addEventListener("click", addTask);
//     clearButton.addEventListener("click", clearCompletedTasks);
// });

// function addTask() {
//   const taskInput = document.getElementById("taskInput");
//   const deadlineInput = document.getElementById("deadlineInput");
//   const categoryInput = document.getElementById("categoryInput");
//   const listTasks = document.querySelector(".listTasks");
  
//   const taskText = taskInput.value.trim();
//   const deadline = deadlineInput.value;
//     if (taskText === "" || deadline === "") {
//         alert("Please provide valid task details.");
//         return;
//     }
//   const category = categoryInput.value;
//     if (category === "select a category") {
//         alert("Please select a category.");
//         return;
//   }
  
  //push the tasks into the list, the deadline, and regroup the tasks by categories

//   tasks.push({ taskText, deadline, category, order: tasks.filter(task => task.category === category).length + 1 });
//   displayTasks(listTasks);

//   function displayTasks(listTasks) {
//     // Clear the list first
//     listTasks.innerHTML = "";

//     // Group tasks by category
//     const groupedTasks = tasks.reduce((acc, task) => {
//         if (!acc[task.category]) {
//             acc[task.category] = [];
//         }
//         acc[task.category].push(task);
//         return acc;
//     }, {});

    // Sort categories alphabetically
    // const sortedCategories = Object.keys(groupedTasks).sort();

    // sortedCategories.forEach((category) => {
    //     // Create a category section
    //     const categorySection = document.createElement("div");
    //     categorySection.setAttribute("data-category", category);

    //     const categoryHeader = document.createElement("h3");
    //     categoryHeader.textContent = category;
    //     categorySection.appendChild(categoryHeader);

    //     // Sort tasks within the category by order
    //     groupedTasks[category].sort((a, b) => a.order - b.order);

    //     groupedTasks[category].forEach((task) => {
    //         const taskDiv = document.createElement("div");
    //         taskDiv.classList.add("task");
    //         taskDiv.style.display = "flex";
    //         taskDiv.style.justifyContent = "space-between";
    //         taskDiv.style.alignItems = "center";
    //         taskDiv.style.marginBottom = "10px";

    //         // Add order number input
    //         const orderInput = document.createElement("input");
    //         orderInput.type = "number";
    //         orderInput.value = task.order;
    //         orderInput.min = 1;
    //         orderInput.style.width = "50px";
    //         orderInput.addEventListener("change", () => updateOrder(task, category, orderInput.value));

            const taskLabel = document.createElement("label");
            taskLabel.textContent = task.taskText;

            const deadlineLabel = document.createElement("span");
            deadlineLabel.textContent = `Deadline: ${new Date(task.deadline).toLocaleDateString()}`;
            deadlineLabel.style.marginLeft = "10px";

            taskDiv.appendChild(orderInput);
            taskDiv.appendChild(taskLabel);
            taskDiv.appendChild(deadlineLabel);

            categorySection.appendChild(taskDiv);
        });

        listTasks.appendChild(categorySection);
    });
  }
  function updateOrder(taskToUpdate, category, newOrder) {
    // Update the order for the task
    const taskInCategory = tasks.filter(task => task.category === category);
    const oldOrder = taskToUpdate.order;
    taskToUpdate.order = parseInt(newOrder, 10);

    // Adjust other tasks in the same category
    taskInCategory.forEach(task => {
        if (task !== taskToUpdate) {
            if (taskToUpdate.order > oldOrder && task.order > oldOrder && task.order <= taskToUpdate.order) {
                task.order -= 1;
            } else if (taskToUpdate.order < oldOrder && task.order < oldOrder && task.order >= taskToUpdate.order) {
                task.order += 1;
            }
        }
    });

    // Refresh the task list
    displayTasks(document.querySelector(".listTasks"));
}

  const statusDropdown = document.createElement("select");
    statusDropdown.style.marginLeft = "10px";
    const statuses = [
        { value: "active", text: "Active", style: "bold black" },
        { value: "inactive", text: "Inactive", style: "normal grey" },
        { value: "in process", text: "In Process", style: "normal orange" },
        { value: "blocked", text: "Blocked", style: "bold purple" },
        { value: "done", text: "Done", style: "bold red" },
    ];
    statuses.forEach((status) => {
        const option = document.createElement("option");
        option.value = status.value;
        option.textContent = status.text;
        option.style.fontWeight = status.fontWeight;
        option.style.color = status.color;

        // Apply style based on status
        if (status.style.includes("bold")) {
            option.style.fontWeight = "bold";
        } else {
            option.style.fontWeight = "normal";
        }

        if (status.style.includes("black")) {
            option.style.color = "black";
        } else if (status.style.includes("grey")) {
            option.style.color = "grey";
        } else if (status.style.includes("orange")) {
            option.style.color = "orange";
        } else if (status.style.includes("purple")) {
            option.style.color = "purple";
        } else if (status.style.includes("red")) {
            option.style.color = "red";
        }

        statusDropdown.appendChild(option);
    });

    // Color-coded button
  const colorButton = document.createElement("button");
  colorButton.textContent = "Status";
  colorButton.disabled = true;
  colorButton.style.marginLeft = "10px";
  colorButton.style.padding = "5px 10px";
  colorButton.style.border = "none";
  colorButton.style.borderRadius = "5px";
  colorButton.style.cursor = "not-allowed";

  updateColor(colorButton, deadline);
  statusDropdown.addEventListener("change", () => {
        updateStatusStyle(statusDropdown);
  });
  
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      label.style.textDecoration = "line-through"; // Strike through the text
      label.style.color = "gray"; // Optional: Change text color for completed tasks
      const nextTask = taskDiv.nextElementSibling;
            if (nextTask) {
                const nextCheckbox = nextTask.querySelector("input[type='checkbox']");
                nextCheckbox.disabled = false;
            }
    } else {
      label.style.textDecoration = "none"; // Remove strike-through
      label.style.color = "black"; // Reset text color
    }
  });

  taskDiv.appendChild(statusDropdown);
  taskDiv.appendChild(colorButton);  
  
  listTasks.appendChild(taskDiv);

  taskInput.value = "";
  deadlineInput.value = "";
  categoryInput.value = "select a category";
}

// function updateColor(colorButton, deadline) {
//     const today = new Date();
//     const deadlineDate = new Date(deadline);

//    if (deadlineDate > today) {
//         const diff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
//         if (diff > 3) {
//             colorButton.style.backgroundColor = "green"; // Plenty of time
//             colorButton.style.color = "white";
//         } else {
//             colorButton.style.backgroundColor = "orange"; // Near deadline
//             colorButton.style.color = "white";
//         }
//     } else {
//         colorButton.style.backgroundColor = "red"; // Past deadline
//         colorButton.style.color = "white";
//     }
// }

// function orderTasks(category) {
//     const categorySection = document.querySelector(`[data-category="${category}"]`);
//     const tasksInCategory = Array.from(categorySection.querySelectorAll(".task"));

//     tasksInCategory.sort((a, b) => {
//         const deadlineA = new Date(a.querySelector("span").textContent.split("Deadline: ")[1]);
//         const deadlineB = new Date(b.querySelector("span").textContent.split("Deadline: ")[1]);
//         return deadlineA - deadlineB; // Ascending order
//     });

//     tasksInCategory.forEach((task) => categorySection.appendChild(task));
// }

// document.getElementById("orderTasksButton").addEventListener("click", orderTasks);

// Function to clear completed tasks
// function clearCompletedTasks() {
//   const listTasks = document.querySelector(".listTasks");
//   const taskElements = document.querySelectorAll(".task");

//   taskElements.forEach((task) => {
//     const checkbox = task.querySelector("input[type='checkbox']");
//     if (checkbox.checked) {
//       listTasks.removeChild(task); // Remove the task from the DOM
//     }
//   });
// }
