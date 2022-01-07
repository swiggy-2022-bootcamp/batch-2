//functions

function display(name, age) {
    console.log(`name is ${name} \nage is ${age}`)
}

display('piyush',23);


const sum = (a,b) => a+b;

console.log(sum(10,20))

const oddEven = num => num % 2 == 0 ? console.log('even') : console.log('odd');

const findOddEven = num => {
    if(num % 2 == 0) {
        return 'even'; 
    } else {
        return 'odd'
    }
}

oddEven(1)

console.log(findOddEven(123456));

let name = 'piyush'
console.log('name is: ' + name)

let name1 = 'piyush 1'
//literals
console.log(`name1 is: ${name1}`)


//default params
const multiplication = (a = 10, b = 20) => {return a*b;}

console.log(multiplication(20,30));
console.log(multiplication(40));
console.log(multiplication());


const sum2 = () =>  15
const addition = (x, y = x * sum()) => {
    return x+y;
}

const res = addition(10);
console.log(res);

// structuring/destructuring

//spread operator
const names = ['piyush','pooja','mayank'];
console.log(names);
console.log(...names);

const num1 = [10,20,30,40,50]
const num2 = [...num1,60,70,80]
const num3 = num1
const num4 = [...num1]

console.log(num1)
console.log(num2)
console.log(num3)

num1.push(60)

console.log(num1)
console.log(num2)

//num1 changes are reflected in num3(bc it's pointing to same reference)
console.log(num3)

//num1 changes are not reflected in num4(bc it was copied)
console.log(num4)

const obj1 = {x:10, y:20}
const obj2 = {z:30}

const obj3 = {...obj1, ...obj2}
console.log(obj3)

//Rest operator

let func = (...args) => {
    console.log(args)
}

func(10)
func(10,20,30,40)


const add = (x,y,z) => {
    console.log(x+y+z);
}

const numbers = [10,20,30,40,50]
//it takes first 3 elements of numbers
add(...numbers)






