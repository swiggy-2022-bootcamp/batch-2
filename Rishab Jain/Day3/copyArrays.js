let num1 = [1, 2, 3];
let num2 = num1;

console.log(num1);
console.log(num2);

num2.push(40);
num1.push(50);

console.log(num1);
console.log(num2);


let arr1 = [1, 2, 3];
let arr2 = [...arr1];

console.log(arr1);
console.log(arr2);

arr1.push(40);
arr2.push(50);

console.log(arr1);
console.log(arr2);