// **********BEFORE CLASS**********

//convert string to number
var a = "123";
var b = parseInt(a);
console.log(b);

// convert number to string
var s1 = 24;
console.log(String(s1));


// converts array to string
var numbers = [1, 2, 3, 4, 5]
console.log(numbers.toString())

object1 = {
    "name":"naren",
    "city":"bangalore",
    "age":29
}
// values can be accessed using object.key or object["key"]
console.log(object1.name);
console.log(object1["name"]);

// iterating over object
for (var keyval in object1)
{
    console.log(object1[keyval])
}
delete object1["age"];
console.log("object1 after deleting age is")
for (var keyval in object1)
{
    console.log(object1[keyval])
}
object1["skills"] = ["C++","python"]
console.log("object1 after adding skills is")
for (var keyval in object1)
{
    console.log(object1[keyval])
}

// copy an object without modify the original object
const person1 = Object.assign({}, object1)
console.log(person1);

// check if an elemnt is in list
// using inbuilt function ".includes()"
// using an arrow function
fruitlist = ["apple","banana","mango","orange"]


const checkIfElementPresent = (elem,list) =>
{
    if (list.includes(elem))
    {
        console.log(String(elem)+ " present in list")
    }
    else
    {
        console.log(String(elem)+ " NOT present in list")
    }
}
checkIfElementPresent("mango",fruitlist);
checkIfElementPresent("pineapple",fruitlist);

// ************* DURING CLASS ******************

// const a= 5;
// cannot change a
// arrow functions
const display = (name) =>
{
    return `welcome ${name}`
}
console.log(display('Naren'));
const show = name => `Hi ${name}`
console.log(show("varun"));

const add = (x,y) => {
    console.log("sum is ",x+y)
}
add(4,3);

const isEvenOdd = (number) =>
{
    if (number%2 == 0)
    {
        console.log(`the number ${number} is even`);
    } 
    else{
        console.log(`the number ${number} is odd`);
    }
}
isEvenOdd(5);
isEvenOdd(8);
// template literal using back ticks
const name1 = "naren";
console.log(`my name is : ${name1}`);

// default values
function add2(x=3,y=5)
{
    return x+y;
}
console.log(add2(30,30));
console.log(add2(15));
console.log(add2());

const sum1 = () => 15

const add3 = function(x,y = x* sum1()){
    return x+y;
}
const res = add3(10)
console.log(res);


const myNames = ['a','b','c'];
console.log(myNames);
console.log(...myNames);

const num1list = [10,20,30,40,50];
const num2list = [...num1list,60,70,80,90]
console.log(num2list);

// if you do arr2 = arr1, it references the same location
// if you use spread operator, its a copy of the list
// arr2 doesnt referenece to arr1
// so changes to arr1 wont reflect on arr2
let arr1 = [10,20,30]
let arr2 =[...arr1];
arr1.push(40)
console.log(arr1)
console.log(arr2)

const obj1 = {x:10,y:20}
const obj2 = {z:30}
const obj3 = {...obj1,...obj2}
console.log(obj3)

// spread is a rest parameter

let my_fun = function(...args)
{
    console.log(args);
}
my_fun(30)
my_fun(10,20,30)

function addspread(x,y,z)
{
    console.log(x+y+z);

}
const numbers3 = [10,20,30,40,50]
addspread(...numbers3);

// map allows key , value pair
let mp = new Map()
//key can be anythin - object string number , mutable or immutable

// destructuring
const user2 = {
    username : "admin",
    password : "admin123"
}

let {username,password} = user2;
console.log(username+ " "+ password);

// same can be donw with array
const numbers4 = [10,20,30]
const [x,y,z] =numbers4
console.log(x)
console.log(y)
console.log(z)


// swapping two numbers
let abc = 10;
let xyz = 20;
[abc,xyz] = [xyz,abc];
console.log(abc);
console.log(xyz);
