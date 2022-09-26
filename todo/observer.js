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

const subjectBtn = document.getElementById("addNewObserver");
const checkBoxObserver = new ConcreteSubject(
  document.getElementById("mainCheckbox")
);
const observersCointainer = document.getElementById("observersContainer");

const addObserver = () => {
  // create new checkBox
  const newCheckBox = document.createElement("input");
  newCheckBox.type = "checkbox";

  const newCheckBoxObserver = new ConcreteObserver(newCheckBox);
  // add to the subject

  checkBoxObserver.addObserver(newCheckBoxObserver);
  observersCointainer.append(newCheckBox);
};

subjectBtn.onclick = addObserver;
