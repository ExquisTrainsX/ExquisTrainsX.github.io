// procedural
const todoInput = document.getElementById("todo-input");
const list = document.getElementById("list");
const taskCount = document.getElementById("taskCount");
const taskRem = document.getElementById("taskRem");
const inputs = document.getElementsByClassName("checkbox");
todoInput.addEventListener("keypress", (evt) => {
  if (evt.code === "Enter") {
    let listItem = document.createElement("li"); // <li className="list-items"><input type='checkbox'  id='checkbox-${list.childNodes.length}' class='checkbox'/> <span class='todo-item'>${todoInput.value}</span></li>
    listItem.className = "list-items";
    listItem.innerHTML = `<input type='checkbox'  id='checkbox-${list.childNodes.length}' class='checkbox'/> <span class='todo-item'>${todoInput.value}</span>`;
    list.appendChild(listItem);
    todoInput.value = "";
    let taskDone = inputs;
    taskCount.innerHTML = list.childNodes.length;
    console.log(taskDone.length);
    const testDivs = Array.prototype.filter.call(
      taskDone,
      (testElement) => testElement.checked == true
    );
    taskRem.innerHTML = list.childNodes.length - testDivs.length;
  }
});
