class ObserversList {
  constructor() {
    this.observerList = [];
  }

  add(observer) {
    this.observerList.push(observer);
  }

  count() {
    return this.observerList.length;
  }

  get(index) {
    if (index > -1 && index < this.observerList.length) {
      return this.observerList[index];
    }
  }

  indexOf(observer, startIndex) {
    let i = startIndex;
    while (i < this.observerList.length) {
      if (this.observerList[i] === observer) {
        return i;
      }
      i++;
    }
    return -1;
  }

  removeAt(index) {
    this.observerList.splice(index, 1);
  }
}

class Subject {
  constructor() {
    this.observers = new ObserversList();
  }

  addObserver(observer) {
    this.observers.add(observer);
  }

  removeObserver(index) {
    this.observers.removeAt(index);
  }

  notify(context) {
    const observersCount = this.observers.count();
    for (let i = 0; i < observersCount; i++) {
      this.observers.get(i).update(context);
    }
  }
}

class Observer {
  constructor() {}

  update(context) {}
}

// Subject buttons
class ConcreteSubject extends Subject {
  constructor(element) {
    super();
    this.element = element;

    this.element.onclick = () => {
      console.log(this.element);
      this.notify(this.element);
    };
  }
}

// The observed check box
class ConcreteObserver extends Observer {
  constructor(element) {
    super();
    // input
    this.element = element;
  }

  update(value) {
    this.element.checked = value.checked;
  }
}

const list = document.getElementById("list");
const subjectInput = document.getElementById("todo-input");
const checkBoxObserver = new ConcreteSubject(
  document.getElementById("checkAll")
);
const observersContainer = document.getElementById("list");

subjectInput.addEventListener("keypress", (evt) => {
  if (evt.code === "Enter") {
    let listItem = document.createElement("li"); // <li className="list-items"><input type='checkbox'  id='checkbox-${list.childNodes.length}' class='checkbox'/> <span class='todo-item'>${todoInput.value}</span></li>
    listItem.className = "list-items";
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.id = `checkbox-${list.childNodes.length}`;
    const span = document.createElement("span");
    span.className = "todo-item";
    span.innerText = subjectInput.value;
    listItem.append(newCheckBox);
    listItem.append(span);
    observersContainer.append(listItem);

    const newObserver = new ConcreteObserver(newCheckBox);
    checkBoxObserver.addObserver(newObserver);

    subjectInput.value = "";
  }
});
