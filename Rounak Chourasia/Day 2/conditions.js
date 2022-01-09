// Condition

let isSuccess = true;

if (isSuccess) {
    console.log("SUCCESS");
} else {
    console.log("FAILURE");
}

let msg = isSuccess ? "Sucess" : "Failure"

// Marks Problem Statement

let marks = 1;

if (marks >= 90) {
    alert("A Grade");
} else if (marks >= 70 && marks < 90) {
    alert("B Grade");
} else if (marks >= 50 && marks < 70) {
    alert("C Grade");
} else if (marks >= 0 && marks < 50) {
    alert("D Grade");
} else {
    console.log("Invalid Marks");
}

