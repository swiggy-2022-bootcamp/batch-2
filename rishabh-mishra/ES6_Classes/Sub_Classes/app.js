class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greeting() {
    return `Hello this side ${this.firstName} ${this.lastName} `;
  }
}

class Customer extends Person {
  constructor(firstName, lastName, phone, membership) {
    super(firstName, lastName);
    this.phone = phone;
    this.membership = membership;
  }
}

const rishabh = new Customer('Rishabh', 'Mishra', '9315687181', 'Premium');
console.log(rishabh);
console.log(rishabh.greeting());
