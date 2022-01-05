let marks = [50, 80, 100, 90, 65, 10]
    /*
        different mark slabs : 
            >=90 : grade A+
            >=80 and <90 : grade A
            >=70 and <80 : grade B+
            >=60 and <70 : grade B
            >=50 and <60 : grade C+
            >=40 and <50 : grade C
            <40 : fail   
    */

// forEach syntax and switch case.
marks.forEach((mark) => {
    let status;
    if (mark >= 90) {
        status = "A+"
    } else if (mark >= 80 && mark < 90) {
        status = "A"
    } else if (mark >= 70 && mark < 80) {
        status = "B+"
    } else if (mark >= 60 && mark < 70) {
        status = "B"
    } else if (mark >= 50 && mark < 60) {
        status = "C+"
    } else if (mark >= 40 && mark < 50) {
        status = "C"
    } else {
        status = "fail"
    }
    console.log(`Result when marks obtained = ${mark} : ${status}`)
})

// functions :
//declaring a function without a parameter
function functionName() {
    console.log("creating a function without a parameter!")
}
functionName() // calling function by its name and with parentheses

// function without parameter,  a function which make a number square
function square() {
    let num = 2
    let sq = num * num
    console.log(sq)
}
square()

// function without parameter
function addTwoNumbers() {
    let numOne = 10
    let numTwo = 20
    let sum = numOne + numTwo

    console.log(sum)
}
addTwoNumbers() // a function has to be called by its name to be executed

// function without parameter but returning something.
function printFullName() {
    let firstName = 'Asabeneh'
    let lastName = 'Yetayeh'
    let space = ' '
    let fullName = firstName + space + lastName
    return fullName
}
console.log(printFullName())

// parameterised function. 
function areaOfCircle(r) {
    let area = Math.PI * r * r
    return area
}
console.log(areaOfCircle(10)) // should be called with one argument


// with many parameters :  this function takes array as a parameter and sum up the numbers in the array
function sumArrayValues(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    return sum;
}
const numbers = [1, 2, 3, 4, 5];
console.log(sumArrayValues(numbers));

// with unlimited and variable number of arguments. 
function sumAllNums() {
    let sum = 0
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    return sum
}

console.log(sumAllNums(1, 2, 3, 4)) // 10
console.log(sumAllNums(10, 20, 13, 40, 10)) // 93
console.log(sumAllNums(15, 20, 30, 25, 10, 33, 40)) // 173

// with unlimited number of arguments in an arrow function. 
const sumAllNumsArrow = (...args) => {
    let sum = 0
    for (const element of args) {
        sum += element
    }
    return sum
}

console.log(sumAllNumsArrow(1, 2, 3, 4)) // 10
console.log(sumAllNumsArrow(10, 20, 13, 40, 10)) // 93
console.log(sumAllNumsArrow(15, 20, 30, 25, 10, 33, 40)) // 173


// Arrow functions 
const findSquare = n => {
    return n * n
}

console.log(findSquare(2)) // -> 4

// one line. implicit return.
const findSquareOneLine = n => n * n // -> 4
console.log(findSquareOneLine(2))