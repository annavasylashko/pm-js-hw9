//----------TASK1----------

class MyClass {
  static count = 0;

  callMe() {
    MyClass.count++;
  }

  callCount() {
    return MyClass.count;
  }
}

const c1 = new MyClass();
const c2 = new MyClass();

c1.callMe();
c1.callMe();
c1.callMe();
c1.callMe();
console.log(`Total callCount: ${c1.callCount()}`);

c2.callMe();
console.log(`Total callCount: ${c2.callCount()}`);

console.log();

//----------TASK2----------

class PersonGenderError extends Error {
  constructor(message) {
    super(message);
  }

  toString() {
    return `${this.name} ${this.message}`;
  }
}

class Person {
  static GENDER = {
    NOT_DEFINED: 0,
    MALE: 1,
    FEMALE: 2,
  };

  _name = "NoName";
  _gender = Person.GENDER.NOT_DEFINED;

  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    if (name !== "") {
      this._name = name;
    }
  }

  get gender() {
    return this._gender;
  }

  set gender(gender) {
    try {
      if (gender == 0 || gender == 1 || gender == 2) {
        this._gender = gender;
      } else throw new PersonGenderError("Invalid values");
    } catch (e) {
      console.log(e.message);
    }
  }
}

const person = new Person("");
const person1 = new Person("Minato", 1);
const person2 = new Person("Hinata", 2);
const person3 = new Person("", 6);

console.log(person);
console.log(person1);
console.log(person2);
console.log(person3);

person.name = "Haku";
console.log(person);

console.log();

//----------TASK3----------

class PersonLog extends Person {
  get logs() {
    return this._logs;
  }

  constructor(name, gender) {
    super(name, gender);
    this._logs = [];

    Object.preventExtensions(this);
    // To prevent adding new properties
    // If we use Object.freeze() we won't be able to change properties
  }

  set name(newValue) {
    if (newValue !== "") {
      let oldValue = this._name;
      this._name = newValue;
      if (this._logs) {
        this._logs.push(`${oldValue} changed name to ${newValue}`);
      }
    }
  }

  set gender(newValue) {
    if (newValue !== "") {
      let oldValue = this._gender;
      this._gender = newValue;
      if (this._logs) {
        this._logs.push(
          `${this._name} changed gender from ${oldValue} to ${newValue}`
        );
      }
    }
  }
}

const personWithLog = new PersonLog("Jiraya", 2);

console.log(personWithLog);

personWithLog.name = "Master Jiraya";
console.log(personWithLog);

personWithLog.name = "Pervy Sage";
console.log(personWithLog);

personWithLog.gender = 0;
console.log(personWithLog);

console.log(`All logs: ${personWithLog.logs}`);
