// function without parameter,  a function which make a number square
function square() {
    let num = 2
    let sq = num * num
    console.log(sq)
}

square() // 4

// function without parameter
function addTwoNumbers() {
    let numOne = 10
    let numTwo = 20
    let sum = numOne + numTwo

    console.log(sum)
}

addTwoNumbers() // a function has to be called by its name to be executed 

// function with one parameter
function functionName(parm1) {
    //code goes her
}
functionName(parm1) // during calling or invoking one argument needed

function areaOfCircle(r) {
    let area = Math.PI * r * r
    return area
}

console.log(areaOfCircle(10)) // should be called with one argument

function square(number) {
    return number * number
}

console.log(square(10))

const anonymousFun = function () {
    console.log(
        'I am an anonymous function and my value is stored in anonymousFun'
    )
}