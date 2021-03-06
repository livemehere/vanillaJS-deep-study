const items = document.querySelector(".items");
const inputBox = document.querySelector(".input-box");
const inputItem = document.querySelector(".input-item");

// TODO: Initialization
let items_LS = [];
loadItems();

// TODO: Remove button event delegation
items.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    e.target.parentElement.remove();
    removeItemFromArray(e.target.parentElement.children[0].innerHTML);
    localStorage.setItem("items", JSON.stringify(items_LS));
  }
});

// TODO: Create new item event Click or Enter key
inputBox.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputItem.value != "") {
    createTodo(inputItem.value);
    pushItemsIntoLS();
  }
});

// function 선언 ----------------------------------------------------------------------

// delete & update Array
function removeItemFromArray(itemText) {
  const index = items_LS.indexOf(itemText);
  console.log(itemText, index);
  items_LS = items_LS.filter((item) => item != itemText);
}

// load Localstorage Data and CreateTodo
function loadItems() {
  if (localStorage.getItem("items") != null) {
    items_LS = JSON.parse(localStorage.getItem("items"));
    items_LS.forEach((item) => {
      createTodo(item);
    });
  }
}

// Create todo
function createTodo(itemText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  li.classList = "item d-flex justify-content-between";
  span.classList = "text";
  button.classList = "remove-btn btn btn-outline-secondary";

  span.innerHTML = itemText;
  button.innerHTML = "삭제";

  li.appendChild(span);
  li.appendChild(button);
  items.appendChild(li);
}

// add new item into Array and Update Localstorage Data
function pushItemsIntoLS() {
  items_LS.push(inputItem.value);
  inputItem.value = ""; //clear input value
  localStorage.setItem("items", JSON.stringify(items_LS));
}
