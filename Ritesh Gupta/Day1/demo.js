
// Primitive data types
let firstName = "Ritesh"
let lastName = "Gupta"
console.log("Full name : ", firstName + lastName)

let num1 = 10
let num2 = 20
let sum = num1 + num2
console.log("Sum is : ", sum)

let boolValue = true



// Non primitive data types 
const arr = [1,2,3,4];
for(let i = 0; i < arr.length; i++){
    console.log(arr[i])
}

arr.forEach((ele, idx) => {
    console.log(`Element : ${ele} and index : ${idx}`)
})

const obj = {
    "firstName" : "Ritesh",
    "lastName" : "Gupta"
}

console.log(obj)
