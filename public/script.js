let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const submitButton = document.getElementById("submitTaskButton");
    const clearButton = document.getElementById("clearCompletedButton");

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask();
    });
    submitButton.addEventListener("click", addTask);
    clearButton.addEventListener("click", clearCompletedTasks);
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const categoryInput = document.getElementById("categoryInput");
    const listTasks = document.querySelector(".listTasks");

    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;
    const category = categoryInput.value;

    if (taskText === "" || deadline === "") {
        alert("Please provide valid task details.");
        return;
    }

    if (category === "Select a category") {
        alert("Please select a category.");
        return;
    }

    tasks.push({
        taskText,
        deadline,
        category,
        order: tasks.filter(task => task.category === category).length + 1,
        completed: false,
    });

    displayTasks(listTasks);
}

function displayTasks(listTasks) {
    listTasks.innerHTML = "";

    // Group tasks by category
    const groupedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.category]) acc[task.category] = [];
        acc[task.category].push(task);
        return acc;
    }, {});

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
