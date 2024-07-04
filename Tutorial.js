const container = document.getElementById("container");
const activityBox = document.getElementById("activity-box");
const timeBox = document.getElementById("time-box");
const subInput = document.getElementById("sub-input");
const activityList = document.getElementById("activity-list");
let listCount = 0;
let para = document.getElementById("par");
let saveBtn = document.getElementById("save");
let dateInput = document.getElementById("date-input");
let saveDate = document.getElementById("save-date");
subInput.addEventListener("click", submitBox);
let storedInput = localStorage.getItem("dailyActivity");

function submitBox() {
  let activityInput = activityBox.value.trim();
  let timeInput = timeBox.value.trim();
  //  let longList = document.getElementById("long-list")

  listCount++;
  if (activityInput === "" || timeInput === "") {
    para.textContent = "Invalid Input";
    setTimeout(() => {
      para.textContent = "";
    }, 3000);
    return;
  }

  let list = document.createElement("li");
  list.id = "new-list";
  console.log(list);
  if (listCount > 15) {
    para.textContent = "Your list is too tall for today";
    setTimeout(() => {
      para.textContent = "";
    }, 3000);
    return;
  }

  list.innerHTML = `${activityInput} <span>${timeInput}</span>`;
  let delButton = document.createElement("button");
  delButton.id = "del-but";
  delButton.textContent = "x";
  delButton.addEventListener("click", delActivity);
  let checkInput = document.createElement("input");
  checkInput.id = "check";
  checkInput.type = "checkbox";
  list.appendChild(checkInput);
  list.appendChild(delButton);
  activityList.appendChild(list);
  activityBox.value = " ";
  timeBox.value = " ";
}

function delActivity(event) {
  const listItem = event.target.parentElement;
  listItem.remove();
  listCount--;
}

saveBtn.addEventListener("click", saveToLocalStorage);

function saveToLocalStorage() {
  let dateField = dateInput.value;
  if (dateInput.value === "") {
    saveDate.textContent = "Fill the date form ";
  } else {
    saveDate.textContent = "You created this list on " + dateField;
  }
  setTimeout(() => {
    saveDate.textContent = "";
  }, 3000);
  dateInput.value = "";

  localStorage.setItem("dailyActivity", activityList.textContent);
}
