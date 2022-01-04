//-------------------------------------------------- MATH lib
console.log(
  "--------------------------- Math lib ---------------------------------"
);
const PI = Math.PI;

console.log(PI);

console.log(Math.round(PI));

console.log(Math.round(9.81));

console.log(Math.floor(PI));

console.log(Math.ceil(PI));

console.log(Math.min(-5, 3, 20, 4, 5, 10));

console.log(Math.max(-5, 3, 20, 4, 5, 10));

const randNum = Math.random();
console.log(randNum);

const num = Math.floor(Math.random() * 11);
console.log(num);

//Absolute value
console.log(Math.abs(-10));

//Square root
console.log(Math.sqrt(100));

// Power
console.log(Math.pow(3, 2));

console.log(Math.E);

// Logarithm
console.log(Math.log(2));
console.log(Math.log(100) / Math.log(10)); // give log of y, base x

//------------------------------------------------------------ Operators
console.log(
  "--------------------------- Arithmetic Operators -----------------------------------"
);
console.log("add - ", 4 + 2);
console.log("sub - ", 4 - 2);
console.log("div - ", 4 / 2);
console.log("mul - ", 4 * 2);
console.log("mod - ", 4 % 2);

console.log("mod (-ve a) - ", 4 % -2);
console.log("mod (-ve b) - ", -5 % 2);
console.log("mod (-ve both) - ", -5 % -2);
console.log("mod (decimal b) - ", 2.5 % 2);
console.log("mod (decimal a) - ", 4 % 2.5);
console.log("mod (decimal a) - ", 4 % 2.5);

//----------------------------------------------Comparison Operators
console.log(0 == false);
console.log(0 === false);
console.log(0 == "");
console.log(0 === "");
console.log(1 == true);
console.log(1 === true);
console.log(undefined == null);
console.log(undefined === null);
console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(typeof NaN);

//------------------------------------------------------- String operators
console.log(
  "--------------------------- String Operators -----------------------------------"
);
let first = "hello";
let last = "world";

console.log(first + last);
console.log(first + " " + last);
