const goalText = document.getElementById("text_input");
const addBtn = document.getElementById("add_btn");
const goal_list = document.getElementById("goal_list");

// Get the tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addGoal() {
  const goalTextValue = goalText.value.trim();

  if (goalTextValue === "") {
    return;
  }

  const goalItem = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.textContent = goalTextValue;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Remove";

  delBtn.addEventListener("click", () => {
    goal_list.removeChild(goalItem);
    removeTaskFromStorage(textSpan.textContent);
  });

  const doneBtn = document.createElement("button");
  doneBtn.className = "tick_btn";
  doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

  doneBtn.addEventListener("click", () => {
    textSpan.style.textDecoration = "line-through";
  });

  goalItem.appendChild(textSpan);
  goalItem.appendChild(doneBtn);
  goalItem.appendChild(delBtn);
  goal_list.appendChild(goalItem);

  // Add the task to localStorage
  tasks.push(goalTextValue);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  goalText.value = "";
}

// Remove a task from localStorage
function removeTaskFromStorage(task) {
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage and display them
tasks.forEach(task => {
  const goalItem = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.textContent = task;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Remove";

  delBtn.addEventListener("click", () => {
    goal_list.removeChild(goalItem);
    removeTaskFromStorage(textSpan.textContent);
  });

  const doneBtn = document.createElement("button");
  doneBtn.className = "tick_btn";
  doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

  doneBtn.addEventListener("click", () => {
    textSpan.style.textDecoration = "line-through";
  });

  goalItem.appendChild(textSpan);
  goalItem.appendChild(doneBtn);
  goalItem.appendChild(delBtn);
  goal_list.appendChild(goalItem);
});

addBtn.addEventListener('click', addGoal);