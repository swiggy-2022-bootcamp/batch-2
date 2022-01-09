function square() {
  let num = 2;
  let sq = num * num;
  console.log(sq);
}

square();

// function without parameter
function addTwoNumbers() {
  let numOne = 10;
  let numTwo = 20;
  let sum = numOne + numTwo;

  console.log(sum);
}

addTwoNumbers();

function printFullName() {
  let firstName = "Rishab";
  let lastName = "Jain";
  let fullName = firstName + lastName;
  return fullName;
}
console.log(printFullName());

function sumAllNums() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

console.log(sumAllNums(1, 2, 3, 4));

// Function expression
const square = function (n) {
  return n * n;
};

console.log(square(2)); 


// Self Invoking Functions

(function (n) {
  console.log(n * n);
})(2); 

let squaredNum = (function (n) {
  return n * n;
})(10);

console.log(squaredNum);




// Arrow Functions

const square = (n) => {
  return n * n;
};

console.log(square(2));

const square = (n) => n * n;
