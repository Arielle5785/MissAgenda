let tasks = [];
const listTasks = document.getElementById("listTasks")

// document.addEventListener("DOMContentLoaded", () => {
    
    const usernameInput = document.getElementById("usernameInput");
    const header = document.querySelector("h1");

    // Update the header dynamically
    usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim();
    header.textContent = username
        ? `Welcome, ${username}'s To Do Dashboard`
        : "Welcome to your To Do Dashboard";
    });
    const taskForm = document.getElementById("taskForm");
    const submitButton = document.getElementById("submitTaskButton");
    const clearButton = document.getElementById("clearCompletedButton");

    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const data = await handleSubmit();
        if (data) {
            console.log('data', data)
            tasks.push(data)
            console.log('tasks', tasks)
            displayTasks(listTasks)
        }
    });
    
    clearButton.addEventListener("click", clearCompletedTasks);
// });

// const addTask = (data) => {
//     if (data) {
//         tasks.push(data); // Add the new task to the local tasks array
//         const listTasks = document.querySelector(".listTasks");
//         displayTasks(listTasks);
//     }
// };

function displayTasks(listTasks) {
        listTasks.innerHTML = "";

        // Group tasks by category
        const groupedTasks = tasks.reduce((acc, task) => {
            if (!acc[task.category]) acc[task.category] = [];
            acc[task.category].push(task);
            return acc;
        }, {});
    console.log('groupedTasks', groupedTasks);
        

        // Sort categories alphabetically
        const sortedCategories = Object.keys(groupedTasks).sort();

        sortedCategories.forEach((category) => {
            const categorySection = document.createElement("div");
            categorySection.setAttribute("data-category", category);

            const categoryHeader = document.createElement("h3");
            categoryHeader.textContent = category;
            categorySection.appendChild(categoryHeader);

            groupedTasks[category].sort((a, b) => a.order - b.order);

            groupedTasks[category].forEach((task, index) => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.style.display = "flex";
                taskDiv.style.justifyContent = "space-between";
                taskDiv.style.alignItems = "center";
                taskDiv.style.marginBottom = "10px";

                // Order input
                const orderInput = document.createElement("input");
                orderInput.type = "number";
                orderInput.value = task.order;
                orderInput.min = 1;
                orderInput.style.width = "50px";
                orderInput.addEventListener("change", () => updateOrder(task, category, orderInput.value));

                // Checkbox for completion
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.completed;
                checkbox.disabled = index > 0 && !groupedTasks[category][index - 1].completed;

                checkbox.addEventListener("change", () => {
                    task.completed = checkbox.checked;
                    taskLabel.style.textDecoration = task.completed ? "line-through" : "none";
                    taskLabel.style.color = task.completed ? "gray" : "black";
                    displayTasks(document.querySelector(".listTasks")); // Refresh to update dependencies
                });

                // Task label
                const taskLabel = document.createElement("label");
                taskLabel.textContent = task.taskText;
                taskLabel.style.textDecoration = task.completed ? "line-through" : "none";
                taskLabel.style.color = task.completed ? "gray" : "black";

                // Deadline label
                const deadlineLabel = document.createElement("span");
                deadlineLabel.textContent = `Deadline: ${new Date(task.deadline).toLocaleDateString()}`;
                deadlineLabel.style.marginLeft = "10px";

                // Status color button
                const colorButton = document.createElement("button");
                colorButton.textContent = "Status";
                colorButton.disabled = true;
                colorButton.style.marginLeft = "10px";
                updateColor(colorButton, task.deadline);

                // Append elements
                taskDiv.appendChild(orderInput);
                taskDiv.appendChild(checkbox);
                taskDiv.appendChild(taskLabel);
                taskDiv.appendChild(deadlineLabel);
                taskDiv.appendChild(colorButton);

                categorySection.appendChild(taskDiv);
            });

            listTasks.appendChild(categorySection);
        });


}

function updateOrder(taskToUpdate, category, newOrder) {
    const taskInCategory = tasks.filter(task => task.category === category);
    const oldOrder = taskToUpdate.order;
    taskToUpdate.order = parseInt(newOrder, 10);

    taskInCategory.forEach(task => {
        if (task !== taskToUpdate) {
            if (taskToUpdate.order > oldOrder && task.order > oldOrder && task.order <= taskToUpdate.order) {
                task.order -= 1;
            } else if (taskToUpdate.order < oldOrder && task.order < oldOrder && task.order >= taskToUpdate.order) {
                task.order += 1;
            }
        }
    });

    displayTasks(document.querySelector(".listTasks"));
}

function updateColor(colorButton, deadline) {
    const today = new Date();
    const deadlineDate = new Date(deadline);

    if (deadlineDate > today) {
        const diff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        colorButton.style.backgroundColor = diff > 3 ? "green" : "orange";
    } else {
        colorButton.style.backgroundColor = "red";
    }
    colorButton.style.color = "white";
}

function clearCompletedTasks() {
    tasks = tasks.filter((task) => !task.completed);
    displayTasks(document.querySelector(".listTasks"));
}

// const getAllTasks = async () => {
//     try {
//         const res = await fetch("http://localhost:8008/api/todo", {
//             method: "GET",
//         });
//         const data = await res.json();
//         console.log(data);
//         render(data);
//     } catch (error) {
//         console.log(error);
//     }
// };
// getAllTasks(username)

const handleSubmit = async (e) => {
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const categoryInput = document.getElementById("categoryInput");

    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;
    const category = categoryInput.value;
    // console.log(prod_name, prod_price);
    const objJson = {
    task: taskText,
    category: category,
    date : deadline,
    username: usernameInput.value.trim()
  };

  try {
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(objJson),
    };
    const res = await fetch("http://localhost:8008/todo/tasks", options);
    const data = await res.json();
    
    return data;
  } catch (error) {
    console.log(error);
  }
};
