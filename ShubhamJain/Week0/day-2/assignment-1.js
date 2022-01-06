//Declare an array which contains 5 student's marks
/*Problem statement:
    marks: 
    < 50 -> F
    50-60 -> D
    60-70 -> C
    70-80 -> B
    > 80 -> A
    alert msgs
*/

let num = 72;
let grade;

switch (num) {
    case num > 80:
        grade = 'A';
        break;
    case num > 70 && num < 80:
        grade = 'B';
        break;
    case num > 60 && num < 70:
        grade = 'C';
        break;
    case num > 50 && num < 60:
        grade = 'D';
        break;
    default:
        grade = 'F';
}