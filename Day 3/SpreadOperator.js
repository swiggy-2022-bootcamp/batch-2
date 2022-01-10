const fruits = ["apple","banana","kiwi","orange"];

console.log(...fruits);

const num1 = [1, 2, 3, 4, 5];
const num2 = [...num1, 6, 7, 8, 9, 10];

console.log(num2);

const obj1 = {x: 10, y: 20};
const obj2 = {z: 30};

const obj3 = {...obj1, ...obj2};

console.log(obj3);

// Rest Parameter
const print = (...args) => {
    console.log(args);
}

print(1, 2, 3, 4);