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
      this.notify(this.element);
    };
  }
}

// The observed check box
class ConcreteObserver extends Observer {
  constructor(element) {
    super();
    this.element = element;
  }

  update(value) {
    this.element.checked = value.checked;
  }
}

const subjectInput = document.getElementById("todo-input");
const checkBoxObserver = new ConcreteSubject(
  document.getElementById("checkAll")
);

subjectInput.addEventListener("keypress", (evt) => {
  if (evt.code === "Enter") {
    let listItem = document.createElement("li"); // <li className="list-items"><input type='checkbox'  id='checkbox-${list.childNodes.length}' class='checkbox'/> <span class='todo-item'>${todoInput.value}</span></li>
    listItem.className = "list-items";
    listItem.innerHTML = `<input type='checkbox'  id='checkbox-${list.childNodes.length}' class='checkbox'/> <span class='todo-item'>${subjectInput.value}</span>`;
    list.appendChild(listItem);
    const listItemID = document.getElementById(
      `checkbox-${list.childNodes.length}`
    );
    const newObserver = new ConcreteObserver(listItemID);
    const newCheckBoxObserver = new ConcreteObserver(newObserver);
    checkBoxObserver.addObserver(newCheckBoxObserver);
    //observersContainer.append(newObserver);
    // subjectInput.value = "";
    // let taskDone = lis;
    // taskCount.innerHTML = list.childNodes.length;
    // console.log(taskDone.length);
    // const testDivs = Array.prototype.filter.call(
    //   taskDone,
    //   (testElement) => testElement.checked == true
    // );
    // taskRem.innerHTML = list.childNodes.length - testDivs.length;
  }
});
