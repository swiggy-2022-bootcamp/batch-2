let arr = [1, "x", true, "abc"];
//Push Pop

arr.push("End"); // Push from end
arr.pop(); // Pop from end

arr.unshift("start") // add from start
arr.shift() // delete from start

// Problem Statement 2

let marksArr = [1, 54, 60, 8, 68, 100];

console.log("Max Marks", Math.max(...marksArr));
console.log("Min Marks", Math.min(...marksArr));

let passArr = [];
let failArr = [];

for (marks of marksArr) {
    if (marks >= 50) {
        passArr.push(marks);
    } else {
        failArr.push(marks);
    }
}

console.log(passArr);
console.log(failArr);