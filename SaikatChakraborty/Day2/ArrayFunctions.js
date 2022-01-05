//The JavaScript method toString() converts an array to a string of (comma separated) array values.
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let fruitList= fruits.toString();
console.log(fruitList);

//The join() method also joins all array elements into a string.
//Separator can be specified
let fruitList2=fruits.join(" ** ");
console.log(fruitList2);

//pop() method removesthe last element of the array 
fruits.pop();
console.log(fruits);

//The push() method adds a new element to an array (at the end):
fruits.push("kiwi");
console.log(fruits);

//The shift() method removes the first array element and "shifts" all other elements to a lower index.
fruits.shift();
console.log(fruits);
//The unshift() method adds a new element to an array (at the beginning), and "unshifts" older elements:
fruits.unshift("Lemon");
console.log(fruits);
//Array elements are accessed using their index number:
fruits[0]="Pomegranate";
console.log(fruits);
//fruits.length provides length of the array obejct
// Array elements can be deleted using the JavaScript operator delete.
// Using delete leaves undefined holes in the array.

delete fruits[1];
console.log(fruits);

//The concat() method creates a new array by merging (concatenating) existing arrays:
const moreFruits=["Raspberry","BlueBerry"];
const allFruits=fruits.concat(moreFruits);
console.log(allFruits);

//Sort an array using sort() method
let numbers=[1, 5,6,9,2];
console.log(numbers);
numbers.sort();
console.log(numbers);
//Reversing an array using reverse() method 
console.log(numbers.reverse());

//The slice() method creates a new array.
//The slice() method does not remove any elements from the source array.

const citrus = fruits.slice(1,3);
console.log(citrus);

//Array Iteration

// The forEach() method calls a function (a callback function) once for each array element.

const num=[1 ,22,34,5,6];
num.forEach((value,index,array)=>console.log(value+"\n"));


//The map() method creates a new array by performing a function on each array element.
const newNum=num.map((value,index,arr)=>value*=2);
console.log(newNum);

//The filter() method creates a new array with array elements that passes a test.
const numgreaterThan20=num.filter((value,index,arr)=>value>20);
console.log(numgreaterThan20);

//The reduce() method runs a function on each array element to produce (reduce it to) a single value.
let sum= numbers.reduce((total,value,index,arr)=>{return total+index;});
console.log(sum);

/**
 * To search in an array similar to string 
 * 
 *  lastIndexOf(), indexOf()
 */
const arr=[2,1,2,24,5,24];
console.log(arr.indexOf(2),arr.lastIndexOf(24));

//ECMAScript 2016 introduced Array.includes() to arrays. This allows us to check if an element is present in an array (including NaN, unlike indexOf).
console.log(arr.includes(5));
