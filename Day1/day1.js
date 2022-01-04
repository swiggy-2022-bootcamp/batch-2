
alert('Hello World');
console.log('Hello World');
console.error('This is an error');
console.warn('This is a warning');


// let age = 30;

// age = 31;

const name = 'Pradeep';
const age = 24;
const rating = 3.5;
const isCool = true;
const x = null;
const y = undefined;
let z;

console.log(typeof z);


console.log('My name is ' + name + ' and I am ' + age);

console.log(`My name is ${name} and I am ${age}`);

const s = 'Hello World';
let val;
val = s.length;

// Change case
val = s.toUpperCase();
val = s.toLowerCase();
val = s.substring(0, 5);

// Split into array
val = s.split('');



// ARRAYS - Store multiple values in a variable
const numbers = [1,2,3,4,5];
const fruits = ['apples', 'oranges', 'pears', 'grapes'];
console.log(numbers, fruits);

// Get one value - Arrays start at 0
console.log(fruits[1]);

// Add value
fruits[4] = 'blueberries';

// Add value using push()
fruits.push('strawberries');

// Add to beginning
fruits.unshift('mangos');

// Remove last value
fruits.pop();

// // Check if array
console.log(Array.isArray(fruits));

// // Get index
console.log(fruits.indexOf('oranges'));



if(!undefined){
    console.log("Undefined is a falsy value!")
}




