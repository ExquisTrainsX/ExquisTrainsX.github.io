// an array object
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

// takes the array add similar objects (observers that are expecting notification) to that array or remove them or notiy them to update each one of them
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

  // update
  notify(context) {
    const observersCount = this.observers.count();
    for (let i = 0; i < observersCount; i++) {
      this.observers.get(i).update(context);
    }
  }
}

class Observer {
  constructor() {}

  // notification expected here
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
    super(); // ineritanc
    // input
    this.element = element;
  }

  // whenever the checkbox element are notified check or uncheck your value
  update(value) {
    this.element.checked = value.checked;
  }
}

// lists of observers
const list = document.getElementById("list");

// the input that adds the observers when enter key is pressed
const subjectInput = document.getElementById("todo-input");
// subject itself => checkbox that notifies the other checkboxes
const checkBoxSubject = new ConcreteSubject(
  document.getElementById("checkAll")
);

// the containers containing the observers (Todos and its checkboxes)
const observersContainer = document.getElementById("list");

// Where listening to when "Enter" key is pressed
// so that we can add todo checkbox to the observers
subjectInput.addEventListener("keypress", (evt) => {
  // when key is Enter
  if (evt.code === "Enter") {
    // create a list item and append them to the list container
    let listItem = document.createElement("li"); // <li className="list-items"><input type='checkbox'  id='checkbox-${list.childNodes.length}' class='checkbox'/> <span class='todo-item'>${todoInput.value}</span></li>
    listItem.className = "list-items";
    // an observer element creation
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.id = `checkbox-${list.childNodes.length}`;
    const span = document.createElement("span");
    span.className = "todo-item";
    span.innerText = subjectInput.value;
    // adding the todos and the checkbox to the list (Observer's) container
    listItem.append(newCheckBox);
    listItem.append(span);
    observersContainer.append(listItem);

    // making the checkbox an observer in the current todo that was created
    const newObserver = new ConcreteObserver(newCheckBox);
    // adding the observer to the Subject
    checkBoxSubject.addObserver(newObserver);

    subjectInput.value = "";
  }
});
