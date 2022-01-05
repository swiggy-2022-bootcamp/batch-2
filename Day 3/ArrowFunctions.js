// Arrow Functions with Single Parameter
const display = name => {
    return `Hi ${name}`;
}

const display1 = name => `Hello ${name}`;

console.log(display("Rahul"));
console.log(display1("Rahul Panchal"));

// Arrow Functions with Multiple Parameter
const add = (a, b) => a + b;

console.log('Sum of two numbers: ' + add(10, 20));

// Even or Odd
const evenOrOdd = (num) => {
    if(num % 2 == 0){
        return `${num} is Even`;
    } else {
        return `${num} is Odd`;
    }
}

console.log(evenOrOdd(5));
console.log(evenOrOdd(10));