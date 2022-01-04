
// arrays are heterogenous
list = ['football', 'cricket', 'Formula 1', 'swimming', 234, true];
let length = list.length;   // Length of array



/*
Declare array which contains 5 marks
Find sum, min and max marks
count no of students passed and failed.
*/

let marks = [76, 87, 95, 43, 66]
let totalMarks = 0;
let maxMarks = -1000;
let minMarks = 1000;
let passedStudents = 0;
let failedStudents = 0;

for(let i = 0; i < marks.length; i++){
    totalMarks += marks[i];
    maxMarks = Math.max(maxMarks, marks[i]);
    minMarks = Math.min(minMarks, marks[i]);

    if (marks[i] > 60) 
        passedStudents++;
    
}

failedStudents = marks.length - passedStudents;

console.log("Total marks : ", totalMarks);
console.log("Max Marks : ", maxMarks);
console.log("Min marks : ", minMarks);
console.log("No of students passed : ", passedStudents);
console.log("No of students failed : ", failedStudents)



