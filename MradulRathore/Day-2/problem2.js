let marks = [10, 20, 50, 20, 40, 3, 100, 20]

let max_marks = -1
let min_marks = 100

let total = 0

for (let i = 0; i < marks.length; i++) {
    total += marks[i]
    if (max_marks < marks[i]) {
        max_marks = marks[i]
    }
    if (min_marks > marks[i]) {
        min_marks = marks[i]
    }
}

console.log(marks)
console.log(max_marks)
console.log(min_marks)
console.log(total)
