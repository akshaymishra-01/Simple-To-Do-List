const goalText = document.getElementById("text_input");
const addBtn = document.getElementById("add_btn");
const goal_list = document.getElementById("goal_list");


let goalList = JSON.parse(localStorage.getItem("goalList")) || [];

addBtn.addEventListener("click", addGoal);

function addGoal() {
  const goalTextValue = goalText.value.trim();

  if (goalTextValue === "") {
    return;
  }

  const goalItem = createGoalItem(goalTextValue, false);

  // Add goal to local storage
  goalList.push({ text: goalTextValue, done: false });
  localStorage.setItem("goalList", JSON.stringify(goalList));

  goal_list.appendChild(goalItem);
  goalText.value = "";
}

function createGoalItem(text, done) {
  const goalItem = document.createElement("li");
  const textSpan = document.createElement("div");
  textSpan.className = "list_item";
  textSpan.textContent = text;

  if (done) {
    textSpan.style.textDecoration = "line-through";
  }

  const delBtn = document.createElement("button");
  delBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

  delBtn.addEventListener("click", () => {
    goal_list.removeChild(goalItem);
    removeGoalFromStorage(text);
  });

  const doneBtn = document.createElement("button");
  doneBtn.className = "tick_btn";
  doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

  if (done) {
    doneBtn.style.color = "gray"; 
  }

  doneBtn.addEventListener("click", () => {
    if (done) {
      textSpan.style.textDecoration = "none";
      doneBtn.style.color = "black"; 
      done = false;
    } else {
      textSpan.style.textDecoration = "line-through";
      doneBtn.style.color = "gray"; 
      done = true;
    }

    updateGoalInStorage(text, done);
  });

  const editBtn = document.createElement("button");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

  editBtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = text;
    editInput.className = "edit_input";

    textSpan.replaceWith(editInput);

    editInput.focus();

    editInput.addEventListener("blur", () => {
      const newGoalTextValue = editInput.value.trim();

      if (newGoalTextValue === "") {
        return;
      }

      updateGoalTextInStorage(text, newGoalTextValue);
      text = newGoalTextValue;
      textSpan.textContent = newGoalTextValue;

      editInput.replaceWith(textSpan);
    });
  });

  goalItem.appendChild(textSpan);
  goalItem.appendChild(doneBtn);
  goalItem.appendChild(delBtn);
  goalItem.appendChild(editBtn);

  return goalItem;
}


function removeGoalFromStorage(goalTextValue) {
  goalList = goalList.filter((goal) => goal.text !== goalTextValue);
  localStorage.setItem("goalList", JSON.stringify(goalList));
}


function updateGoalInStorage(goalTextValue, doneStatus) {
  goalList = goalList.map((goal) =>
    goal.text === goalTextValue ? { text: goalTextValue, done: doneStatus } : goal
  );
  localStorage.setItem("goalList", JSON.stringify(goalList));
}


function updateGoalTextInStorage(oldTextValue, newGoalTextValue) {
  goalList = goalList.map((goal) =>
    goal.text === oldTextValue ? { text: newGoalTextValue, done: goal.done } : goal
  );
  localStorage.setItem("goalList", JSON.stringify(goalList));
}


function loadGoals() {
  goalList.forEach((goal) => {
    const goalItem = createGoalItem(goal.text, goal.done);
    goal_list.appendChild(goalItem);
  });
}


document.addEventListener("DOMContentLoaded", loadGoals);

