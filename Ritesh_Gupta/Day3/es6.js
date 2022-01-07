// ECMAscript6 features

// const vs let
const username = "Ritesh"
console.log(username);

// username = "John"  <--- Throws an error. Cannot be re-assigned

let age = 23;
console.log(age);

age = 25;  // can be re-assigned


// objects are key-value pairs
const userDetails = {
    'name' : "John",
    'age' : 23,
    'email' : 'john@gmail.com'
};

console.log(userDetails);

userDetails.age = 20;
console.log(userDetails)



// arrow functions
const greet = username => console.log("Welcome ", username);
greet("John")

const add = (num1, num2) => {
    return num1 + num2
};

console.log("Sum using arrow function : ", add(2, 5))


//template literal
const number = 25;
const string = `This number is ${number}`;
console.log(string);


// spread operator (...). Also used for deep copy
const myNames = ["John", "Jack", "Matt"];
console.log(...myNames);

const nums1 = [1, 2, 3, 4, 5];
const nums2 = [...nums1, 6, 7, 8, 9, 10];
console.log(nums1);
console.log(nums2);


const obj1 = {x : 10, y : 20};
const obj2 = {z : 30};
const obj3 = {...obj1, ...obj2};
console.log(obj3)


//rest parameter
const fun = (...args) => {
    console.log(args);
}

fun(1, 23, 'John');



// Map
let mp = new Map();
mp.set("user", "Ritesh");
console.log(mp);

//swap two numbers using destructuring
let x1 = 45;
let x2 = 25;
console.log(x1, x2);

[x1, x2] = [x2, x1];

console.log(x1, x2);


