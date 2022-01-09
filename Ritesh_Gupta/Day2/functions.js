
// Declaring the function
function welcome(name){
    console.log(`Hello ${name} Welcome to this bootcamp on JS \n Hope you enjoy it!!`)
}


welcome("Ritesh"); // Invoking the function
welcome("Mehul");


// function returning something
function addNum(num1, num2){
    return num1 + num2;
}

let sum = addNum(23, 54);
console.log("Sum is : ", sum);


// functions have argument keyword binded to it.
function addAllNum(){
    let sum = 0;
    for(let i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }

    return sum;
}

sum = addAllNum(1,5,4,64,3,4,5,6,7);
console.log("Sum is : ", sum);


// arrow functions
const f1 = (num1, num2) => {
    return num1 + num2
};

console.log("Sum using arrow function : ", f1(2, 5))
