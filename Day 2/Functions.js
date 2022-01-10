// Normal Function Declaration
function welcome(){
    console.log('Welcome to JS Bootcamp \nTimings: 6:30pm to 9:30pm');
}
// Function call
welcome();

// With Parameters
function hello(name){
    console.log(`Hello ${name}`);
}
hello('Rahul');

// Function with return type
function getName(){
    return 'Rahul';
}
let name = getName();
console.log(`My Name is ${name}`);

// Function with arguments
function getSum(){
    let sum = 0;
    for(let i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
}

//let sum = getSum(1, 2, 3, 4, 5);
let sum = getSum(1, 2, true);
console.log('Sum is: ' + sum);

// Expression Functions (Anonymous Functions)
const square = function() {
    return 5 * 5;
}
console.log('Anonymous Function Example: ' + square());

// Self-invoking function
(function(){
    console.log('Self-Invoking Function');
})();

// Arrow functions
const arrow = () => {
    console.log('Arrow Function Example');
}
arrow();

// Arrow Functions - One Line
const add = (a, b) => a + b;
console.log('Addition using Arrow Function: ' + add(10, 20));