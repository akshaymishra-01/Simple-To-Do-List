const goalText = document.getElementById("text_input");
const addBtn = document.getElementById("add_btn");
const goal_list = document.getElementById("goal_list");

// Initialize goal list from local storage
let goalList = JSON.parse(localStorage.getItem("goalList")) || [];

function addGoal() {
  const goalTextValue = goalText.value.trim();

  if (goalTextValue === "") {
    return;
  }

  const goalItem = document.createElement("li");
  const textSpan = document.createElement("div");
  textSpan.className = "list_item";
  textSpan.textContent = goalTextValue;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Remove";

  delBtn.addEventListener("click", () => {
    goal_list.removeChild(goalItem);
    removeGoalFromStorage(goalTextValue);
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

  // Add goal to local storage
  goalList.push({ text: goalTextValue, done: false });
  localStorage.setItem("goalList", JSON.stringify(goalList));

  goalText.value = "";
}

// Function to remove goal from local storage
function removeGoalFromStorage(goalTextValue) {
  goalList = goalList.filter((goal) => goal.text !== goalTextValue);
  localStorage.setItem("goalList", JSON.stringify(goalList));
}

// Load goals from local storage on page load
function loadGoals() {
  goalList.forEach((goal) => {
    const goalItem = document.createElement("li");
    const textSpan = document.createElement("div");
    textSpan.className = "list_item";
    textSpan.textContent = goal.text;

    if (goal.done) {
      textSpan.style.textDecoration = "line-through";
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "Remove";

    delBtn.addEventListener("click", () => {
      goal_list.removeChild(goalItem);
      removeGoalFromStorage(goal.text);
    });

    const doneBtn = document.createElement("button");
    doneBtn.className = "tick_btn";
    doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

    doneBtn.addEventListener("click", () => {
      textSpan.style.textDecoration = "line-through";
      goal.done = true;
      localStorage.setItem("goalList", JSON.stringify(goalList));
    });

    goalItem.appendChild(textSpan);
    goalItem.appendChild(doneBtn);
    goalItem.appendChild(delBtn);
    goal_list.appendChild(goalItem);
  });
}

loadGoals();

addBtn.addEventListener("click", addGoal);