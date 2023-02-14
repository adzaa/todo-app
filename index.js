const toDoItems = [];

const addButton = document.getElementById("addButton");

if (addButton) {
  addButton.onclick = addItem;
}

function addItem() {
  // pick up data from the form

  const inputName = document.getElementById("nameInput");
  let nameInputValue = "";
  if (inputName) nameInputValue = inputName.value;

  const cUrgent = document.getElementById("cUrgent");
  let cUrgentValue = false;
  if (cUrgent) cUrgentValue = cUrgent.checked;

  //   creating a new node

  const newItem = createToDoItem(
    nameInputValue,
    cUrgentValue,
    toDoItems.length
  );

  //   inserting the newly created node into DOM

  const items = document.getElementById("items");

  if (items) {
    if (items.children.length === 0) {
      items.innerHTML = "";
    }
    items.append(newItem);
    toDoItems.push({
      name: nameInputValue,
      urgent: cUrgentValue,
      done: false,
    });
  }

  //   deleting data from the form

  if (inputName) inputName.value = "";
  if (cUrgent) cUrgent.checked = false;
}

function createToDoItem(name, urgent, index) {
  const div = document.createElement("div");
  div.className = "alert alert-primary d-flex flex-column";
  div.role = "alert";

  if (urgent) {
    const strong = document.createElement("strong");
    strong.innerHTML = "URGENT";
    div.append(strong);
  }

  div.append(name);

  const cBoxDiv = document.createElement("div");
  cBoxDiv.className = "form-check";

  const input = document.createElement("input");
  input.className = "form-check-input";
  input.type = "checkbox";
  input.onclick = function () {
    toDoItems[index].done = !toDoItems[index].done;
    updateProgressBar();
  };

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.innerHTML = "Done";

  cBoxDiv.append(input);
  cBoxDiv.append(label);

  div.append(cBoxDiv);

  return div;
}

function updateProgressBar() {
  // calculating the percentage of tasks completed

  let counter = 0;

  for (let i = 0; i < toDoItems.length; i++) {
    if (toDoItems[i].done) {
      counter++;
    }
  }
  const percentage = (counter / toDoItems.length) * 100;
  const progressBar = document.getElementById("progressBar");

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
}
