/*Problem statement:
 marks: 
 < 50 -> E
 50-60 -> D
 60-70 -> C
 70-80 -> B
 > 80 -> A
 alert msgs
*/
//problem statement: marks
let marks = 87

if (marks > 80) {
    alert("A")
}

else if (marks > 70 && marks < 80) {
    alert("B")
}
else if (marks > 60 && marks < 70) {
    alert("C")
}
else if (marks > 60 && marks < 50) {
    alert("D")
}
else {
    alert("E")
}

// let condition = true
// if (condition) {
//     console.log("condition is true")
// }

// let num = 3
// if (num > 0) {
//     console.log(`${num} is a positive number`)
// } else {
//     console.log(`${num} is a negative number`)
// }
// //  3 is a positive number

// num = -3
// if (num > 0) {
//     console.log(`${num} is a positive number`)
// } else {
//     console.log(`${num} is a negative number`)
// }
// //  -3 is a negative number
// let isRaining = true
// if (isRaining) {
//     console.log('You need a rain coat.')
// } else {
//     console.log('No need for a rain coat.')
// }
// // You need a rain coat.

// isRaining = false
// if (isRaining) {
//     console.log('You need a rain coat.')
// } else {
//     console.log('No need for a rain coat.')
// }
// // No need for a rain coat.