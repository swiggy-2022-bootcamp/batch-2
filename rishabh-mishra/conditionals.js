/*
Marks Allocation:
A - 90-100
B - 80-89
C - 70-79
D - 60-69
E - 50-59
*/

let marks = prompt("Enter your marks");
marks = parseInt(marks);

console.log(marks);
switch (marks) {
  case marks >= 90:
    alert("A");
    break;
  case marks >= 80:
    alert("B");
    break;
  case marks >= 70:
    alert("C");
    break;
  case marks >= 60:
    alert("D");
    break;
  case marks >= 50:
    alert("E");
    break;
  default:
    alert("Invalid marks");
}
