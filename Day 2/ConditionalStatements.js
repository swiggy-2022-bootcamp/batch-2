// If Else Statements
let marks = 85;
if(marks < 35){
    alert('F Grade');
} else if (marks >= 35 && marks < 45) {
    alert('E Grade');
} else if (marks >= 45 && marks < 55) {
    alert('D Grade');
} else if (marks >= 55 && marks < 65) {
    alert('C Grade');
} else if (marks >= 65 && marks < 85) {
    alert('B Grade');
} else if (marks >= 85 && marks <= 100) {
    alert('A Grade');
} else {
    alert('Marks are not Valid');
}

// Switch Statements
let char = 'C';
switch(char){
    case 'A':
        console.log('A is selected');
        break;
    case 'B':
        console.log('B is selected');
        break;
    default:
        console.log('Nothing was selected');
        break;
}

// Ternary Operators (Just like an If Else)
let x = 6;
console.log(x == 5 ? 'Value is 5' : 'Value is not 5');