// function without parameter,  a function which make a number square
function square() {
  let num = 2;
  let sq = num * num;
  console.log(sq);
}

square(); // 4

//Function returning value
function printFullName() {
  let firstName = "Asabeneh";
  let lastName = "Yetayeh";
  let space = " ";
  let fullName = firstName + space + lastName;
  return fullName;
}
console.log(printFullName());

//Function with a parameter
function areaOfCircle(r) {
  let area = Math.PI * r * r;
  return area;
}

// Function with two parameters
// Function without parameter doesn't take input,
//so lets make a function with parameters
function sumTwoNumbers(numOne, numTwo) {
  let sum = numOne + numTwo;
  console.log(sum);
}
sumTwoNumbers(10, 20); // calling functions

//Function with many parameters
// function with multiple parameters
// this function takes array as a parameter and sum up the numbers in the array
function sumArrayValues(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
}
const numbers = [1, 2, 3, 4, 5];
//calling a function
console.log(sumArrayValues(numbers));

//Function with unlimited number of parameters
function sumAllNums() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

console.log(sumAllNums(1, 2, 3, 4)); // 10
console.log(sumAllNums(10, 20, 13, 40, 10)); // 93
console.log(sumAllNums(15, 20, 30, 25, 10, 33, 40)); // 173

//Unlimited number of parameters in arrow function
const sumAllNums = (...args) => {
  console.log(args);
};

sumAllNums(1, 2, 3, 4);

//Anonymous Function
const anonymousFun = function () {
  console.log("I am an anonymous function ");
};

// Function expression
const square = function (n) {
  return n * n;
};

console.log(square(2)); // -> 4

// Self Invoking Functions
(function (n) {
  console.log(n * n);
})(2); // 4, but instead of just printing if we want to return and store the data, we do as shown below

let squaredNum = (function (n) {
  return n * n;
})(10);

console.log(squaredNum);

// Arrow Function
function square(n) {
  return n * n;
}

console.log(square(2)); // 4

const square = (n) => {
  return n * n;
};

console.log(square(2)); // -> 4

// if we have only one line in the code block, it can be written as follows, explicit return
const square = (n) => n * n; // -> 4

//Function with default parameters
// Declaring a function
function functionName(param = value) {
  //codes
}

// Calling function
functionName();
functionName(arg);

console
  .log(areaOfCircle(10)) // should be called with one argument

  [(1, 2, 3, 4, 5, 6, 7)].forEach((val) => {
    console.log(val % 2 == 0 ? "EVEN" : "ODD");
  });
