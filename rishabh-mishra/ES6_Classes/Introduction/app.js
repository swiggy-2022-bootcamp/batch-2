class Person {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(dob);
  }
  greeting() {
    return `Hello this side ${this.firstName} ${this.lastName}!!!`;
  }

  calculateAge() {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  static addNumbers(x, y) {
    return x + y;
  }
}

const rishabh = new Person('Rishabh', 'Mishra', '12-22-1999');

console.log(rishabh.calculateAge());

console.log(Person.addNumbers(10, 12));
